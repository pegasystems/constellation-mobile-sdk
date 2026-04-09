import { ContainerBaseComponent } from "../container-base.component.js";

export class DetailsTemplateBase extends ContainerBaseComponent {
    childrenMetadataOld;
    jsComponentPConnectData = {};

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.checkAndUpdate();
    }

    destroy() {
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.componentsManager.onComponentRemoved(this);
    }

    hasRawMetadataChanged() {
        const newChildrenMetadata = this.#fetchChildrenMetadata();

        if (!PCore.isDeepEqual(newChildrenMetadata, this.childrenMetadataOld)) {
            this.childrenMetadataOld = newChildrenMetadata;
            return true;
        }

        return false;
    }

    #fetchChildrenMetadata() {
        const children = this.pConn.getChildren() || [];

        return children.map((child) => {
            const pConnect = child.getPConnect();
            return pConnect.resolveConfigProps(pConnect.getRawMetadata());
        });
    }
}
