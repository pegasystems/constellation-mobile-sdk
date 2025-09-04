import {ReferenceComponent} from './reference.component.js';
import {Utils} from '../../helpers/utils.js';
import {BaseComponent} from '../base.component.js';

const TAG = '[FlowContainerComponent]';

export class FlowContainerComponent extends BaseComponent {

  jsComponentPConnectData = {};
  pCoreConstants;
  props;
  childrenPConns = [];
  assignmentComponent;
  alertBannerComponents = [];
  containerName$;
  bannerMessages;
  cancelPressed = false;

  // messages
  localizedVal;
  localeCategory = 'Messages';
  localeReference;

  assignmentPConn;
  containerContextKey;
  flowContainerHelper = PCore.getContainerUtils().getFlowContainer();
  pCorePubSub = PCore.getPubSubUtils();

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
    this.componentsManager.onComponentAdded(this);

    this.localizedVal = PCore.getLocaleUtils().getLocaleValue;
    const caseInfo = this.pConn.getCaseInfo();
    this.localeReference = `${caseInfo?.getClassName()}!CASE!${caseInfo.getName()}`.toUpperCase();

    this.pCoreConstants = PCore.getConstants();
    this.#initComponent();
    this.#initContainer();
    this.#checkAndUpdate();
    this.#createAndInitAssignmentComponent(); // needs to be called after #initComponent and #checkAndUpdate
    this.#subscribeForEvents();
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.assignmentComponent.destroy();
    this.componentsManager.onComponentRemoved(this);
    this.#unsubscribeForEvents()
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.#checkAndUpdate();
    }
  }

  #sendPropsUpdate() {
    const caseId = this.pConn.getCaseSummary().content.pyID;
    const title = caseId ? `${this.containerName$} (${caseId})` : 'Loading ...';
    this.props = {
      title: title,
      assignment: this.assignmentComponent.compId,
      alertBanners: this.alertBannerComponents.map(banner => banner.compId)
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  #handleCancel() {
    Utils.setOkToInitFlowContainer('true');
  }

  #handleCancelPressed() {
    this.cancelPressed = true;
  }

  #checkAndUpdate() {
    const shouldComponentUpdate = this.jsComponentPConnect.shouldComponentUpdate(this);
    const pConn = this.assignmentPConn || this.pConn;
    const caseViewModeFromProps = this.jsComponentPConnect.getComponentProp(this, 'caseViewMode');
    const caseViewModeFromRedux = pConn.getValue('context_data.caseViewMode', '');
    if (shouldComponentUpdate || caseViewModeFromProps !== caseViewModeFromRedux) {
      const completeProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
      if (completeProps.pageMessages && completeProps.pageMessages.length > 0) {
        return;
      }
      // with a cancel, need to timeout so todo will update correctly
      if (this.cancelPressed) {
        this.cancelPressed = false;
        setTimeout(() => this.#updateSelf(), 500);
      } else {
        // needs to be called after whole redux events processing for submit is finished (see: TASK-1720886 pulse)
        setTimeout(() => this.#updateSelf());
      }
    }
  }

  #updateBanners() {
    const completeProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
    const newBannerMessages = (completeProps.pageMessages || []).concat(this.#getValidationMessages());

    if (JSON.stringify(newBannerMessages) !== JSON.stringify(this.bannerMessages)) {
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
      fieldValidationMessages.forEach(fieldMessage => {
        const message = `${fieldMessage.label} ${fieldMessage.description}`;
        messages.push({type: 'error', message: message})
      });
    }
    return messages;
  }

  #createBanners() {
    const banners = (this.bannerMessages && this.bannerMessages.length > 0)
      ? [{messages: this.bannerMessages?.map(msg => this.localizedVal(msg.message, 'Messages')), variant: 'urgent'}]
      : [];

    this.alertBannerComponents = banners.map(b => this.createComponent("AlertBanner", [b.variant, b.messages]));
  }

  #destroyBanners() {
    this.alertBannerComponents.forEach(banner => banner.destroy());
    this.alertBannerComponents = [];
  }

  #initContainer() {
    const flowContainerTarget = `${this.pConn.getContextName()}/${this.pConn.getContainerName()}`;
    const isContainerItemAvailable = PCore.getContainerUtils().getActiveContainerItemName(flowContainerTarget);
    Utils.setOkToInitFlowContainer('false');
    if (!isContainerItemAvailable) {
      this.pConn.getContainerManager().initializeContainers({type: 'single'});
      this.flowContainerHelper.addFlowContainerItem(this.pConn);
    }
  }

  #initComponent() {
    this.#createBanners(this.pConn.resolveConfigProps(this.pConn.getConfigProps()).pageMessages);
    this.childrenPConns = this.pConn.getChildren();
    this.containerContextKey = this.pConn.getContextName().concat('/').concat(this.pConn.getContainerName());
    const oWorkData = this.childrenPConns[0].getPConnect().getDataObject();
    if (oWorkData) {
      this.containerName$ = this.#getContainerName(oWorkData);
    }
  }

  #createAndInitAssignmentComponent() {
    this.assignmentPConn = this.#getAssignmentPConn(this.pConn) || this.pConn;
    this.assignmentComponent = this.createComponent("Assignment", [this.assignmentPConn, this.childrenPConns, this.containerContextKey]);
  }

  #updateSelf() {
    const caseViewMode = this.assignmentPConn.getValue('context_data.caseViewMode');
    if (caseViewMode === 'perform') {
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
    if (!(this.#hasAssignments())) {
      const caseMessage = this.pConn.getValue('caseMessages') ?? 'Thank you! The next step in this case has been routed appropriately.'
      this.pCorePubSub.publish('assignmentFinished', this.localizedVal(caseMessage, this.localeCategory));
    }
  }

  #hasAssignments() {
    return this.#hasAssignmentsForThisOperator() || this.#hasChildCaseAssignments() || this.#isCaseWideLocalAction();
  }

  #hasAssignmentsForThisOperator() {
    const thisOperator = PCore.getEnvironmentInfo().getOperatorIdentifier();
    const assignments = this.pConn.getValue(this.pCoreConstants.CASE_INFO.D_CASE_ASSIGNMENTS_RESULTS)?.filter(assignment => {
      return assignment.assigneeInfo.ID === thisOperator;
    }) ?? [];
    return assignments.length > 0;
  }

  #hasChildCaseAssignments() {
    const childCases = this.pConn.getValue(this.pCoreConstants.CASE_INFO.CHILD_ASSIGNMENTS);
    let allAssignments = [];
    if (childCases && childCases.length > 0) {
      childCases.forEach(({assignments = [], Name, caseTypeID}) => {
        const childCaseAssignments = assignments.map((assignment) => ({
          ...assignment,
          caseName: Name,
          caseTypeID
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
      return activeAction?.type === 'Case';
    }
    return false;
  };

  #updateFlowContainerChildren() {
    // routingInfo was added as component prop in populateAdditionalProps
    const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');
    // this check in routingInfo, mimic Nebula/Constellation (React) to check and get the internals of the
    // flowContainer and force updates to pConnect/redux
    if (!routingInfo) {
      console.error(TAG, "routingInfo is not available.");
      return;
    }
    const currentOrder = routingInfo.accessedOrder ?? [];
    const currentItems = routingInfo.items ?? [];
    const type = routingInfo.type;
    if (currentOrder.length === 0) {
      return;
    }
    const key = currentOrder[currentOrder.length - 1];
    if (key && key !== '') {
      this.containerContextKey = key;
    }
    if (currentItems[key]?.view && type === 'single' && Object.keys(currentItems[key].view).length > 0) {
      this.#addPConnectAndUpdateChildren(currentItems[key], key);
    }
  }

  #addPConnectAndUpdateChildren(currentItem, key) {
    const rootView = currentItem.view;
    const childPConfig = this.#getChildPConnConfig(rootView, currentItem, key);
    if (!childPConfig) {
      return;
    }
    const childPConn = PCore.createPConnect(childPConfig).getPConnect();
    // getComponent() returns object having getPConnect function inside
    this.childrenPConns = [ReferenceComponent.normalizePConn(childPConn).getComponent()];
    this.containerName$ = this.#getContainerName(childPConn.getDataObject());
    this.assignmentComponent.update(this.assignmentPConn, this.childrenPConns, this.containerContextKey);
  }

  #getChildPConnConfig(rootView, currentItem, key) {
    const localPConn = this.childrenPConns[0].getPConnect();
    const config = {meta: rootView};
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
      parentPageReference: localPConn.getPageReference()
    };
    return config;
  }

  #getContainerName(oWorkData) {
    const actionName = this.flowContainerHelper.getActiveCaseActionName?.(this.pConn) ?? this.#getActiveCaseActionName(this.pConn);
    return this.localizedVal(actionName || oWorkData.caseInfo.assignments?.[0].name, undefined, this.localeReference);
  }

  #getActiveCaseActionName(pConnect) {
    const caseActions = pConnect.getValue(this.pCoreConstants.CASE_INFO.CASE_INFO_ACTIONS);
    const activeActionID = pConnect.getValue(this.pCoreConstants.CASE_INFO.ACTIVE_ACTION_ID);
    const activeAction = caseActions.find((action) => action.ID === activeActionID);
    return activeAction?.name || '';
  }

  #getAssignmentPConn(parentPConnect) {
    const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');
    const flowContainerInfo = {accessedOrder: routingInfo.accessedOrder, items: routingInfo.items};
    const isAssignmentView = this.jsComponentPConnect.getComponentProp(this, 'isAssignmentView') ?? false;
    this.flowContainerHelper.createContainerPConnect(
      flowContainerInfo,
      parentPConnect.getPageReference(),
      parentPConnect.getContainerName(),
      isAssignmentView
    );
  }

  #subscribeForEvents() {
    this.pCorePubSub.subscribe(
      this.pCoreConstants.PUB_SUB_EVENTS.EVENT_CANCEL, () => {
        this.#handleCancel();
      },
      'cancelAssignment'
    );

    this.pCorePubSub.subscribe(
      'cancelPressed',
      () => {
        this.#handleCancelPressed();
      },
      'cancelPressed'
    );

    this.pCorePubSub.subscribe(
      'updateBanners',
      () => {
        this.#updateBanners()
      },
      'updateBanners'
    );
  }

  #unsubscribeForEvents() {
    this.pCorePubSub.unsubscribe(this.pCoreConstants.PUB_SUB_EVENTS.EVENT_CANCEL, 'cancelAssignment');
    this.pCorePubSub.unsubscribe('cancelPressed', 'cancelPressed');
    this.pCorePubSub.unsubscribe('updateBanners', 'updateBanners');
  }
}
