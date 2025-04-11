import { handleEvent } from '../../helpers/event-util.js';
import { Utils } from '../../helpers/utils.js';

export class CurrencyComponent {
  pConn$;
  jsComponentPConnect;
  jsComponentPConnectData = {};
  propName;
  compId;
  type;

  props = {
    value: '',
    label: '',
    visible: true,
    required: false,
    disabled: false,
    readOnly: false,
    helperText: '',
    placeholder: '',
    currencyISOCode: '',
    showISOCode: false,
    decimalPrecision: '',
    validateMessage: ''
  }

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.utils = new Utils();
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
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
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.props.label = configProps.label;

    if (configProps.value) {
      const value = configProps.value
      if (typeof value === 'string') {
        this.props.value = parseFloat(value, 10);
      } else {
        this.props.value = value;
      }
    }
    this.props.helperText = configProps.helperText || '';
    this.props.placeholder = configProps.placeholder || '';

    if (configProps.required != null) {
      this.props.required = this.utils.getBooleanValue(configProps.required);
    }

    if (configProps.visibility != null) {
      this.props.visible = this.utils.getBooleanValue(configProps.visibility);
    }

    if (configProps.disabled !== undefined) {
      this.props.disabled = this.utils.getBooleanValue(configProps.disabled);
    }

    if (configProps.readOnly != null) {
      this.props.readOnly = this.utils.getBooleanValue(configProps.readOnly);
    }
    if (configProps.currencyISOCode != null) {
      this.props.currencyISOCode = configProps.currencyISOCode;
    }
    if (configProps.alwaysShowISOCode != null) {
      this.props.showISOCode = configProps.alwaysShowISOCode;
    }
    this.props.decimalPrecision = configProps.allowDecimals ? 2 : 0;

    this.props.validateMessage = this.jsComponentPConnectData.validateMessage || ''
    this.propName = this.pConn$.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange(value) {
    this.props.value = value;
  }

  fieldOnBlur(value) {
    this.props.value = value || this.props.value
    const submittedValue = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps()).value;
    if (submittedValue !== this.props.value) {
      handleEvent(this.pConn$.getActionsApi(), 'changeNblur', this.propName, this.props.value);
    }
    Utils.clearErrorMessagesIfNoErrors(this.pConn$, this.propName, this.jsComponentPConnectData.validateMessage);
  }
}
