import { ReferenceComponent } from "./reference.component.js";
import { ContainerBaseComponent } from "./container-base.component.js";

const TAG = "[ModalViewContainerComponent]";

export class ModalViewContainerComponent extends ContainerBaseComponent {

    jsComponentPConnectData = {};
    props = {
        children: [],
    };
    alertBannerComponents = [];
    childrenPConns= [];
    stateProps;
    context;
    title = '';
    showModal = false;
    itemKey;
    oCaseInfo = {};
    createdViewPConn;
    localizedVal;
    localeCategory = 'Data Object';

    init() {
        this.localizedVal = PCore.getLocaleUtils().getLocaleValue;
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.#checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);

        if (this.itemKey === '') {
            this.itemKey = this.pConn.getContextName().concat('/').concat(this.pConn.getContainerName());
        }
        this.pConn.getContainerManager().initializeContainers({ type: 'multiple' });
        this.jsComponentPConnect.shouldComponentUpdate(this);
    }

    destroy() {
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.destroyChildren();
        this.props.children = [];
        this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
        this.#destroyBanners();
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.#checkAndUpdate();
        }
    }

    onEvent(event) {
        if (event.type === "ModalViewContainerEvent") {
            switch (event.eventData?.type) {
                case "cancel":
                    this.#handleCancelEvent();
                    break;
                case "submit":
                    this.#handleSubmitEvent();
                    break;
                default:
                    console.warn(TAG, "Unexpected event: ", event.eventData?.type);
            }
            return;
        }
        this.childrenComponents.forEach((component) => {
            component.onEvent(event);
        });
    }

    #checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');

        let loadingInfo;
        try {
            loadingInfo = this.pConn.getLoadingStatus();
        } catch (ex) {
            console.log(ex);
        }
        this.stateProps = this.pConn.getStateProps();
        this.#updateBanners()

        if (routingInfo && !loadingInfo) {
            const currentOrder = routingInfo.accessedOrder;

            if (undefined === currentOrder) {
                return;
            }
            const currentItems = routingInfo.items;
            const { key, latestItem } = this.#getKeyAndLatestItem(routingInfo);
            this.itemKey = key;
            if (currentOrder.length > 0) {
                if (currentItems[key] && currentItems[key].view && Object.keys(currentItems[key].view).length > 0) {
                    const currentItem = currentItems[key];
                    const rootView = currentItem.view;
                    const { context } = rootView.config;
                    const config = { meta: rootView };
                    config.options = {
                        context: currentItem.context,
                        hasForm: true,
                        pageReference: context || this.pConn.getPageReference()
                    };
                    this.#createView(routingInfo, currentItem, latestItem);
                }
            } else {
                this.#hideModal();
            }
            this.#sendPropsUpdate();
        }
    }

    #createView(routingInfo, currentItem, latestItem) {
        const configObject = this.#getConfigObject(currentItem, null, false);
        const newComp = configObject?.getPConnect();
        const caseInfo = newComp && newComp.getDataObject() && newComp.getDataObject().caseInfo ? newComp.getDataObject().caseInfo : null;

        if (newComp && caseInfo && this.#compareCaseInfoIsDifferent(caseInfo)) {
            this.createdViewPConn = newComp;

            const { actionName } = latestItem;
            const theNewCaseInfo = newComp.getCaseInfo();
            const ID = theNewCaseInfo.getBusinessID() || theNewCaseInfo.getID();

            const caseTypeName = theNewCaseInfo.getCaseTypeName();
            const isDataObject = routingInfo.items[latestItem.context].resourceType === PCore.getConstants().RESOURCE_TYPES.DATA;
            const dataObjectAction = routingInfo.items[latestItem.context].resourceStatus;
            const isMultiRecord = routingInfo.items[latestItem.context].isMultiRecordData;
            this.context = latestItem.context;
            this.title =
                isDataObject || isMultiRecord
                    ? this.getModalHeading(dataObjectAction)
                    : this.#determineModalHeaderByAction(actionName, caseTypeName, ID, this.createdViewPConn?.getCaseLocaleReference());

            const bIsRefComponent = this.#checkIfRefComponent(newComp);

            if (bIsRefComponent) {
                const newPConn = ReferenceComponent.normalizePConn(newComp);
                this.childrenPConns = ReferenceComponent.normalizePConnArray(newPConn.getChildren());
            } else {
                this.childrenPConns = newComp.getChildren();
            }

            this.showModal = true;
            this.reconcileChildren(this.childrenPConns);
        }
    }

    #sendPropsUpdate() {
        this.props = {
            visible: this.showModal,
            title: this.title,
            children: this.getChildrenComponentsIds(),
            cancelLabel: this.localizedVal('Cancel', this.localeCategory),
            submitLabel: this.localizedVal('Submit', this.localeCategory),
            alertBanners: this.alertBannerComponents.map((banner) => banner.compId),
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #hideModal() {
        this.showModal = false;
        this.oCaseInfo = {};
    }

    #getConfigObject(item, pConnect, isReverseCoexistence = false) {
        let config;
        if (isReverseCoexistence) {
            config = {
                options: {
                    pageReference: pConnect?.getPageReference(),
                    hasForm: true,
                    containerName: pConnect?.getContainerName() || PCore.getConstants().MODAL
                }
            };
            return PCore.createPConnect(config);
        }
        if (item) {
            const { context, view, isBulkAction } = item;
            const target = PCore.getContainerUtils().getTargetFromContainerItemID(context);
            config = {
                meta: view,
                options: {
                    context,
                    pageReference: view.config.context || pConnect.getPageReference(),
                    hasForm: true,
                    ...(isBulkAction && { isBulkAction }),
                    containerName: pConnect?.getContainerName() || PCore.getConstants().MODAL,
                    target
                }
            };
            return PCore.createPConnect(config);
        }
        return null;
    }

    #checkIfRefComponent(thePConn) {
        let bReturn = false;
        if (thePConn && thePConn.getComponentName() === 'reference') {
            bReturn = true;
        }

        return bReturn;
    }

    #hasContainerItems(routingInfo) {
        if (routingInfo) {
            const { accessedOrder, items } = routingInfo;
            return accessedOrder && accessedOrder.length > 0 && items;
        }
        return false;
    }

    #getKeyAndLatestItem(routinginfo) {
        if (this.#hasContainerItems(routinginfo)) {
            const { accessedOrder, items } = routinginfo;
            const key = accessedOrder[accessedOrder.length - 1];
            const latestItem = items[key];
            return { key, latestItem };
        }
        return {};
    }

    #compareCaseInfoIsDifferent(oCurrentCaseInfo) {
        let bRet = false;
        const sCurrnentCaseInfo = JSON.stringify(oCurrentCaseInfo);
        const sOldCaseInfo = JSON.stringify(this.oCaseInfo);
        if (sCurrnentCaseInfo !== sOldCaseInfo) {
            bRet = true;
        }
        if (bRet) {
            this.oCaseInfo = JSON.parse(JSON.stringify(oCurrentCaseInfo));
        }
        return bRet;
    }

    #updateBanners() {
        this.#destroyBanners();
        const bannerMessages = this.#getBannerMessages();
        const banners =
            bannerMessages && bannerMessages.length > 0
                ? [
                    {
                        messages:bannerMessages?.map((msg) => this.localizedVal(msg.message, "Messages")),
                        variant: "urgent",
                    },
                ]
                : [];

        this.alertBannerComponents = banners.map((b) => {
            const component = this.componentsManager.create("AlertBanner", [b.variant, b.messages]);
            component.init();
            return component;
        });
    }

    #getBannerMessages() {
        const { pageMessages, httpMessages } = this.stateProps;
        const bannerMessages = [];
        bannerMessages.push(...(pageMessages?.map(msg => { return { type: "error", message: msg }}) || []))
        bannerMessages.push(...(httpMessages?.map(msg => { return { type: "error", message: msg }}) || []))
        bannerMessages.push(...(this.#getFieldsValidationMessages() || []));
        return bannerMessages;
    }

    #destroyBanners() {
        this.alertBannerComponents.forEach((banner) => banner.destroy());
        this.alertBannerComponents = [];
    }

    getModalHeading(dataObjectAction) {
        return dataObjectAction === PCore.getConstants().RESOURCE_STATUS.CREATE
            ? this.localizedVal('Add Record', this.localeCategory)
            : this.localizedVal('Edit Record', this.localeCategory);
    }

    #determineModalHeaderByAction(actionName, caseTypeName, ID, caseLocaleRef) {
        if (actionName) {
            return this.localizedVal(actionName, this.localeCategory);
        }
        return `${this.localizedVal('Create', this.localeCategory)} ${this.localizedVal(caseTypeName, undefined, caseLocaleRef)} (${ID})`;
    }

    #closeActionsDialog = () => {
        this.showModal = false;
        this.oCaseInfo = {};
        this.#sendPropsUpdate();
    };

    #handleCancelEvent() {
        this.#closeActionsDialog();
        this.createdViewPConn.getActionsApi().cancelDataObject(this.context);
    }

    #handleSubmitEvent() {
        this.#blurAllFields();
        this.createdViewPConn.getActionsApi().submitEmbeddedDataModal(this.context)
            .then(() => {
                this.#closeActionsDialog();
            })
            .catch((error) => {
                console.error(TAG, `Data submit failed: ${error}`);
                this.#updateBanners();
                this.#sendPropsUpdate();
            })
    }

    #blurAllFields() {
        const event = {
            type: "FieldChangeWithFocus",
            eventData: {
                focused: "false",
            },
        };
        this.childrenComponents?.forEach(component => {component.onEvent(event);})
    }

    #getFieldsValidationMessages() {
        const messages = [];
        const fieldValidationMessages = PCore.getMessageManager().getValidationErrorMessages(this.itemKey);
        if (fieldValidationMessages) {
            fieldValidationMessages.forEach((fieldMessage) => {
                const message = `${fieldMessage.label} ${fieldMessage.description}`;
                messages.push({ type: "error", message: message });
            });
        }
        return messages;
    }
}
