import {getComponentFromMap} from '../mappings/sdk-component-map.js';

export class BaseComponent {
  pConn;
  componentsManager;
  jsComponentPConnect;
  compId;
  type;

  constructor(componentsManager, pConn) {
    this.pConn = pConn;
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.compId = componentsManager.getNextComponentId();
    this.type = pConn.meta.type;
  }

  createComponent(type, createArgs = [], init = true) {
    const ComponentClass = getComponentFromMap(type);
    const component = new ComponentClass(this.componentsManager, ...createArgs);
    if (init) {
      component.init()
    }
    return component;
  }
}
