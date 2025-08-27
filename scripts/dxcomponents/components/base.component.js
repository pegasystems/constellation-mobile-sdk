export class BaseComponent {
  pConn;
  componentsManager;
  jsComponentPConnect;
  compId;
  type;
  // sometimes store notifies component despite it unsubscribed itself
  subscribedToStore = false;

  constructor(componentsManager, pConn) {
    this.pConn = pConn;
    this.componentsManager = componentsManager;
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.compId = componentsManager.getNextComponentId();
    this.type = pConn.meta.type;
  }
}
