export class EmailComponent {
  pConn$;
  formGroup$;

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

  // fieldControl = new FormControl('', null);
  actionsApi;
  propName;
  compId;
  type;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
    this.controlName$ = this.jsComponentPConnect.getComponentID(this);
    this.type = pConn$.meta.type
  }

  init() {
    console.log("Initing custom email component!")
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();

    // if (this.formGroup$) {
    //   // add control to formGroup
    //   this.formGroup$.addControl(this.controlName$, this.fieldControl);
    //   this.fieldControl.setValue(this.value$);
    //   this.bHasForm$ = true;
    // } else {
    //   this.bReadonly$ = true;
    //   this.bHasForm$ = false;
    // }
  }

  destroy() {
    if (this.formGroup$) {
      this.formGroup$.removeControl(this.controlName$);
    }

    if (this.jsComponentPConnectData.unsubscribeFn) {
      console.log("destroy for email component - id:  ", this.jsComponentPConnectData.compID);
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.componentsManager.onComponentRemoved(this);
  }

  // Callback passed when subscribing to store change
  onStateChange() {
    this.checkAndUpdate();
  }

  checkAndUpdate() {
    // Should always check the bridge to see if the component should
    // update itself (re-render)
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

    // ONLY call updateSelf when the component should update
    if (bUpdateSelf) {
      this.updateSelf();
    }
  }

  // updateSelf
  updateSelf() {
    // moved this from ngOnInit() and call this from there instead...
    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.testId = this.configProps$.testId;
    this.label$ = this.configProps$.label;
    this.displayMode$ = this.configProps$.displayMode;

    if (this.configProps$.value != undefined) {
      this.value$ = this.configProps$.value;
    }
    this.helperText = this.configProps$.helperText || '';
    this.placeholder = this.configProps$.placeholder || '';

    if (this.configProps$.required != null) {
      this.bRequired$ = getBooleanValue(this.configProps$.required);
    }

    if (this.configProps$.visibility != null) {
      this.bVisible$ = getBooleanValue(this.configProps$.visibility);
    }

    // disabled
    if (this.configProps$.disabled != undefined) {
      this.bDisabled$ = getBooleanValue(this.configProps$.disabled);
    }

    if (this.bDisabled$) {
      // this.fieldControl.disable();
    } else {
      // this.fieldControl.enable();
    }

    if (this.configProps$.readOnly != null) {
      this.bReadonly$ = getBooleanValue(this.configProps$.readOnly);
    }

    this.actionsApi = this.pConn$.getActionsApi();
    this.propName = this.pConn$.getStateProps().value;

    this.componentReference = this.pConn$.getStateProps().value;

    // trigger display of error message with field control
    if (this.jsComponentPConnectData.validateMessage != null && this.jsComponentPConnectData.validateMessage != '') {
      // const timer = interval(100).subscribe(() => {
      //   this.fieldControl.setErrors({ message: true });
      //   this.fieldControl.markAsTouched();

      //   timer.unsubscribe();
      // });
    }

    const props = {
      value: this.value$,
      label: `Custom js - ${this.label$}`,
      visible: this.bVisible$,
      required: this.bRequired$,
      disabled: this.bDisabled$,
      readOnly: this.bReadonly$,
      helperText: this.helperText,
      placeholder: this.placeholder,
      validateMessage: this.jsComponentPConnectData.validateMessage || ''
    }
    console.log(`sending Email props via bridge, id: ${this.compId}, props: ${props}`);
    this.componentsManager.onComponentPropsUpdate(this.compId, props);
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange(value) {
    this.value$ = value
  }

  fieldOnBlur(value) {
    this.value$ = value || this.value$
    handleEvent(this.actionsApi, 'changeNblur', this.propName, this.value$);
  }

  clearErrorMessages() {
    this.pConn$.clearErrorMessages({
      property: this.propName
    });
  }

  getErrorMessage() {
    let errMessage = '';

    // look for validation messages for json, pre-defined or just an error pushed from workitem (400)
    // if (this.fieldControl.hasError('message')) {
    //   errMessage = this.jsComponentPConnectData.validateMessage ?? '';
    //   return errMessage;
    // }
    // if (this.fieldControl.hasError('required')) {
    //   errMessage = 'You must enter a value';
    // } else if (this.fieldControl.errors) {
    //   errMessage = this.fieldControl.errors.toString();
    // }

    return errMessage;
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
  