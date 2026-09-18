import { ContainerBaseComponent } from "./container-base.component.js";
import { ReferenceComponent } from "./reference.component.js";

const TAG = "[GroupComponent]";

export class GroupComponent extends ContainerBaseComponent {
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
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.checkAndUpdate();
    }

    updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        this.props.visible = configProps.visibility ?? this.pConn.getComputedVisibility() ?? true;
        this.props.showHeading = configProps.showHeading ?? true;
        this.props.heading = configProps.heading ?? "";
        this.props.instructions = configProps.instructions !== "none" ? configProps.instructions : "";
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
        this.props.children = this.getChildrenProps();
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
