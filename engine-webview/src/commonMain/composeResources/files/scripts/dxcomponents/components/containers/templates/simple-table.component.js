import { Utils } from "../../../helpers/utils.js";
import { ContainerBaseComponent } from "../container-base.component.js";

const TAG = "[SimpleTableComponent]";

export class SimpleTableComponent extends ContainerBaseComponent {
    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTable";
        this.utils = new Utils();
    }

    get childComponent() {
        return this.childrenComponents[0];
    }

    set childComponent(component) {
        this.childrenComponents = component ? [component] : [];
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
        this.props.label = configProps.label;

        if (configProps.value !== undefined) {
            this.props.value = configProps.value;
        }

        if (configProps.visibility != null) {
            this.props.visible = this.utils.getBooleanValue(configProps.visibility);
        }

        const { multiRecordDisplayAs, fieldMetadata } = configProps;

        let { contextClass } = configProps;
        if (!contextClass) {
            let listName = this.pConn.getComponentConfig().referenceList;
            listName = PCore.getAnnotationUtils().getPropertyName(listName);
            contextClass = this.pConn.getFieldMetadata(listName)?.pageClass;
        }
        if (multiRecordDisplayAs === "fieldGroup") {
            const fieldGroupProps = { ...configProps, contextClass };
            if (this.childComponent) {
                this.childComponent.update(this.pConn, fieldGroupProps);
            } else {
                this.childComponent = this.componentsManager.create("FieldGroupTemplate", [this.pConn, fieldGroupProps]);
                this.childComponent.init();
            }
            this.#sendPropsUpdate();
        } else if (fieldMetadata && fieldMetadata.type === 'Page List' && fieldMetadata.dataRetrievalType === 'refer') {
            console.warn(TAG, 'Displaying ListView in SimpleTable is not supported yet.');
        } else {
            if (this.childComponent) {
                this.childComponent.update(this.pConn);
            } else {
                this.childComponent = this.componentsManager.create("SimpleTableManual", [this.pConn]);
                this.childComponent.init();
            }
            this.#sendPropsUpdate();
        }
    }

    onEvent(event) {
        // TODO: remove optional call when all other modes are implemented so that child component is always defined
        this.childComponent?.onEvent(event);
    }

    #sendPropsUpdate() {
        this.props = {
            children: this.getChildrenProps(),
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
