import { ContainerBaseComponent } from "./container-base.component.js";
import { Utils } from "../../helpers/utils.js";
import { ReferenceComponent } from "./reference.component.js";

const TAG = "[GroupComponent]";

export class GroupComponent extends ContainerBaseComponent {
    jsComponentPConnectData = {};
    props = {
        visible: true,
        children: [],
        showHeading: true,
        heading: "",
        instructions: "",
        collapsible: false,
    };

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "Group";
        this.utils = new Utils();
    }

    init() {
        this.jsComponentPConnectData =
            this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
        this.componentsManager.onComponentAdded(this);
        this.#checkAndUpdate();
    }

    destroy() {
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.destroyChildren();
        this.props.children = [];
        this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.#checkAndUpdate();
        }
    }

    onEvent(event) {
        this.childrenComponents.forEach((component) => {
            component.onEvent(event);
        });
    }

    #checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        this.props.visible = configProps.visibility ?? this.pConn.getComputedVisibility() ?? true;
        this.props.showHeading = configProps.showHeading ?? true;
        this.props.heading = configProps.heading ?? "";
        this.props.instructions = configProps.instructions !== 'none' ? configProps.instructions : "";
        this.props.collapsible = configProps.collapsible ?? false;

        this.childrenPConns = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());
        if (configProps.displayMode === "DISPLAY_ONLY") {
            this.childrenPConns.forEach((child) => {
                const pConn = child.getPConnect();
                pConn.setInheritedProp("displayMode", "DISPLAY_ONLY");
                pConn.setInheritedProp("readOnly", true);
            });
        }
        this.reconcileChildren();
        this.props.children = this.getChildrenComponentsIds();
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
