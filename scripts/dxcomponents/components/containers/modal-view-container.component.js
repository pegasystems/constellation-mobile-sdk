import { ReferenceComponent } from "./reference.component.js";
import { BaseComponent } from "../base.component.js";
import {ContainerBaseComponent} from "./container-base.component.js";

const TAG = "[ModalViewContainerComponent]";

export class ModalViewContainerComponent extends ContainerBaseComponent {

    // EVENT_SHOW_CANCEL_ALERT = PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL;
    jsComponentPConnectData = {};
    props = {
        children: [],
    };

    arChildren$= [];
    stateProps$;
    banners;
    templateName$;
    buildName$;
    context$;
    title$ = '';
    bShowModal$ = false;
    itemKey$;
    formGroup$;
    oCaseInfo = {};

    // for causing a change on assignment
    updateToken$ = 0;

    routingInfoRef = {};

    // created object is now a View with a Template
    //  Use its PConnect to render the CaseView; DON'T replace this.pConn$
    createdViewPConn$;

    bSubscribed = false;
    cancelPConn$;
    bShowCancelAlert$ = false;
    bAlertState;
    localizedVal;
    localeCategory = 'Data Object';
    isMultiRecord = false;
    actionsDialog = false;

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        // this.type = "ModalViewContainerComponent";
    }

    init() {
        this.localizedVal = PCore.getLocaleUtils().getLocaleValue;
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.#checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);

        const baseContext = this.pConn.getContextName();
        const acName = this.pConn.getContainerName();

        // for now, in general this should be overridden by updateSelf(), and not be blank
        if (this.itemKey$ === '') {
            this.itemKey$ = baseContext.concat('/').concat(acName);
        }

        const containerMgr = this.pConn.getContainerManager();

        containerMgr.initializeContainers({
            type: 'multiple'
        });

        this.jsComponentPConnect.shouldComponentUpdate(this);
    }

    destroy() {
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.destroyChildren();
        this.props.children = [];
        this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
        // this.#unsubscribeForEvents();
        this.bSubscribed = false;
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
        // routingInfo was added as component prop in populateAdditionalProps
        const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');
        this.routingInfoRef.current = routingInfo;

        let loadingInfo;
        try {
            loadingInfo = this.pConn.getLoadingStatus();
        } catch (ex) {
            console.log(ex);
        }
        this.stateProps$ = this.pConn.getStateProps();
        this.banners = this.#getBanners();

        if (!loadingInfo) {
            // turn off spinner
            // this.psService.sendMessage(false);
        }

        if (routingInfo && !loadingInfo /* && this.bUpdate */) {
            const currentOrder = routingInfo.accessedOrder;

            if (undefined === currentOrder) {
                return;
            }

            const currentItems = routingInfo.items;

            const { key, latestItem } = this.#getKeyAndLatestItem(routingInfo);

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

                    // if (!this.bSubscribed) {
                    //     this.bSubscribed = true;
                    //
                    //     PCore.getPubSubUtils().subscribe(
                    //         this.EVENT_SHOW_CANCEL_ALERT,
                    //         payload => {
                    //             this.showAlert(payload);
                    //         },
                    //         this.EVENT_SHOW_CANCEL_ALERT
                    //     );
                    // }

                    // THIS is where the ViewContainer creates a View
                    // The config has meta.config.type = "view"
                    this.#createView(routingInfo, currentItem, latestItem, key);
                }
            } else {
                this.hideModal();
            }
            this.#sendPropsUpdate();
        }
    }

    #createView(routingInfo, currentItem, latestItem, key) {
        const configObject = this.getConfigObject(currentItem, null, false);
        const newComp = configObject?.getPConnect();
        // const newCompName = newComp.getComponentName();
        const caseInfo = newComp && newComp.getDataObject() && newComp.getDataObject().caseInfo ? newComp.getDataObject().caseInfo : null;
        // The metadata for pyDetails changed such that the "template": "CaseView"
        //  is no longer a child of the created View but is in the created View's
        //  config. So, we DON'T want to replace this.pConn$ since the created
        //  component is a View (and not a ViewContainer). We now look for the
        //  "template" type directly in the created component (newComp) and NOT
        //  as a child of the newly created component.
        // console.log(`---> ModalViewContainer created new ${newCompName}`);

        // Use the newly created component (View) info but DO NOT replace
        //  this ModalViewContainer's pConn$, etc.
        //  Note that we're now using the newly created View's PConnect in the
        //  ViewContainer HTML template to guide what's rendered similar to what
        //  the Nebula/Constellation return of React.Fragment does

        // right now need to check caseInfo for changes, to trigger redraw, not getting
        // changes from angularPconnect except for first draw
        if (newComp && caseInfo && this.#compareCaseInfoIsDifferent(caseInfo)) {
            // this.psService.sendMessage(false);
            this.createdViewPConn$ = newComp;
            const newConfigProps = newComp.getConfigProps();
            this.templateName$ = 'template' in newConfigProps ? (newConfigProps.template) : '';

            const { actionName } = latestItem;
            const theNewCaseInfo = newComp.getCaseInfo();
            // const caseName = theNewCaseInfo.getName();
            const ID = theNewCaseInfo.getBusinessID() || theNewCaseInfo.getID();

            const caseTypeName = theNewCaseInfo.getCaseTypeName();
            const isDataObject = routingInfo.items[latestItem.context].resourceType === PCore.getConstants().RESOURCE_TYPES.DATA;
            const dataObjectAction = routingInfo.items[latestItem.context].resourceStatus;
            this.isMultiRecord = routingInfo.items[latestItem.context].isMultiRecordData;
            this.context$ = latestItem.context;
            this.title$ =
                isDataObject || this.isMultiRecord
                    ? this.getModalHeading(dataObjectAction)
                    : this.determineModalHeaderByAction(actionName, caseTypeName, ID, this.createdViewPConn$?.getCaseLocaleReference());

            const bIsRefComponent = this.checkIfRefComponent(newComp);

            if (bIsRefComponent) {
                const newPConn = ReferenceComponent.normalizePConn(newComp);
                this.arChildren$ = ReferenceComponent.normalizePConnArray(newPConn.getChildren());
            } else {
                // update children with new view's children
                this.arChildren$ = newComp.getChildren();
            }

            this.bShowModal$ = true;

            // for when non modal
            // this.modalVisibleChange.emit(this.bShowModal$);

            // save off itemKey to be used for finishAssignment, etc.
            this.itemKey$ = key;

            // cause a change for assignment
            this.updateToken$ = new Date().getTime();

            this.reconcileChildren(this.arChildren$);
        }
    }

    #sendPropsUpdate() {
        this.props = {
            visible: this.bShowModal$,
            title: this.title$,
            children: this.getChildrenComponentsIds(),
            cancelLabel: this.localizedVal('Cancel', this.localeCategory),
            submitLabel: this.localizedVal('Submit', this.localeCategory)
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    hideModal() {
        if (this.bShowModal$) {
            // other code in Nebula/Constellation not needed currently, but if so later,
            // should put here
        }
        this.bShowModal$ = false;
        // for when non modal
        // this.modalVisibleChange.emit(this.bShowModal$);
        this.oCaseInfo = {};
    }

    getConfigObject(item, pConnect, isReverseCoexistence = false) {
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

    checkIfRefComponent(thePConn) {
        let bReturn = false;
        if (thePConn && thePConn.getComponentName() === 'reference') {
            bReturn = true;
        }

        return bReturn;
    }

    // onAlertState(bData) {
    //     this.bAlertState = bData;
    //     this.bShowCancelAlert$ = false;
    //     if (this.bAlertState) {
    //         this.hideModal();
    //     }
    // }

    // showAlert(payload) {
    //     const { latestItem } = this.#getKeyAndLatestItem(this.routingInfoRef.current);
    //     const { isModalAction } = payload;
    //
    //     /*
    //       If we are in create stage full page mode, created a new case and trying to click on cancel button
    //       it will show two alert dialogs which is not expected. Hence isModalAction flag to avoid that.
    //     */
    //     if (latestItem && isModalAction && !this.actionsDialog) {
    //         const configObject = this.getConfigObject(latestItem, this.pConn$);
    //         this.cancelPConn$ = configObject?.getPConnect();
    //         this.bShowCancelAlert$ = true;
    //     }
    // }

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
        // stringify compare version
        if (sCurrnentCaseInfo !== sOldCaseInfo) {
            bRet = true;
        }
        // if different, save off new case info
        if (bRet) {
            this.oCaseInfo = JSON.parse(JSON.stringify(oCurrentCaseInfo));
        }
        return bRet;
    }

    #getBanners() {
        return this.#getBanners2({ target: this.itemKey$, ...this.stateProps$ });
    }

    getModalHeading(dataObjectAction) {
        return dataObjectAction === PCore.getConstants().RESOURCE_STATUS.CREATE
            ? this.localizedVal('Add Record', this.localeCategory)
            : this.localizedVal('Edit Record', this.localeCategory);
    }

    determineModalHeaderByAction(actionName, caseTypeName, ID, caseLocaleRef) {
        if (actionName) {
            return this.localizedVal(actionName, this.localeCategory);
        }
        return `${this.localizedVal('Create', this.localeCategory)} ${this.localizedVal(caseTypeName, undefined, caseLocaleRef)} (${ID})`;
    }

    closeActionsDialog = () => {
        this.actionsDialog = true;
        // this.ngZone.run(() => {
        this.bShowModal$ = false;

        // for when non modal
        // this.modalVisibleChange.emit(this.bShowModal$);

        this.oCaseInfo = {};
        // });
        this.#sendPropsUpdate();
    };

    #handleCancelEvent() {
        this.closeActionsDialog();
        this.createdViewPConn$.getActionsApi().cancelDataObject(this.context$);
    }

    #handleSubmitEvent() {
        this.#blurAllFields();
        this.createdViewPConn$.getActionsApi().submitEmbeddedDataModal(this.context$)
            .then(() => {
                this.closeActionsDialog();
            })
            .catch((error) => {
                console.error(TAG, `Data submit failed: ${error}`);
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

    // #unsubscribeForEvents() {
    //     this.pCorePubSub.unsubscribe(this.EVENT_SHOW_CANCEL_ALERT, this.EVENT_SHOW_CANCEL_ALERT);
    // }

    // helpers

    #getBanners2(config) {
        const { target, pageMessages, httpMessages } = config;
        const { PAGE } = PCore.getConstants();
        // const { clearMessages } = PCore.getMessageManager();
        const banners = [];
        const groupedPageMessages = this.#getMessagesGrouped(pageMessages);

        Object.keys(groupedPageMessages).forEach(type => {
            const messagesByType = groupedPageMessages[type];
            const variant = this.#getVariant(type);
            const pageMessagesBannerID = `${target}_${PAGE}_${type}`.toLowerCase().replace('/', '_');
            banners.push({ id: pageMessagesBannerID, messages: messagesByType, variant, PAGE, type, target });
        });

        if (httpMessages && httpMessages.length > 0) {
            banners.push({ id: 'modalViewContainerBanner', messages: httpMessages, variant: 'urgent' });
        }

        return banners;
    }

    #getMessagesGrouped(inputMessages) {
        const messages = {};

        if (inputMessages && inputMessages instanceof Array && inputMessages.length > 0) {
            inputMessages.forEach(item => {
                const { message, type } = item;
                messages[type] = [...(messages[type] || []), message];
            });
        }
        return messages;
    }

    #getVariant(type) {
        const { BANNER_VARIANT_SUCCESS, BANNER_VARIANT_INFO, BANNER_VARIANT_URGENT, MESSAGES } = PCore.getConstants();
        const { MESSAGES_TYPE_ERROR, MESSAGES_TYPE_INFO, MESSAGES_TYPE_SUCCESS } = MESSAGES;

        let variant;
        switch (type) {
            case MESSAGES_TYPE_ERROR:
                variant = BANNER_VARIANT_URGENT;
                break;
            case MESSAGES_TYPE_INFO:
                variant = BANNER_VARIANT_INFO;
                break;
            case MESSAGES_TYPE_SUCCESS:
                variant = BANNER_VARIANT_SUCCESS;
                break;
            default:
                variant = '';
        }
        return variant;
    }
}
