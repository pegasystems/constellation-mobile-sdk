export class BaseComponent {
  pConn;
  componentsManager;
  jsComponentPConnect;
  compId;
  type;
  initialized = false; // used to block any calls from redux before component is initialized

  constructor(componentsManager, pConn) {
    this.pConn = pConn;
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.compId = componentsManager.getNextComponentId();
    this.type = pConn.meta.type;
  }
}
