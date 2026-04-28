import { BaseComponent } from "../base.component.js";

export class SemanticLinkComponent extends BaseComponent {
    jsComponentPConnectData = {};

    props = {
        value: "",
        label: "",
        visible: true,
    };

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

    // Required by ContainerBaseComponent.onEvent() which propagates events to all children
    onEvent(event) {}

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
        this.props.label = configProps.label ?? "";
        this.props.value = configProps.text ?? configProps.value ?? "";
        this.props.visible = this.utils.getBooleanValue(configProps.visibility ?? this.props.visible);
        this.componentsManager.onComponentPropsUpdate(this);
    }
}