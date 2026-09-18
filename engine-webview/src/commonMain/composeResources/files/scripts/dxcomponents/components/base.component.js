import { Utils } from "../helpers/utils.js";

export class BaseComponent {
    pConn;
    componentsManager;
    jsComponentPConnect;
    compId;
    type;
    alive = false

    constructor(componentsManager, pConn) {
        this.pConn = pConn;
        this.componentsManager = componentsManager;
        this.jsComponentPConnect = componentsManager.jsComponentPConnect;
        this.compId = componentsManager.getNextComponentId();
        this.type = pConn.meta.type;
        this.utils = new Utils();
        this.alive = true;
    }

    destroy() {
        this.componentsManager.onComponentRemoved(this);
        this.alive = false;
    }

    update(pConn) {
        if (this.updatePConnAndResubscribeIfContextChanged(pConn, this.checkAndUpdate)) {
            this.checkAndUpdate();
        }
    }

    checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.updateSelf();
        }
    }

    updateSelf() {}

    getPConnectContextReferenceKey(pConn) {
        return `${pConn.getContextName()}|${pConn.getPageReference()}`;
    }

    updatePConnAndResubscribeIfContextChanged(pConn, callback) {
        if (this.pConn === pConn) {
            return false;
        }

        if (this.getPConnectContextReferenceKey(this.pConn) !== this.getPConnectContextReferenceKey(pConn)) {
            this.replacePConnAndResubscribe(pConn, callback);
        } else {
            this.pConn = pConn;
        }
        return true;
    }

    replacePConnAndResubscribe(pConn, callback) {
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.pConn = pConn;
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, callback);
    }
}
