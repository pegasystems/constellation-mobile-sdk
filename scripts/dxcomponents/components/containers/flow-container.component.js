import { ReferenceComponent } from './reference.component.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import { Utils } from '../../helpers/utils.js';
import { BaseComponent } from '../base.component.js';

export class FlowContainerComponent extends BaseComponent {

  jsComponentPConnectData = {};
  pCoreConstants;
  configProps$;
  props;
  formGroup$;
  arChildren$ = [];
  assignmentComponent;
  alertBannerComponents = [];
  itemKey$ = '';
  containerName$;
  buildName$;
  bannerMessages;

  bHasCancel = false;

  // messages
  caseMessages$;
  bHasCaseMessages$ = false;
  bShowConfirm = false;
  // bShowBanner; // this is banner for popup confirmation window
  confirm_pconn;
  localizedVal;
  localeCategory = 'Messages';
  localeReference;

  pConnectOfActiveContainerItem;

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);

    this.localizedVal = PCore.getLocaleUtils().getLocaleValue;
    const caseInfo = this.pConn$.getCaseInfo();
    this.localeReference = `${caseInfo?.getClassName()}!CASE!${caseInfo.getName()}`.toUpperCase();

    this.pCoreConstants = PCore.getConstants();
    // with init, force children to be loaded of global pConn
    this.initComponent(true);
    this.initContainer();
    this.checkAndUpdate();

    PCore.getPubSubUtils().subscribe(
      PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
      () => {
        this.handleCancel();
      },
      'cancelAssignment'
    );

    PCore.getPubSubUtils().subscribe(
      'cancelPressed',
      () => {
        this.handleCancelPressed();
      },
      'cancelPressed'
    );

    PCore.getPubSubUtils().subscribe(
      'updateBanners',
      () => {
        this.updateBanners()
      },
      'updateBanners'
    );
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.assignmentComponent.destroy();
    this.componentsManager.onComponentRemoved(this);

    PCore.getPubSubUtils().unsubscribe(PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL, 'cancelAssignment');
    PCore.getPubSubUtils().unsubscribe('cancelPressed', 'cancelPressed');
  }

  update(pConn) {
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
      this.checkAndUpdate();
    }
  }

  sendPropsUpdate() {
    const caseId = this.pConn$.getCaseSummary().content.pyID;
    const title = caseId ? `${this.containerName$} (${caseId})` : 'Loading ...';
    this.props = {
      title: title,
      assignment: this.assignmentComponent.compId,
      alertBanners: this.alertBannerComponents.map(banner => banner.compId)
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  handleCancel() {
    Utils.setOkToInitFlowContainer('true');
  }

  handleCancelPressed() {
    this.bHasCancel = true;
  }

  onStateChange() {
    this.checkAndUpdate();
  }

  checkAndUpdate() {
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

    const pConn = this.pConnectOfActiveContainerItem || this.pConn$;
    const caseViewModeFromProps = this.jsComponentPConnect.getComponentProp(this, 'caseViewMode');
    const caseViewModeFromRedux = pConn.getValue('context_data.caseViewMode', '');
    if (bUpdateSelf || caseViewModeFromProps !== caseViewModeFromRedux) {
      const completeProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
      if (!completeProps.pageMessages || completeProps.pageMessages.length == 0) {
        // with a cancel, need to timeout so todo will update correctly
        if (this.bHasCancel) {
          this.bHasCancel = false;
          setTimeout(() => {
            this.updateSelf();
          }, 500);
        } else {
          // needs to be called after whole redux events processing for submit is finished (see: TASK-1720886 pulse)
          setTimeout(() => {
            this.updateSelf();
          })
        }
      }
    }
  }

  updateBanners() {
    const completeProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
    const newBannerMessages = (completeProps.pageMessages || []).concat(this.getValidationMessages());

    if (JSON.stringify(newBannerMessages) !== JSON.stringify(this.bannerMessages)) {
      this.bannerMessages = newBannerMessages;
      this.destroyBanners();
      this.createBanners();
      this.sendPropsUpdate();
    }
  }

  getValidationMessages() {
    const messages = [];
    const fieldValidationMessages = PCore.getMessageManager().getValidationErrorMessages(this.itemKey$);
    if (fieldValidationMessages) {
      fieldValidationMessages.forEach(fieldMessage => {
        const message = `${fieldMessage.label} ${fieldMessage.description}`;
        messages.push({type: 'error', message: message})
      });
    }
    return messages;
  }

  createBanners() {
    const banners = (this.bannerMessages && this.bannerMessages.length > 0)
      ? [{ messages: this.bannerMessages?.map(msg => this.localizedVal(msg.message, 'Messages')), variant: 'urgent' }]
      : [];
    const alertBannerComponentClass = getComponentFromMap("AlertBanner");

    banners.forEach(banner => {
      const alertBannerComponent = new alertBannerComponentClass(this.componentsManager, banner.variant, banner.messages);
      alertBannerComponent.init();
      this.alertBannerComponents.push(alertBannerComponent);
    });
  }

  destroyBanners() {
    this.alertBannerComponents.forEach(bannerComponent => {
      bannerComponent.destroy();
    });
    this.alertBannerComponents = [];
  }

  initContainer() {
    const containerMgr = this.pConn$.getContainerManager();
    const baseContext = this.pConn$.getContextName();
    const containerName = this.pConn$.getContainerName();
    const containerType = 'single';

    const flowContainerTarget = `${baseContext}/${containerName}`;
    const isContainerItemAvailable = PCore.getContainerUtils().getActiveContainerItemName(flowContainerTarget);

    Utils.setOkToInitFlowContainer('false');

    if (!isContainerItemAvailable) {
      containerMgr.initializeContainers({
        type: containerType
      });

      this.addContainerItem(this.pConn$);
    }
  }

  initComponent(bLoadChildren) {
    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.createBanners(this.configProps$.pageMessages);

    // when true, update arChildren from pConn, otherwise, arChilren will be updated in updateSelf()
    if (bLoadChildren) {
      this.arChildren$ = this.pConn$.getChildren();
    }

    const baseContext = this.pConn$.getContextName();
    const acName = this.pConn$.getContainerName();

    if (this.itemKey$ === '') {
      this.itemKey$ = baseContext.concat('/').concat(acName);
    }

    this.pConn$.isBoundToState();
    // inside
    // get fist kid, get the name and display
    // pass first kid to a view container, which will disperse it to a view which will use one column, two column, etc.
    const oWorkItem = this.arChildren$[0].getPConnect();
    const oWorkData = oWorkItem.getDataObject();

    if (bLoadChildren && oWorkData) {
      this.containerName$ = this.localizedVal(this.getActiveViewLabel() || oWorkData.caseInfo.assignments[0].name, undefined, this.localeReference);
    }
  }

  hasAssignments() {
    let hasAssignments = false;
    const assignmentsList = this.pConn$.getValue(this.pCoreConstants.CASE_INFO.D_CASE_ASSIGNMENTS_RESULTS) || []
    let bAssignmentsForThisOperator = false;

    const thisOperator = PCore.getEnvironmentInfo().getOperatorIdentifier();

    for (const assignment of assignmentsList) {
      if (assignment.assigneeInfo.ID === thisOperator) {
        bAssignmentsForThisOperator = true;
      }
    }

    if (!assignmentsList) {
      return hasAssignments;
    }

    const hasChildCaseAssignments = this.hasChildCaseAssignments();

    if (bAssignmentsForThisOperator || hasChildCaseAssignments || this.isCaseWideLocalAction()) {
      hasAssignments = true;
    }

    return hasAssignments;
  }

  isCaseWideLocalAction() {
    const actionID = this.pConn$.getValue(this.pCoreConstants.CASE_INFO.ACTIVE_ACTION_ID);
    const caseActions = this.pConn$.getValue(this.pCoreConstants.CASE_INFO.AVAILABLEACTIONS);
    let bCaseWideAction = false;
    if (caseActions && actionID) {
      const actionObj = caseActions.find(caseAction => caseAction.ID === actionID);
      if (actionObj) {
        bCaseWideAction = actionObj.type === 'Case';
      }
    }
    return bCaseWideAction;
  }

  hasChildCaseAssignments() {
    const childCases = this.pConn$.getValue(this.pCoreConstants.CASE_INFO.CHILD_ASSIGNMENTS);

    return childCases && childCases.length > 0;
  }

  getActiveViewLabel() {
    let activeActionLabel = '';

    const { CASE_INFO: CASE_CONSTS } = PCore.getConstants();

    const caseActions = this.pConn$.getValue(CASE_CONSTS.CASE_INFO_ACTIONS);
    const activeActionID = this.pConn$.getValue(CASE_CONSTS.ACTIVE_ACTION_ID);
    const activeAction = caseActions?.find(action => action.ID === activeActionID);
    if (activeAction) {
      activeActionLabel = activeAction.name;
    }
    return activeActionLabel;
  }


  updateSelf() {
    this.pConnectOfActiveContainerItem = this.getPConnectOfActiveContainerItem(this.pConn$) || this.pConn$;

    if (this.assignmentComponent) {
      this.assignmentComponent.update(this.pConnectOfActiveContainerItem, this.arChildren$);
    } else {
      const assignmentComponentClass = getComponentFromMap("Assignment");
      this.assignmentComponent = new assignmentComponentClass(this.componentsManager, this.pConnectOfActiveContainerItem, this.arChildren$, this.itemKey$);
      this.assignmentComponent.init();
    }
    this.sendPropsUpdate();

    const caseViewMode = this.pConnectOfActiveContainerItem.getValue('context_data.caseViewMode');
    // this.bShowBanner = showBanner(this.pConn$); //disabling

    if (caseViewMode && caseViewMode === 'perform') {

      // this is different than Angu1ar SDK, as we need to initContainer if root container reloaded
      if (Utils.okToInitFlowContainer()) {
        this.initContainer();
      }
    } else {
      console.log(`Case view mode '${caseViewMode}' not supported`);
    }

    // if have caseMessage show message and end
    this.showCaseMessages();

    this.updateFlowContainerChildren();

    console.log("FlowContainer children: ", this.arChildren$)
  }

  showCaseMessages() {
    this.caseMessages$ = this.localizedVal(this.pConn$.getValue('caseMessages'), this.localeCategory);
    // caseMessages's behavior has changed in 24.2, and hence it doesn't let Optional Action work.
    // Changing the below condition for now. Was: (theCaseMessages || !hasAssignments())
    if (!this.hasAssignments()) {
      this.bHasCaseMessages$ = true;
      this.bShowConfirm = true;
      // Temp fix for 8.7 change: confirmationNote no longer coming through in caseMessages$.
      // So, if we get here and caseMessages$ is empty, use default value in DX API response
      if (!this.caseMessages$) {
        this.caseMessages$ = this.localizedVal('Thank you! The next step in this case has been routed appropriately.', this.localeCategory);
      }

      // publish this "assignmentFinished" for mashup, need to get approved as a standard
      PCore.getPubSubUtils().publish('assignmentFinished', this.caseMessages$);
    } else {
      this.bHasCaseMessages$ = false;
      this.bShowConfirm = false;
    }
  }

  updateFlowContainerChildren() {
    // routingInfo was added as component prop in populateAdditionalProps
    const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');
    this.confirm_pconn = null;

    let loadingInfo;
    try {
      // @ts-ignore - Property 'getLoadingStatus' is private and only accessible within class 'C11nEnv'
      loadingInfo = this.pConn$.getLoadingStatus();
    } catch (ex) {
      /* empty */
    }

    // this check in routingInfo, mimic Nebula/Constellation (React) to check and get the internals of the
    // flowContainer and force updates to pConnect/redux
    if (routingInfo && loadingInfo !== undefined) {
      const currentOrder = routingInfo.accessedOrder;
      const currentItems = routingInfo.items;
      const type = routingInfo.type;
      if (currentOrder && currentItems) {
        // JA - making more similar to Nebula/Constellation
        const key = currentOrder[currentOrder.length - 1];

        // save off itemKey to be used for finishAssignment, etc.
        if (key && key != '') {
          this.itemKey$ = key;
        }

        // eslint-disable-next-line sonarjs/no-collapsible-if
        if (currentOrder.length > 0) {
          if (currentItems[key] && currentItems[key].view && type === 'single' && Object.keys(currentItems[key].view).length > 0) {
            // when we get here, it it because the flow action data has changed
            // from the server, and need to add to pConnect and update children
            this.addPConnectAndUpdateChildren(currentItems[key], key);
          }
        }
      }
    }
  }

  addPConnectAndUpdateChildren(currentItem, key) {
    const localPConn = this.arChildren$[0].getPConnect();

    const rootView = currentItem.view;
    const { context, name: ViewName } = rootView.config;
    const config = { meta: rootView };

    if (!ViewName) {
      return;
    }

    config.options = {
      context: currentItem.context,
      pageReference: context || localPConn.getPageReference(),
      hasForm: true,
      isFlowContainer: true,
      containerName: localPConn.getContainerName(),
      containerItemName: key,
      parentPageReference: localPConn.getPageReference()
    };

    const configObject = PCore.createPConnect(config);
    this.confirm_pconn = configObject.getPConnect();
    const normalizedConfigObject = ReferenceComponent.normalizePConn(configObject.getPConnect());
    // We want the children to be the PConnect itself, not the result of calling getPConnect(),
    //  So need to get the PConnect of the normalized component we just created...
    const normalizedConfigObjectAsPConnect = normalizedConfigObject.getComponent();
    this.buildName$ = this.getBuildName();
    this.arChildren$ = [];
    this.arChildren$.push(normalizedConfigObjectAsPConnect);
    console.log("FlowContaner normalizedConfigObjectAsPConnect: ", normalizedConfigObjectAsPConnect);
    const oWorkItem = configObject.getPConnect();
    const oWorkData = oWorkItem.getDataObject();

    this.containerName$ = this.localizedVal(this.getActiveViewLabel() || oWorkData.caseInfo.assignments?.[0].name, undefined, this.localeReference);

    this.assignmentComponent.update(this.pConnectOfActiveContainerItem, this.arChildren$, this.itemKey$);
  }

  getBuildName() {
    const context = this.pConn$.getContextName();
    let viewContainerName = this.pConn$.getContainerName();

    if (!viewContainerName) viewContainerName = '';
    return `${context.toUpperCase()}/${viewContainerName.toUpperCase()}`;
  }

  formValid() {
    this.touchAll();
    return this.formGroup$.valid;
  }

  touchAll() {
    Object.values(this.formGroup$.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  topViewRefresh() {
    Object.values(this.formGroup$.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // helpers - copyied from flow container helpers.js

  addContainerItem(pConnect) {
    // copied from flow container helper.js
    const containerManager = pConnect.getContainerManager();
    const contextName = pConnect.getContextName(); // here we will get parent context name, as flow container is child of view container
    const caseViewMode = pConnect.getValue('context_data.caseViewMode');

    let key;
    let flowName;

    if (caseViewMode !== 'review') {
      const target = contextName.substring(0, contextName.lastIndexOf('_'));
      const activeContainerItemID = PCore.getContainerUtils().getActiveContainerItemName(target);
      const containerItemData = PCore.getContainerUtils().getContainerItemData(target, activeContainerItemID);

      if (containerItemData) {
        ({ key, flowName } = containerItemData);
      }
    }

    containerManager.addContainerItem({
      semanticURL: '',
      key,
      flowName,
      caseViewMode: 'perform',
      resourceType: 'ASSIGNMENT',
      data: pConnect.getDataObject(contextName)
    });
  }

  // helpers
  getPConnectOfActiveContainerItem(parentPConnect) {
    const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');
    const isAssignmentView = this.jsComponentPConnect.getComponentProp(this, 'isAssignmentView');
    return this.getPConnectOfActiveContainerItem2(routingInfo, {
      isAssignmentView,
      parentPConnect
    });
  }

  getPConnectOfActiveContainerItem2 = (containerInfo, options) => {
    const { accessedOrder, items } = containerInfo;
    const { isAssignmentView = false, parentPConnect } = options;
    const containerName = parentPConnect.getContainerName();
    const { CONTAINER_NAMES } = PCore.getContainerUtils();
    const { CREATE_DETAILS_VIEW_NAME } = PCore.getConstants();

    if (accessedOrder && items) {
      const activeContainerItemKey = accessedOrder[accessedOrder.length - 1];

      if (items[activeContainerItemKey] && items[activeContainerItemKey].view && Object.keys(items[activeContainerItemKey].view).length > 0) {
        const activeContainerItem = items[activeContainerItemKey];
        const target = activeContainerItemKey.substring(0, activeContainerItemKey.lastIndexOf('_'));

        const { view: rootView, context } = activeContainerItem;
        const { viewName, viewContext } = this.processRootViewDetails(rootView, activeContainerItem, { parentPConnect });

        if (!viewName) return null;

        const config = {
          meta: rootView,
          options: {
            context,
            pageReference: viewContext || parentPConnect.getPageReference(),
            containerName,
            containerItemID: activeContainerItemKey,
            parentPageReference: parentPConnect.getPageReference(),
            hasForm:
              isAssignmentView ||
              containerName === CONTAINER_NAMES.WORKAREA ||
              containerName === CONTAINER_NAMES.MODAL ||
              viewName === CREATE_DETAILS_VIEW_NAME,
            target
          }
        };
        return PCore.createPConnect(config).getPConnect();
      }
    }
    return null;
  };

  processRootViewDetails = (rootView, containerItem, options) => {
    const {
      config: { context: viewContext, name: viewName }
    } = rootView;
    const { context: containerContext } = containerItem;
    const { parentPConnect } = options;
    let resolvedViewName = viewName;
    let resolvedViewContext = viewContext;

    const isAnnotedViewName = PCore.getAnnotationUtils().isProperty(viewName);
    const isAnnotedViewContext = PCore.getAnnotationUtils().isProperty(viewContext);

    // resolving annoted view context
    if (isAnnotedViewContext) {
      const viewContextProperty = PCore.getAnnotationUtils().getPropertyName(viewContext);
      resolvedViewContext = PCore.getStoreValue(
        `.${viewContextProperty}`,
        viewContextProperty.startsWith('.') ? parentPConnect.getPageReference() : '',
        containerContext
      );
    }

    if (!resolvedViewContext) {
      resolvedViewContext = parentPConnect.getPageReference();
    }

    // resolving annoted view name
    if (isAnnotedViewName) {
      const viewNameProperty = PCore.getAnnotationUtils().getPropertyName(viewName);
      resolvedViewName = PCore.getStoreValue(`.${viewNameProperty}`, resolvedViewContext, containerContext);
    }

    /* Special case where context and viewname are dynamic values
      Use case - split for each shape
      Ex - (caseInfo.content.SCRequestWorkQueues[1]):context --> .pyViewName:viewName
    */
    if (isAnnotedViewName && isAnnotedViewContext && resolvedViewName !== '') {
      /* Allow context processor to resolve view and context when both are dynamic */
      resolvedViewName = viewName;
      resolvedViewContext = viewContext;
    }

    return {
      viewName: resolvedViewName,
      viewContext: resolvedViewContext
    };
  };
}
