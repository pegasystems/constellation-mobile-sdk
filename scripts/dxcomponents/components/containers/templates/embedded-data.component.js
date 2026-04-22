import { ContainerBaseComponent } from "../container-base.component.js";

const TAG = "EmbeddedDataComponent";

export class EmbeddedDataComponent extends ContainerBaseComponent {
    jsComponentPConnectData = {};
    #simpleComboBox;

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
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.#simpleComboBox?.destroy();
        this.destroyChildren();
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.checkAndUpdate();
        }
    }

    checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
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

        const comboBoxIds = [this.#simpleComboBox.compId];
        // Web does not render details in readonly mode
        const isEditable = !displayMode || displayMode === "EDITABLE";
        const viewChildrenIds = !isEditable ? [] : this.getChildrenComponentsIds();
        this.props.children = [...comboBoxIds, ...viewChildrenIds];
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #ensureSimpleComboBox() {
        if (!this.#simpleComboBox) {
            this.#simpleComboBox = this.componentsManager.create("SimpleComboBox", [this.pConn]);
            this.#simpleComboBox.init();
        } else {
            this.#simpleComboBox.update(this.pConn);
        }
    }
}
