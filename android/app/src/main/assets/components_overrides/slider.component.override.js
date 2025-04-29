export class SliderComponent {
  pConn$;

  jsComponentPConnectData = {};
  configProps$;

  label$ = '';
  value$;
  bRequired$ = false;
  bReadonly$ = false;
  bDisabled$ = false;
  bVisible$ = true;
  displayMode$ = '';
  controlName$;
  bHasForm$ = true;
  componentReference = '';
  testId;
  helperText;
  placeholder;

  actionsApi;
  propName;
  compId;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = this.componentsManager.jsComponentPConnect
    this.controlName$ = this.jsComponentPConnect.getComponentID(this);
    this.type = pConn$.meta.type
  }

  init() {
    console.log("Initiating custom slider component!")
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      console.log("destroy for slider component - id:  ", this.jsComponentPConnectData.compID);
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
      this.checkAndUpdate();
    }
  }

  onStateChange() {
    this.checkAndUpdate();
  }

  checkAndUpdate() {
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

    if (bUpdateSelf) {
      this.updateSelf();
    }
  }

  updateSelf() {
    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.testId = this.configProps$.testId;
    this.label$ = this.configProps$.label;
    this.displayMode$ = this.configProps$.displayMode;

    if (this.configProps$.value != undefined) {
      this.value$ = this.configProps$.value;
    }
    this.helperText = this.configProps$.helperText || '';

    setTimeout(() => {
      if (this.configProps$.required != null) {
        this.bRequired$ = getBooleanValue(this.configProps$.required);
      }
    });

    if (this.configProps$.visibility != null) {
      this.bVisible$ = getBooleanValue(this.configProps$.visibility);
    }

    if (this.configProps$.disabled != undefined) {
      this.bDisabled$ = getBooleanValue(this.configProps$.disabled);
    }

    if (this.configProps$.readOnly != null) {
      this.bReadonly$ = getBooleanValue(this.configProps$.readOnly);
    }

    this.actionsApi = this.pConn$.getActionsApi();
    this.propName = this.pConn$.getStateProps().value;

    this.componentReference = this.pConn$.getStateProps().value;

    this.props = {
      value: this.value$,
      label: this.label$,
      visible: this.bVisible$,
      required: this.bRequired$,
      disabled: this.bDisabled$,
      readOnly: this.bReadonly$,
      helperText: "This is custom component",
      validateMessage: this.jsComponentPConnectData.validateMessage || ''
    }
    this.componentsManager.onComponentPropsUpdate(this);
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange() {
    this.value$ = value;
  }

  fieldOnBlur(event) {
    this.value$ = event?.target?.value || this.value$;
    const submittedValue = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps()).value;
    if (this.value$ !== submittedValue) {
      handleEvent(this.actionsApi, 'changeNblur', this.propName, this.value$);
    }
    clearErrorMessagesIfNoErrors(this.pConn$, this.propName, this.jsComponentPConnectData.validateMessage);
  }
}

function getBooleanValue(inValue) {
    let bReturn = false;

    if (typeof inValue === 'string') {
      if (inValue.toLowerCase() == 'true') {
        bReturn = true;
      }
    } else {
      bReturn = inValue;
    }

    return bReturn;
  }


function handleEvent(actions, eventType, propName, value) {
    switch (eventType) {
      case 'change':
        actions.updateFieldValue(propName, value);
        break;
      case 'blur':
        actions.triggerFieldChange(propName, value);
        break;
      case 'changeNblur':
        actions.updateFieldValue(propName, value);
        actions.triggerFieldChange(propName, value);
        break;
      default:
        break;
    }
  }

function clearErrorMessagesIfNoErrors(pConn, propName, validateMessage) {
  if (!validateMessage || validateMessage === '') {
    pConn.clearErrorMessages({
      property: propName
    });
  }
}
