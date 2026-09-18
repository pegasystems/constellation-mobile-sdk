import { ContainerBaseComponent } from "../container-base.component.js";

const TAG = "EmbeddedDataComponent";

export class EmbeddedDataComponent extends ContainerBaseComponent {
    simpleComboBoxComponent;

    props = {
        visible: true,
        children: [],
    };

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "EmbeddedData";
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
        this.simpleComboBoxComponent?.destroy();
        super.destroy();
    }

    updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        const displayAs = configProps.displayAs ?? "";
        const displayMode = configProps.displayMode ?? "";

        if (displayAs !== "Combobox") {
            console.warn(`${TAG}: Unsupported displayAs value: "${displayAs}"`);
            return;
        }

        this.props.visible = this.utils.getBooleanValue(configProps.visibility ?? true);

        this.#ensureSimpleComboBox();

        this.reconcileChildren();

        const comboBoxChild = [{id: this.simpleComboBoxComponent.compId, type: this.simpleComboBoxComponent.type }];
        // Web does not render details in readonly mode
        const isEditable = !displayMode || displayMode === "EDITABLE";
        const viewChildren = !isEditable ? [] : this.getChildrenProps();
        this.props.children = [...comboBoxChild, ...viewChildren];
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #ensureSimpleComboBox() {
        if (!this.simpleComboBoxComponent) {
            this.simpleComboBoxComponent = this.componentsManager.create("SimpleComboBox", [this.pConn]);
            this.simpleComboBoxComponent.init();
        } else {
            this.simpleComboBoxComponent.update(this.pConn);
        }
    }
}
