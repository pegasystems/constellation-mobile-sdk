import { handleEvent } from "../../helpers/event-util.js";
import { Utils } from "../../helpers/utils.js";

// interface TextAreaProps extends PConnFieldProps {
//   // If any, enter additional props that only exist on TextArea here
//   fieldMetadata?: any;
// }


export class TextAreaComponent {
  pConn$;

  jsComponentPConnectData = {};
  configProps$;

  label$ = '';
  value$ = '';
  bRequired$ = false;
  bReadonly$ = false;
  bDisabled$ = false;
  bVisible$ = true;
  nMaxLength$;
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
  props;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.utils = new Utils();
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
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
      console.log("destroy for text area component - id:  ", this.jsComponentPConnectData.compID);
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

    if (this.configProps$.value != undefined) {
      this.value$ = this.configProps$.value;
    }
    this.nMaxLength$ = this.pConn$.getFieldMetadata(this.pConn$.getRawConfigProps()?.value)?.maxLength || 100;
    this.testId = this.configProps$.testId;
    this.displayMode$ = this.configProps$.displayMode;
    this.label$ = this.configProps$.label || '';
    this.helperText = this.configProps$.helperText || '';
    this.placeholder = this.configProps$.placeholder || '';

    this.actionsApi = this.pConn$.getActionsApi();
    this.propName = this.pConn$.getStateProps().value;

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

    this.componentReference = this.pConn$.getStateProps().value;

    this.props = {
      value: this.value$,
      label: this.label$,
      visible: this.bVisible$,
      required: this.bRequired$,
      disabled: this.bDisabled$,
      readOnly: this.bReadonly$,
      helperText: this.helperText,
      placeholder: this.placeholder,
      validateMessage: this.jsComponentPConnectData.validateMessage || '',
      maxLength: this.nMaxLength$
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
}
