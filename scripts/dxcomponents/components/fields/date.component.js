import { handleEvent } from '../../helpers/event-util.js';
import { Utils } from '../../helpers/utils.js';

export class DateComponent {
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
  controlName$;
  testId = '';
  bHasForm$ = true;
  componentReference = '';
  helperText;
  placeholder;

  // fieldControl = new FormControl('', null);
  actionsApi;
  propName;
  compId;
  type;

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

    this.testId = this.configProps$.testId;

    this.label$ = this.configProps$.label;
    this.displayMode$ = this.configProps$.displayMode;

    this.componentReference = this.pConn$.getStateProps().value;

    this.actionsApi = this.pConn$.getActionsApi();
    this.propName = this.pConn$.getStateProps().value;

    if (this.configProps$.visibility != null) {
      this.bVisible$ = this.utils.getBooleanValue(this.configProps$.visibility);
    }
    this.helperText = this.configProps$.helperText || '';
    this.placeholder = this.configProps$.placeholder || '';

    if (this.configProps$.required != null) {
      this.bRequired$ = this.utils.getBooleanValue(this.configProps$.required);
    }

    if (this.configProps$.disabled != undefined) {
      this.bDisabled$ = this.utils.getBooleanValue(this.configProps$.disabled);
    }

    // if (this.displayMode$ === 'DISPLAY_ONLY' || this.displayMode$ === 'STACKED_LARGE_VAL') {
    //   this.formattedValue$ = format(this.value$, 'date', {
    //     format: this.theDateFormat.dateFormatString,
    //   });
    // }

    if (this.bDisabled$) {
      // this.fieldControl.disable();
    } else {
      // this.fieldControl.enable();
    }

    if (this.configProps$.readOnly != null) {
      this.bReadonly$ = this.utils.getBooleanValue(this.configProps$.readOnly);
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
