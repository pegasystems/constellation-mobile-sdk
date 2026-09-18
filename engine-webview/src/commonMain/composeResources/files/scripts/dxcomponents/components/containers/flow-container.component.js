import { ReferenceComponent } from "./reference.component.js";
import { deepEquals, Utils } from "../../helpers/utils.js";
import { ContainerBaseComponent } from "./container-base.component.js";

const TAG = "[FlowContainerComponent]";

export class FlowContainerComponent extends ContainerBaseComponent {
    pCoreConstants;
    childrenPConns = [];
    childPConfig;
    containerName$;
    bannerMessages;
    cancelPressed = false;
    setTimeoutIds = [];

    get assignmentComponent() {
        return this.childrenComponents?.find((c) => c.type === "Assignment") ?? null;
    }

    set assignmentComponent(value) {
        const banners = this.alertBannerComponents;
        this.childrenComponents = value != null ? [value, ...banners] : [...banners];
    }

    get alertBannerComponents() {
        return (this.childrenComponents ?? []).filter((c) => c.type === "AlertBanner");
    }

    set alertBannerComponents(banners) {
        const assignment = this.assignmentComponent;
        this.childrenComponents = assignment != null ? [assignment, ...banners] : [...banners];
    }

    // messages
    localizedVal;
    localeCategory = "Messages";
    localeReference;

