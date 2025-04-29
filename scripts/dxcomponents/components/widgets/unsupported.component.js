import { Utils } from '../../helpers/utils.js';

export class UnsupportedComponent {

  pConn$;
  configProps$;
  compId;
  componentsManager;
  bVisible$ = true;
  compId;
  type;
  utils;
  props;

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
    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    if (this.configProps$.visibility != null) {
      this.bVisible$ = this.utils.getBooleanValue(this.configProps$.visibility);
    }
    console.log(`Unsupported component ${this.type} for property ${this.propName} inited`);
    this.componentsManager.onComponentAdded(this);

    this.props = {
      type: this.pConn$.meta.type,
      visible: this.bVisible$
    }
    this.componentsManager.onComponentPropsUpdate(this);
  }

  destroy() {
    console.log(`Unsupported component ${this.type} for property ${this.propName} destroyed`);
    this.componentsManager.onComponentRemoved(this);
  }

  onEvent(event) {

  }
}
