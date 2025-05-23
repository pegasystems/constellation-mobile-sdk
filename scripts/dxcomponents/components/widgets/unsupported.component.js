import { Utils } from '../../helpers/utils.js';

export class UnsupportedComponent {

  pConn$;
  compId;
  componentsManager;
  bVisible$ = true;
  compId;
  type;
  utils;
  props = {
    visible: true,
    type: ''
  }

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager;
    this.type = "Unsupported";
    this.utils = new Utils();
  }

  init() {
    this.updateSelf()
  }

  destroy() {
    console.log(`Unsupported component ${this.type} for property ${this.propName} destroyed`);
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
      this.updateSelf();
    }
  }

  updateSelf() {
    this.propName = this.pConn$.getStateProps().value;
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.props.type = this.pConn$.meta.type;
    if (configProps.visibility != null) {
      this.props.visible = this.utils.getBooleanValue(configProps.visibility);
    }
    console.log(`Unsupported component ${this.type} for property ${this.propName} inited`);
    this.componentsManager.onComponentAdded(this);
    this.componentsManager.onComponentPropsUpdate(this);
  }

  destroy() {
    console.log(`Unsupported component ${this.type} for property ${this.propName} destroyed`);
    this.componentsManager.onComponentRemoved(this);
  }

  onEvent(event) {

  }
}
