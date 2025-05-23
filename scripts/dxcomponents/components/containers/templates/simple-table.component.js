import { Utils } from '../../../helpers/utils.js';
import {getComponentFromMap} from '../../../mappings/sdk-component-map.js';

export class SimpleTableComponent {
  pConn$;
  jsComponentPConnect;
  jsComponentPConnectData = {};
  compId;
  type;
  childComponent;

  props = {
    child: undefined
  }

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.utils = new Utils();
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
    this.type = "SimpleTable"
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

    if (configProps.value !== undefined) {
      this.props.value = configProps.value;
    }

    if (configProps.visibility != null) {
      this.props.visible = this.utils.getBooleanValue(configProps.visibility);
    }

    const { multiRecordDisplayAs } = configProps;
    let { contextClass } = configProps;
    if (!contextClass) {
      let listName = this.pConn$.getComponentConfig().referenceList;
      listName = PCore.getAnnotationUtils().getPropertyName(listName);
      contextClass = this.pConn$.getFieldMetadata(listName)?.pageClass;
    }
    if (multiRecordDisplayAs === 'fieldGroup') {
      const fieldGroupProps = { ...configProps, contextClass };
      if (this.childComponent === undefined) {
        const fieldGroupTemplateClass = getComponentFromMap("FieldGroupTemplate");
        const fieldGroupTemplateInstance = new fieldGroupTemplateClass(this.componentsManager, this.pConn$, fieldGroupProps);
        fieldGroupTemplateInstance.init();
        this.childComponent = fieldGroupTemplateInstance;
      } else {
        this.childComponent.update(this.pConn$, fieldGroupProps)
      }
    } else {
      console.log("ListView and SimpleTableManual are not supported yet.");
    }
    this.sendPropsUpdate();
  }


  onEvent(event) {
    this.childComponent.onEvent(event)
  }

  sendPropsUpdate() {
    this.props = {
      child: this.childComponent.compId
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
