import { handleEvent } from '../../helpers/event-util.js';
import { Utils } from '../../helpers/utils.js';

// interface EmailProps extends PConnFieldProps {
//   // If any, enter additional props that only exist on Email here
// }

export class EmailComponent {
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

  // fieldControl = new FormControl('', null);
  actionsApi;
  propName;
  compId;
  type;
  props;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.utils = new Utils();
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
    this.controlName$ = this.jsComponentPConnect.getComponentID(this);
    this.type = pConn$.meta.type
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      console.log("destroy for email component - id:  ", this.jsComponentPConnectData.compID);
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
    this.placeholder = this.configProps$.placeholder || '';

    if (this.configProps$.required != null) {
      this.bRequired$ = this.utils.getBooleanValue(this.configProps$.required);
    }


    if (this.configProps$.visibility != null) {
      this.bVisible$ = this.utils.getBooleanValue(this.configProps$.visibility);
    }

    if (this.configProps$.disabled != undefined) {
      this.bDisabled$ = this.utils.getBooleanValue(this.configProps$.disabled);
    }

    if (this.bDisabled$) {
      // this.fieldControl.disable();
    } else {
      // this.fieldControl.enable();
    }

    if (this.configProps$.readOnly != null) {
      this.bReadonly$ = this.utils.getBooleanValue(this.configProps$.readOnly);
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

    this.props = {
      value: this.value$,
      label: this.label$,
      visible: this.bVisible$,
      required: this.bRequired$,
      disabled: this.bDisabled$,
      readOnly: this.bReadonly$,
      helperText: this.helperText,
      placeholder: this.placeholder,
      validateMessage: this.jsComponentPConnectData.validateMessage || ''
    }
    this.componentsManager.onComponentPropsUpdate(this);
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange(value) {
    this.value$ = value;
  }

  fieldOnBlur(value) {
    this.value$ = value || this.value$
    const submittedValue = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps()).value;
    if (submittedValue !== this.value$) {
      handleEvent(this.actionsApi, 'changeNblur', this.propName, this.value$);
    }
    Utils.clearErrorMessagesIfNoErrors(this.pConn$, this.propName, this.jsComponentPConnectData.validateMessage);
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
