export class AlertBannerComponent {
    variant;
    messages = [];
    componentsManager;
    compId;
    type;
    props;

    constructor(componentsManager, variant, messages) {
        this.compId = componentsManager.getNextComponentId();
        this.type = "AlertBanner";
        this.componentsManager = componentsManager;
        this.variant = variant;
        this.messages = messages;
    }

    init() {
        this.componentsManager.onComponentAdded(this);
        this.sendProps();
    }

    destroy() {
        this.componentsManager.onComponentRemoved(this);
    }

    update(variant, messages) {
        this.variant = variant;
        this.messages = messages;
        this.sendProps();
    }

    onEvent(event) {}

    sendProps() {
        this.props = {
            variant: this.variant,
            messages: this.messages,
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
