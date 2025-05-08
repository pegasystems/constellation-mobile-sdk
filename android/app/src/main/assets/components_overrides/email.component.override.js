export class EmailComponent {
  // these variables are present in all components
  pConn$; // object which keeps internal information about component coming from Constellation Core JS library
  jsComponentPConnect; // bridge between JS components and Constellation Core JS Library
  jsComponentPConnectData = {}; // object which contains additional data like validateMessage
  propName; // name of the property which this component represent
  compId; // unique id of the component, it will be also used to identify component in Native code
  type; // type of the component e.g.: 'Email' in this case

  // these are props sent from JS to Native code. Might be different for different component.
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
    this.pConn$ = pConn$;
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
    this.type = pConn$.meta.type
  }

  init() {
    console.log("Initiating custom email component!")
    // registerAndSubscribeComponent registers component to Constellation Core JS redux to receive updates
    // onStateChange is a callback called when some change occurs on any component so it is called very frequently
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    // causes adding component on Native side
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    // unsubscribing from Constellation Core JS redux
    if (this.jsComponentPConnectData.unsubscribeFn) {
      this.jsComponentPConnectData.unsubscribeFn();
    }
    // causes removing component on Native side
    this.componentsManager.onComponentRemoved(this);
  }

  // runs whenever components is updated by its parent
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
    // onStateChange runs very frequently so we run shouldComponentUpdate to check if this component changed and should be updated
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

    if (bUpdateSelf) {
      this.updateSelf();
    }
  }

  updateSelf() {
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.props.displayMode = configProps.displayMode;
    this.props.label = configProps.label;

    if (configProps.value != undefined) {
      this.props.value = configProps.value;
    }
    this.props.helperText = `This is overridden email component ${configProps.helperText || ''}`;
    this.props.placeholder = configProps.placeholder || '';

    if (configProps.required != null) {
      this.props.required = getBooleanValue(configProps.required);
    }

    if (configProps.visibility != null) {
      this.props.visible = getBooleanValue(configProps.visibility);
    }

    if (configProps.disabled != undefined) {
      this.props.disabled = getBooleanValue(configProps.disabled);
    }

    if (configProps.readOnly != null) {
      this.props.readOnly = getBooleanValue(configProps.readOnly);
    }
    this.props.validateMessage = this.jsComponentPConnectData.validateMessage || ''
    this.propName = this.pConn$.getStateProps().value;
    // sends updated props to Native side
    this.componentsManager.onComponentPropsUpdate(this);
  }

  // runs whenever Native side sends event to this component
  onEvent(event) {
    this.componentsManager.handleNativeEvent(this, event)
  }

  // helper function called by component manager for event of changing field value (FieldChange event)
  fieldOnChange(value) {
    this.props.value = value;
  }

  // helper function called by component manager for event of changing field value with focus (FieldChangeWithFocus event)
  fieldOnBlur(value) {
    this.props.value = value || this.props.value
    const submittedValue = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps()).value;
    if (this.props.value !== submittedValue) {
      handleEvent(this.pConn$.getActionsApi(), 'changeNblur', this.propName, this.props.value);
    }
    clearErrorMessagesIfNoErrors(this.pConn$, this.propName, this.jsComponentPConnectData.validateMessage);
  }
}

function getBooleanValue(value) {
  switch(typeof value) {
    case 'string':
      return value.toLowerCase() === 'true';
    case 'boolean':
      return value;
    default:
      throw new Error(`Cannot parse value: ${value} to boolean`)
  }
}


function handleEvent(actions, eventType, propName, value) {
  switch (eventType) {
    case 'change':
      // updates value in Constellation Core JS Redux and clears error messages
      // see: https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/updatefieldvalue-propname-value.html
      actions.updateFieldValue(propName, value);
      break;
    case 'blur':
      // triggers additional actions in Constellation Core JS like validation
      // see https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/triggerfieldchange-propname-value.html
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
