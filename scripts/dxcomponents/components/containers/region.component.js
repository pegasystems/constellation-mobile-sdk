import { ContainerBaseComponent } from "./container-base.component.js";

export class RegionComponent extends ContainerBaseComponent {
    jsComponentPConnectData = {};
    props = {
        children: [],
    };
    childRefViewName;

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.#checkAndUpdate
        );
        this.componentsManager.onComponentAdded(this);
        this.#updateSelf();
    }

    destroy() {
        this.jsComponentPConnectData.unsubscribeFn?.();
        super.destroy();
        this.destroyChildren();
        this.props.children = [];
        this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.jsComponentPConnectData.unsubscribeFn?.();
            this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
                this,
                this.#checkAndUpdate
            );
            this.#updateSelf();
        }
    }

    onEvent(event) {
        // need copy because this.childrenComponents is updated while iterating
        const childrenComponents = [...this.childrenComponents];
        childrenComponents.forEach((component) => component.onEvent(event));
    }

    #checkAndUpdate() {
        if (this.#refViewChildChanged()) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        this.reconcileChildren();
        this.props.children = this.getChildrenComponentsIds();
        this.componentsManager.onComponentPropsUpdate(this);
    }

    /**
     * Sometimes there is a Region with one child which is a reference to a View and the name of the View is kept in
     * property `.pyViewName`. In that case we need to check if the value under `.pyViewName` has changed.
     *
     * @returns {boolean}
     */
    #refViewChildChanged() {
        const children = this.pConn.getChildren();
        if (children.length !== 1) return false;

        const newChildRefView = children[0].getPConnect().getReferencedView();
        if (!newChildRefView || newChildRefView.type !== "View") return false;

        const newChildRefViewName = newChildRefView.name;
        const oldChildRefViewName = this.childRefViewName;
        this.childRefViewName = newChildRefViewName;
        return oldChildRefViewName && newChildRefViewName !== oldChildRefViewName;
    }
}
