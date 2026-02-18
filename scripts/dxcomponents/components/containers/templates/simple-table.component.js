import { Utils } from "../../../helpers/utils.js";
import { BaseComponent } from "../../base.component.js";

const TAG = "[SimpleTableComponent]";

export class SimpleTableComponent extends BaseComponent {
    jsComponentPConnectData = {};
    childComponent;
    props = {
        child: undefined,
    };

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTable";
        this.utils = new Utils();
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
        this.childComponent?.destroy?.();
        this.childComponent = null
        this.#sendPropsUpdate();
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
            this.childComponent = this.componentsManager.upsert(this.childComponent, "FieldGroupTemplate", [
                this.pConn,
                fieldGroupProps,
            ]);
            this.childComponent.init();
            this.#sendPropsUpdate();
        } else if (fieldMetadata && fieldMetadata.type === 'Page List' && fieldMetadata.dataRetrievalType === 'refer') {
            console.warn(TAG, 'Displaying ListView in SimpleTable is not supported yet.');
        } else {
            this.childComponent = this.componentsManager.upsert(this.childComponent, "SimpleTableManual", [this.pConn]);
            this.childComponent.init();
            this.#sendPropsUpdate();
        }
    }

    onEvent(event) {
        // TODO: remove optional call when all other modes are implemented so that child component is always defined
        this.childComponent?.onEvent(event);
    }

    #sendPropsUpdate() {
        this.props = {
            child: this.childComponent?.compId ?? "-1",
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
