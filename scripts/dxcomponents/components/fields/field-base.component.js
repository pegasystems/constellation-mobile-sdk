import { handleEvent } from '../../helpers/event-util.js';
import { Utils } from '../../helpers/utils.js';
import { BaseComponent } from '../base.component.js';

export class FieldBaseComponent extends BaseComponent {

  jsComponentPConnectData = {};
  propName;

  props = {
    value: '',
    label: '',
    visible: true,
    required: false,
    disabled: false,
    readOnly: false,
    helperText: '',
    placeholder: '',
    validateMessage: '',
    displayMode: ''
  }

  constructor(componentsManager, pConn$) {
    super(componentsManager, pConn$);
    this.utils = new Utils();
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
    this.updateBaseProps();
    this.propName = this.pConn$.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }

  updateBaseProps() {
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.props.displayMode = configProps.displayMode || '';
    this.props.label = configProps.label || '';
    if (configProps.value !== undefined) {
      this.props.value = configProps.value;
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
    this.props.validateMessage = this.jsComponentPConnectData.validateMessage || ''
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange(value) {
    this.props.value = value;
  }

  fieldOnBlur(value) {
    if (value !== undefined) {
      this.props.value = value
    }
    const submittedValue = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps()).value;
    // Preventing 'changeNblur' events for unchanged field values.
    // Sending it for field which is a dropdown param causes dropdown value to be cleared
    if (submittedValue !== this.props.value) {
      handleEvent(this.pConn$.getActionsApi(), 'changeNblur', this.propName, this.props.value);
    }
    Utils.clearErrorMessagesIfNoErrors(this.pConn$, this.propName, this.jsComponentPConnectData.validateMessage);
  }
}
