import { ContainerBaseComponent } from "../container-base.component.js";
import { deepEquals } from "../../../helpers/utils.js";

export class DetailsTemplateBase extends ContainerBaseComponent {
    childrenMetadataOld;

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
    }

    hasRawMetadataChanged() {
        const newChildrenMetadata = this.#fetchChildrenMetadata();

        if (!deepEquals(newChildrenMetadata, this.childrenMetadataOld)) {
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