    assignmentPConn;
    containerContextKey;
    flowContainerHelper = PCore.getContainerUtils().getFlowContainer();
    pCorePubSub = PCore.getPubSubUtils();

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);

        this.localizedVal = PCore.getLocaleUtils().getLocaleValue;
        const caseInfo = this.pConn.getCaseInfo();
        this.localeReference = `${caseInfo?.getClassName()}!CASE!${caseInfo.getName()}`.toUpperCase();

        this.pCoreConstants = PCore.getConstants();
        this.#initComponent();
        this.#initContainer();
        this.checkAndUpdate();
        this.#createAndInitAssignmentComponent(); // needs to be called after #initComponent and checkAndUpdate
        this.#subscribeForEvents();
    }

    destroy() {
        this.setTimeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
        this.setTimeoutIds = [];
        this.#unsubscribeForEvents();
        super.destroy();
    }

    #sendPropsUpdate() {
        const caseId = this.pConn.getCaseSummary().content.pyID;
        const title = caseId ? `${this.containerName$} (${caseId})` : "Loading ...";
        this.props = {
            title: title,
            children: this.getChildrenProps(),
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #handleCancel() {
        Utils.setOkToInitFlowContainer("true");
    }

    #handleCancelPressed() {
        this.cancelPressed = true;
    }

    checkAndUpdate() {
        const shouldComponentUpdate = this.jsComponentPConnect.shouldComponentUpdate(this);
        const pConn = this.assignmentPConn || this.pConn;
        const caseViewModeFromProps = this.jsComponentPConnect.getComponentProp(this, "caseViewMode");
        const caseViewModeFromRedux = pConn.getValue("context_data.caseViewMode", "");
        if (shouldComponentUpdate || caseViewModeFromProps !== caseViewModeFromRedux) {
            const completeProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
            if (completeProps.pageMessages && completeProps.pageMessages.length > 0) {
                return;
            }
            // with a cancel, need to timeout so todo will update correctly
            if (this.cancelPressed) {
                this.cancelPressed = false;
                this.#scheduleUpdateSelf(500);
            } else {
                // needs to be called after whole redux events processing for submit is finished (see: TASK-1720886 pulse)
                this.#scheduleUpdateSelf();
            }
        }
    }

    #scheduleUpdateSelf(delay = 0) {
        const timeoutId = setTimeout(() => {
            this.setTimeoutIds = this.setTimeoutIds.filter((id) => id !== timeoutId);
            if (!this.alive) {
                return;
            }
            this.updateSelf();
        }, delay);
        this.setTimeoutIds.push(timeoutId);
    }

    #updateBanners() {
        const completeProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
        const newBannerMessages = (completeProps.pageMessages || []).concat(this.#getValidationMessages());

        if (!deepEquals(newBannerMessages, this.bannerMessages)) {
            this.bannerMessages = newBannerMessages;
            this.#destroyBanners();
            this.#createBanners();
            this.#sendPropsUpdate();
        }
    }

    #getValidationMessages() {
        const messages = [];
        const fieldValidationMessages = PCore.getMessageManager().getValidationErrorMessages(this.containerContextKey);
        if (fieldValidationMessages) {
            fieldValidationMessages.forEach((fieldMessage) => {
                const message = `${fieldMessage.label} ${fieldMessage.description}`;
                messages.push({ type: "error", message: message });
            });
        }
        return messages;
    }

    #createBanners() {
        const banners =
            this.bannerMessages && this.bannerMessages.length > 0
                ? [
                      {
                          messages: this.bannerMessages?.map((msg) => this.localizedVal(msg.message, "Messages")),
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

    #destroyBanners() {
        this.alertBannerComponents.forEach((banner) => banner.destroy());
        this.alertBannerComponents = [];
    }

    #initContainer() {
        const flowContainerTarget = `${this.pConn.getContextName()}/${this.pConn.getContainerName()}`;
        const isContainerItemAvailable = PCore.getContainerUtils().getActiveContainerItemName(flowContainerTarget);
        Utils.setOkToInitFlowContainer("false");
        if (!isContainerItemAvailable) {
            this.pConn.getContainerManager().initializeContainers({ type: "single" });
            this.flowContainerHelper.addFlowContainerItem(this.pConn);
        }
    }

    #initComponent() {
        this.#createBanners(this.pConn.resolveConfigProps(this.pConn.getConfigProps()).pageMessages);
        this.childrenPConns = this.pConn.getChildren();
        this.containerContextKey = this.pConn.getContextName().concat("/").concat(this.pConn.getContainerName());
        const oWorkData = this.childrenPConns[0].getPConnect().getDataObject();
        if (oWorkData) {
            this.containerName$ = this.#getContainerName(oWorkData);
        }
    }

    #createAndInitAssignmentComponent() {
        this.assignmentPConn = this.#getAssignmentPConn(this.pConn) || this.pConn;
        const assignmentComponent = this.componentsManager.create("Assignment", [
            this.assignmentPConn,
            this.childrenPConns,
            this.containerContextKey,
        ]);
        assignmentComponent.init();
        this.assignmentComponent = assignmentComponent;
    }

    updateSelf() {
        const caseViewMode = this.assignmentPConn.getValue("context_data.caseViewMode");
        if (caseViewMode === "perform") {
            if (Utils.okToInitFlowContainer()) {
                this.#initContainer();
            }
        } else {
            console.log(TAG, `Case view mode '${caseViewMode}' not supported`);
        }
        this.#finishAssignmentIfNoAssignments();
        this.#updateFlowContainerChildren();
        this.#sendPropsUpdate();
    }

    #finishAssignmentIfNoAssignments() {
        if (!this.#hasAssignments()) {
            const caseMessage =
                this.pConn.getValue("caseMessages") ??
                "Thank you! The next step in this case has been routed appropriately.";
            this.pCorePubSub.publish("assignmentFinished", this.localizedVal(caseMessage, this.localeCategory));
        }
    }

    #hasAssignments() {
        return (
            this.#hasAssignmentsForThisOperator() || this.#hasChildCaseAssignments() || this.#isCaseWideLocalAction()
        );
    }

    #hasAssignmentsForThisOperator() {
        const thisOperator = PCore.getEnvironmentInfo().getOperatorIdentifier();
        const assignments =
            this.pConn.getValue(this.pCoreConstants.CASE_INFO.D_CASE_ASSIGNMENTS_RESULTS)?.filter((assignment) => {
                return assignment.assigneeInfo.ID === thisOperator;
            }) ?? [];
        return assignments.length > 0;
    }

    #hasChildCaseAssignments() {
        const childCases = this.pConn.getValue(this.pCoreConstants.CASE_INFO.CHILD_ASSIGNMENTS);
        let allAssignments = [];
        if (childCases && childCases.length > 0) {
            childCases.forEach(({ assignments = [], Name, caseTypeID }) => {
                const childCaseAssignments = assignments.map((assignment) => ({
                    ...assignment,
                    caseName: Name,
                    caseTypeID,
                }));
                allAssignments = allAssignments.concat(childCaseAssignments);
            });
        }
        return allAssignments.length > 0;
    }

    #isCaseWideLocalAction() {
        const actionID = this.pConn.getValue(this.pCoreConstants.CASE_INFO.ACTIVE_ACTION_ID);
        const caseActions = this.pConn.getValue(this.pCoreConstants.CASE_INFO.CASE_INFO_ACTIONS);
        if (caseActions && actionID) {
            const activeAction = caseActions.find((caseAction) => caseAction.ID === actionID);
            return activeAction?.type === "Case";
        }
        return false;
    }

    #updateFlowContainerChildren() {
        // routingInfo was added as component prop in populateAdditionalProps
        const routingInfo = this.jsComponentPConnect.getComponentProp(this, "routingInfo");
        // this check in routingInfo, mimic Nebula/Constellation (React) to check and get the internals of the
        // flowContainer and force updates to pConnect/redux
        if (!routingInfo) {
            console.error(TAG, "RoutingInfo is not available.");
            return;
        }
        const currentOrder = routingInfo.accessedOrder ?? [];
        const currentItems = routingInfo.items ?? [];
        const type = routingInfo.type;
        if (currentOrder.length === 0) {
            return;
        }
        const key = currentOrder[currentOrder.length - 1];
        if (key && key !== "") {
            this.containerContextKey = key;
        }
        if (currentItems[key]?.view && type === "single" && Object.keys(currentItems[key].view).length > 0) {
            this.#addPConnectAndUpdateChildren(currentItems[key], key);
        }
    }

    #addPConnectAndUpdateChildren(currentItem, key) {
        const rootView = currentItem.view;
        const childPConfig = this.#getChildPConnConfig(rootView, currentItem, key);
        if (!childPConfig) {
            return;
        }
        this.#recreateAssignmentPConnIfChildChanged(childPConfig);
        const childPConn = PCore.createPConnect(childPConfig).getPConnect();
        // getComponent() returns object having getPConnect function inside
        this.childrenPConns = [ReferenceComponent.normalizePConn(childPConn).getComponent()];
        this.containerName$ = this.#getContainerName(childPConn.getDataObject());
        this.assignmentComponent.update(this.assignmentPConn, this.childrenPConns, this.containerContextKey);
    }

    /**
     * When child config has changed we need to create new assignment pConn because some already calculated properties
     * like computed visibility may be outdated and view may not be rendered inside assignment card. (see: BUG-1014611)
     */
    #recreateAssignmentPConnIfChildChanged(childPConfig) {
        if (!this.childPConfig) {
            this.childPConfig = childPConfig;
            return;
        }
        if (!deepEquals(this.childPConfig, childPConfig)) {
            this.assignmentPConn = this.#getAssignmentPConn(this.pConn);
            this.childPConfig = childPConfig;
        }
    }

    #getChildPConnConfig(rootView, currentItem, key) {
        const localPConn = this.childrenPConns[0].getPConnect();
        const config = { meta: rootView };
        if (!rootView.config.name) {
            return null;
        }
        config.options = {
            context: currentItem.context,
            pageReference: rootView.config.context || localPConn.getPageReference(),
            hasForm: true,
            isFlowContainer: true,
            containerName: localPConn.getContainerName(),
            containerItemName: key,
            parentPageReference: localPConn.getPageReference(),
        };
        return config;
    }

    #getContainerName(oWorkData) {
        const assignmentName = oWorkData?.caseInfo?.assignments?.[0]?.name;
        let actionName;
        // Pega 26 may omit caseInfo.availableActions. Prefer the guarded local lookup, then fall back to the CoreJS helper.
        try {
            actionName =
                this.#getActiveCaseActionName(this.pConn) ||
                this.flowContainerHelper.getActiveCaseActionName?.(this.pConn);
        } catch {
            actionName = undefined;
        }
        return this.localizedVal(
            actionName || assignmentName || "",
            undefined,
            this.localeReference
        );
    }

    #getActiveCaseActionName(pConnect) {
        const caseActions = pConnect.getValue(this.pCoreConstants.CASE_INFO.CASE_INFO_ACTIONS);
        if (!Array.isArray(caseActions)) {
            return "";
        }
        const activeActionID = pConnect.getValue(this.pCoreConstants.CASE_INFO.ACTIVE_ACTION_ID);
        const activeAction = caseActions.find((action) => action.ID === activeActionID);
        return activeAction?.name || "";
    }

    #getAssignmentPConn(parentPConnect) {
        const routingInfo = this.jsComponentPConnect.getComponentProp(this, "routingInfo");
        if (!routingInfo) {
            console.error(TAG, "Unable to create assignment PConnect: routingInfo is not available.");
            return null;
        }
        const flowContainerInfo = { accessedOrder: routingInfo.accessedOrder, items: routingInfo.items };
        const isAssignmentView = this.jsComponentPConnect.getComponentProp(this, "isAssignmentView") ?? false;
        const getPConnect = this.flowContainerHelper.createContainerPConnect(
            flowContainerInfo,
            parentPConnect.getPageReference(),
            parentPConnect.getContainerName(),
            isAssignmentView
        );
        return getPConnect();
    }

    #subscribeForEvents() {
        this.pCorePubSub.subscribe(
            this.pCoreConstants.PUB_SUB_EVENTS.EVENT_CANCEL,
            () => {
                this.#handleCancel();
            },
            "cancelAssignment"
        );

        this.pCorePubSub.subscribe(
            "cancelPressed",
            () => {
                this.#handleCancelPressed();
            },
            "cancelPressed"
        );

        this.pCorePubSub.subscribe(
            "updateBanners",
            () => {
                this.#updateBanners();
            },
            "updateBanners"
        );
    }

    #unsubscribeForEvents() {
        this.pCorePubSub.unsubscribe(this.pCoreConstants.PUB_SUB_EVENTS.EVENT_CANCEL, "cancelAssignment");
        this.pCorePubSub.unsubscribe("cancelPressed", "cancelPressed");
        this.pCorePubSub.unsubscribe("updateBanners", "updateBanners");
    }
}
