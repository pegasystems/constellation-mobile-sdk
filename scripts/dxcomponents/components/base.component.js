import { Utils } from "../helpers/utils.js";

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
        this.utils = new Utils();
    }
}
