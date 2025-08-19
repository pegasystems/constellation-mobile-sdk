import { ReferenceComponent } from './reference.component.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import { BaseComponent } from '../base.component.js';

const TAG = '[AssignmentComponent]';

export class AssignmentComponent extends BaseComponent {

  childrenPConns;
  assignmentCardComponent;
  itemKey$;

  jsComponentPConnectData = {};
  configProps$;
  props;

  newPConn;
  containerName$;

  bInitialized = false;

  templateName$;

  arMainButtons$;
  arSecondaryButtons$;

  actionsAPI;

  bHasNavigation$ = false;
  bIsVertical$ = false;
  arCurrentStepIndicies$ = [];
  arNavigationSteps$ = [];

  finishAssignment;
  navigateToStep;
  saveAssignment;
  cancelAssignment;
  cancelCreateStageAssignment;
  showPage;
  approveCase;
  rejectCase;

  bReInit = false;
  loading = true;
  localizedVal;
  localeCategory = 'Assignment';
  localeReference;


  constructor(componentsManager, pConn, childrenPConns, itemKey) {
    super(componentsManager, pConn);

    this.type = "Assignment"
    this.childrenPConns = childrenPConns;
    this.itemKey$ = itemKey;
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
    this.componentsManager.onComponentAdded(this);

    this.initComponent();

    this.jsComponentPConnect.shouldComponentUpdate(this);

    this.bInitialized = true;
    this.localizedVal = PCore.getLocaleUtils().getLocaleValue;
    this.localeReference = `${this.pConn.getCaseInfo().getClassName()}!CASE!${this.pConn.getCaseInfo().getName()}`.toUpperCase();
    this.initialized = true;
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.assignmentCardComponent.destroy();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn, pConnChildren, itemKey) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.jsComponentPConnectData.unsubscribeFn?.();
      this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
    }
    this.childrenPConns = pConnChildren;
    this.itemKey$ = itemKey;
    if (this.bInitialized) {
      this.updateChanges();
    }
  }

  blurAllFields() {
    const event = {
      type: 'FieldChangeWithFocus',
      eventData: {
        focused: 'false'
      }
    }
    this.assignmentCardComponent.onEvent(event);
  }

  sendPropsUpdate() {
    this.props = {
      children: [this.assignmentCardComponent.compId],
      loading: this.loading
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.setLoading(this.newPConn.getLoadingStatus());
    }
  }

  updateChanges() {
    this.newPConn = ReferenceComponent.normalizePConn(this.pConn);

    if (this.childrenPConns) {
      this.createButtons();
    }

    if (this.assignmentCardComponent) {
      this.assignmentCardComponent.update(this.newPConn, this.childrenPConns, this.arMainButtons$, this.arSecondaryButtons$);
    } else {
      const assignmentCardComponentClass = getComponentFromMap("AssignmentCard");
      this.assignmentCardComponent = new assignmentCardComponentClass(this.componentsManager, this.newPConn, this.childrenPConns, this.arMainButtons$, this.arSecondaryButtons$, this.onActionButtonClick);
      this.assignmentCardComponent.init();
    }
    this.loading = this.newPConn.getLoadingStatus();
    this.sendPropsUpdate();
  }

  initComponent() {
    this.newPConn = ReferenceComponent.normalizePConn(this.pConn);
    // prevent re-intializing with flowContainer update unless an action is taken
    this.bReInit = false;
    this.bHasNavigation$ = false;

    this.configProps$ = this.newPConn.resolveConfigProps(this.newPConn.getConfigProps());

    this.templateName$ = this.configProps$.template;

    const actionsAPI = this.newPConn.getActionsApi();
    const baseContext = this.newPConn.getContextName();
    const acName = this.newPConn.getContainerName();

    // for now, in general this should be overridden by updateSelf(), and not be blank
    if (this.itemKey$ === '') {
      this.itemKey$ = baseContext.concat('/').concat(acName);
    }

    this.newPConn.isBoundToState();

    // store off bound functions to below pointers
    this.finishAssignment = actionsAPI.finishAssignment.bind(actionsAPI);
    this.navigateToStep = actionsAPI.navigateToStep.bind(actionsAPI);
    this.saveAssignment = actionsAPI.saveAssignment.bind(actionsAPI);
    this.cancelAssignment = actionsAPI.cancelAssignment.bind(actionsAPI);
    this.showPage = actionsAPI.showPage.bind(actionsAPI);

    this.cancelCreateStageAssignment = actionsAPI.cancelCreateStageAssignment.bind(actionsAPI);
    this.approveCase = actionsAPI.approveCase?.bind(actionsAPI);
    this.rejectCase = actionsAPI.rejectCase?.bind(actionsAPI);
    this.onActionButtonClick = this.onActionButtonClick.bind(this);

    if (this.childrenPConns) {
      this.createButtons();
    }
  }

  setLoading(loading) {
    this.loading = loading;
    this.sendPropsUpdate();
  }

  createButtons() {
    const oData = this.newPConn.getDataObject();
    // inside
    // get fist kid, get the name and display
    // pass first kid to a view container, which will disperse it to a view which will use one column, two column, etc.
    const oWorkItem = this.childrenPConns[0].getPConnect();
    const oWorkData = oWorkItem.getDataObject();

    if (oWorkData) {
      this.actionsAPI = oWorkItem.getActionsApi();
      if (oWorkData.caseInfo && oWorkData.caseInfo.assignments !== null) {
        this.containerName$ = oWorkData.caseInfo.assignments?.[0].name;
        const oCaseInfo = oData.caseInfo;

        if (oCaseInfo && oCaseInfo.actionButtons) {
          this.arMainButtons$ = oCaseInfo.actionButtons.main ?? [];
          this.arSecondaryButtons$ = oCaseInfo.actionButtons.secondary ?? [];
        }

        if (oCaseInfo.navigation != null) {
          this.createButtonsForMultiStepForm(oCaseInfo);
        } else {
          this.bHasNavigation$ = false;
        }
      }
    }
  }

  createButtonsForMultiStepForm(oCaseInfo) {
    this.bHasNavigation$ = true;

    if ((oCaseInfo.navigation.template && oCaseInfo.navigation.template.toLowerCase() === 'standard') || oCaseInfo?.navigation?.steps?.length === 1) {
      this.bHasNavigation$ = false;
    } else if (oCaseInfo.navigation.template && oCaseInfo.navigation.template.toLowerCase() === 'vertical') {
      this.bIsVertical$ = true;
    } else {
      this.bIsVertical$ = false;
    }

    // iterate through steps to find current one(s)
    // immutable, so we want to change the local copy, so need to make a copy
    // what comes back now in configObject is the children of the flowContainer
    this.arNavigationSteps$ = JSON.parse(JSON.stringify(oCaseInfo.navigation.steps));
    this.arNavigationSteps$.forEach(step => {
      if (step.name) {
        step.name = PCore.getLocaleUtils().getLocaleValue(step.name, undefined, this.localeReference);
      }
    });
    this.arCurrentStepIndicies$ = [];
    this.arCurrentStepIndicies$ = this.findCurrentIndicies(this.arNavigationSteps$, this.arCurrentStepIndicies$, 0);
  }

  findCurrentIndicies(arStepperSteps, arIndicies, depth) {
    let count = 0;
    arStepperSteps.forEach(step => {
      if (step.visited_status == 'current') {
        arIndicies[depth] = count;

        // add in
        step.step_status = '';
      } else if (step.visited_status == 'success') {
        count++;
        step.step_status = 'completed';
      } else {
        count++;
        step.step_status = '';
      }

      if (step.steps) {
        arIndicies = this.findCurrentIndicies(step.steps, arIndicies, depth + 1);
      }
    });

    return arIndicies;
  }

  onSaveActionSuccess(data) {
    this.actionsAPI.cancelAssignment(this.itemKey$).then(() => {
      this.setLoading(false);
      PCore.getPubSubUtils().publish(PCore.getConstants().PUB_SUB_EVENTS.CASE_EVENTS.CREATE_STAGE_SAVED, data);
    });
  }

  onActionButtonClick(oData) {
    this.buttonClick(oData.action, oData.buttonType);
  }

  buttonClick(sAction, sButtonType) {
    // needed to show client validation on banner
    PCore.getPubSubUtils().publish('updateBanners');
    if (sButtonType == 'secondary') {

      switch (sAction) {
        case 'navigateToStep':
          // this.erService.sendMessage('publish', '');
          this.blurAllFields();
          this.bReInit = true;
          this.setLoading(true);

          const navigatePromise = this.navigateToStep('previous', this.itemKey$);
          navigatePromise
            .then(() => {
              this.updateChanges();
              this.setLoading(false);
            })
            .catch((error) => {
              this.setLoading(false);
              console.warn(TAG, `'${sAction}' failed with error ${error}`);
              // this.snackBar.open(`${this.localizedVal('Navigation failed!', this.localeCategory)}`, 'Ok');
            })
            .finally(() => {
              PCore.getPubSubUtils().publish('updateBanners');
            });
          break;

        case 'saveAssignment': {
          const caseID = this.pConn.getCaseInfo().getKey();
          const assignmentID = this.pConn.getCaseInfo().getAssignmentID();
          const savePromise = this.saveAssignment(this.itemKey$);

          savePromise
            .then(() => {
              const caseType = this.pConn.getCaseInfo().c11nEnv.getValue(PCore.getConstants().CASE_INFO.CASE_TYPE_ID);
              PCore.getPubSubUtils().publish('cancelPressed');
              this.onSaveActionSuccess({caseType, caseID, assignmentID});
            })
            .catch((error) => {
              this.setLoading(false);
              console.warn(TAG, `'${sAction}' failed with error ${error}`);
              // this.snackBar.open(`${this.localizedVal('Save failed', this.localeCategory)}`, 'Ok');
            })
            .finally(() => {
              PCore.getPubSubUtils().publish('updateBanners');
            });

          break;
        }

        case 'cancelAssignment':
          this.bReInit = true;
          // this.psService.sendMessage(true);
          PCore.getPubSubUtils().publish('cancelPressed');
          // cancel will never cause case to be deleted.
          // That could be done with 'cancelCreateStageAssignment' but it needs assignment action to be 'modal'
          // current bootstrap-shell.js does not provide any option to use 'modal'.
          const cancelPromise = this.cancelAssignment(this.itemKey$);
          cancelPromise
            .then(() => {
              this.setLoading(false);
              PCore.getPubSubUtils().publish(PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL);
            })
            .catch((error) => {
              this.setLoading(false);
              console.warn(TAG, `'${sAction}' failed with error ${error}`);
            });
          break;

        case 'rejectCase': {
          const rejectPromise = this.rejectCase(this.itemKey$);

          rejectPromise
            .then(() => {
            })
            .catch((error) => {
              this.setLoading(false);
              console.warn(TAG, `'${sAction}' failed with error ${error}`);
              // this.snackBar.open(`${this.localizedVal('Rejection failed!', this.localeCategory)}`, 'Ok');
            });

          break;
        }

        default:
          break;
      }
    } else if (sButtonType == 'primary') {
      switch (sAction) {
        case 'finishAssignment':
          // this.erService.sendMessage('publish', '');
          this.blurAllFields();
          this.bReInit = true;
          this.setLoading(true);
          const finishPromise = this.finishAssignment(this.itemKey$);
          finishPromise
            .then(() => {
              console.log(TAG, `'${sAction}' finished successfully`);
              this.setLoading(false);
              this.updateChanges();
            })
            .catch((error) => {
              this.setLoading(false);
              console.warn(TAG, `'${sAction}' failed with error ${error}`);
              // this.snackBar.open(`${this.localizedVal('Submit failed!', this.localeCategory)}`, 'Ok');
            })
            .finally(() => {
              PCore.getPubSubUtils().publish('updateBanners');
            });
          break;

        case 'approveCase': {
          const approvePromise = this.approveCase(this.itemKey$);

          approvePromise
            .then(() => {
            })
            .catch((error) => {
              this.setLoading(false);
              console.warn(TAG, `'${sAction}' failed with error ${error}`);
              // this.snackBar.open(`${this.localizedVal('Approve failed!', this.localeCategory)}`, 'Ok');
            })
            .finally(() => {
              PCore.getPubSubUtils().publish('updateBanners');
            });

          break;
        }
        default:
          break;
      }
    }
  }
}
