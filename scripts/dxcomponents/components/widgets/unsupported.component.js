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
  
  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager;
    this.type = pConn$.meta.type
    this.utils = new Utils();
  }

  init() {
    this.propName = this.pConn$.getStateProps().value;
    this.configProps$ = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    if (this.configProps$.visibility != null) {
      this.bVisible$ = this.utils.getBooleanValue(this.configProps$.visibility);
    }
    console.log(`Unsupported component ${this.type} for property ${this.propName} inited`);
    this.componentsManager.onComponentAdded(this);

    const props = {
      type: this.type,
      visible: this.bVisible$
    }
    console.log(`sending Unsupported props via bridge, id: ${this.compId}, props: ${JSON.stringify(props)}`);
    this.componentsManager.onComponentPropsUpdate(this.compId, props);
  }

  destroy() {
    console.log(`Unsupported component ${this.type} for property ${this.propName} destroyed`);
    this.componentsManager.onComponentRemoved(this);
  }

  onEvent(event) {

  }
}
