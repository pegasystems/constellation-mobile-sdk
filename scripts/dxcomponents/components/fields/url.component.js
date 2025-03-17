import { handleEvent } from "../../helpers/event-util.js";
import { Utils } from "../../helpers/utils.js";

export class UrlComponent {
  pConn$;

  jsComponentPConnectData = {};
  configProps$;

  label$ = '';
  value$ = '';
  bRequired$ = false;
  bReadonly$ = false;
  bDisabled$ = false;
  bVisible$ = true;
  displayMode$ = '';
  testId;
  helperText;
  placeholder;

  actionsApi;
  propName;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.type = pConn$.meta.type
    this.utils = new Utils();
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      console.log("destroy for url component - id:  ", this.jsComponentPConnectData.compID);
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.componentsManager.onComponentRemoved(this);
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

    if (this.configProps$.readOnly != null) {
      this.bReadonly$ = this.utils.getBooleanValue(this.configProps$.readOnly);
    }

    const props = {
      value: this.value$,
      label: this.label$,
      visible: this.bVisible$,
      required: this.bRequired$,
      disabled: this.bDisabled$,
      readOnly: this.bReadonly$,
      helperText: this.helperText,
      placeholder: this.placeholder,
      validateMessage: this.jsComponentPConnectData.validateMessage || '',
    }
    console.log(`sending Url props via bridge, id: ${this.compId}, props: ${JSON.stringify(props)}`);
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
}
