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

  constructor(componentsManager, pConn) {
    super(componentsManager, pConn);
    this.utils = new Utils();
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.checkAndUpdate();
    }
  }

  checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.updateSelf();
    }
  }

  updateSelf() {
    this.updateBaseProps();
    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }

  updateBaseProps() {
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.props.displayMode = configProps.displayMode ?? '';
    this.props.label = configProps.label ?? '';
    this.props.value = configProps.value ?? this.props.value;
    this.props.helperText = configProps.helperText ?? '';
    this.props.placeholder = configProps.placeholder ?? '';
    this.props.required = this.utils.getBooleanValue(configProps.required ?? this.props.required);
    this.props.visible = this.utils.getBooleanValue(configProps.visibility ?? this.props.visible);
    this.props.disabled = this.utils.getBooleanValue(configProps.disabled ?? this.props.disabled);
    this.props.readOnly = this.utils.getBooleanValue(configProps.readOnly ?? this.props.readOnly);
    this.props.validateMessage = this.jsComponentPConnectData.validateMessage ?? ''
  }

  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  fieldOnChange(value) {
    this.props.value = value;
  }

  fieldOnBlur(value) {
    this.props.value = value ?? this.props.value

    const submittedValue = this.pConn.resolveConfigProps(this.pConn.getConfigProps()).value;
    // Preventing 'changeNblur' events for unchanged field values.
    // Sending it for field which is a dropdown param causes dropdown value to be cleared
    if (submittedValue !== this.props.value) {
      handleEvent(this.pConn.getActionsApi(), 'changeNblur', this.propName, this.props.value);
    }
    Utils.clearErrorMessagesIfNoErrors(this.pConn, this.propName, this.jsComponentPConnectData.validateMessage);
  }
}
