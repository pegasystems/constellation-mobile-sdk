import { BaseComponent } from "../base.component.js";
import { ReferenceComponent } from "./reference.component.js";

export class ContainerBaseComponent extends BaseComponent {
    childrenComponents = [];
    props = {
        children: []
    };
    jsComponentPConnectData = {};

    destroy() {
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.destroyChildren();
        this.componentsManager.onComponentPropsUpdate(this);
        // must be after onComponentPropsUpdate ('alive' is set to false in BaseComponent)
        super.destroy();
    }

    destroyChildren() {
        this.childrenComponents.forEach((component) => component.destroy?.());
        this.childrenComponents = [];
        this.props.children = [];
    }

    getChildrenProps() {
        const validChildren = this.childrenComponents.filter((component) => {
            const isValid = component.compId != null && component.type != null;
            if (!isValid) {
                console.warn(
                    `[ContainerBaseComponent] Skipping child with missing compId or type (compId: ${component.compId}, type: ${component.type}).`,
                    component
                );
            }
            return isValid;
        });

        return validChildren.map((component) => ({
            id: component.compId,
            type: component.type,
        }));
    }

    onEvent(event) {
        this.childrenComponents.forEach((component) => component.onEvent(event));
    }

    /**
     * Reconciliation logic
     * - Iterate all new children pConns.
     *    - For each of them find existing component with child pConn with the same name and type (e.g.: "TextInput", "Name")
     *    - If existing component is found then update it with new pConn, push into reconciledComponents and remove from oldChildrenComponents
     *    - If there is no component found then create new component, push into reconciledComponents and uninitializedComponents
     * - Iterate children which left in oldChildrenComponents and destroy them.
     * - Update `childrenComponents` with reconciledComponents
     * - Initialize newly created components
     *
     */
    reconcileChildren(newChildren = this.pConn.getChildren()) {
        // Resolve references before checking visibility: the parent's computed visibility can
        // use the wrong page context and must not discard the referenced subtree prematurely.
        newChildren = ReferenceComponent.normalizePConnArray(newChildren);
        // Honor resolved boolean visibility before computing it in the nested context.
        // Exclude false branches so inactive references do not contribute duplicate fields.
        newChildren = newChildren.filter((child) => {
            const childPConn = child?.getPConnect?.() ?? child;
            const config = childPConn?.getConfigProps?.() ?? childPConn?.meta?.config ?? {};
            const visibility = typeof config.visibility === "boolean"
                ? config.visibility
                : childPConn?.getComputedVisibility?.() ?? true;
            return visibility !== false;
        });

        const oldChildrenComponents = this.childrenComponents;
        const reconciledComponents = [];
        const uninitializedComponents = [];

        newChildren.forEach((newChild) => {
            const oldComponentToReuse = this.#getComponentToReuse(oldChildrenComponents, newChild.getPConnect());
            if (oldComponentToReuse !== undefined) {
                this.updateComponentPConn(oldComponentToReuse, newChild.getPConnect());
                reconciledComponents.push(oldComponentToReuse);
                oldChildrenComponents.splice(oldChildrenComponents.indexOf(oldComponentToReuse), 1);
            } else {
                const newPConn = newChild.getPConnect();
                const newChildComponent = this.componentsManager.create(newPConn.meta.type, [newPConn]);
                reconciledComponents.push(newChildComponent);
                uninitializedComponents.push(newChildComponent);
            }
        });
        this.childrenComponents = reconciledComponents;
        this.#destroyOldChildrenComponents(oldChildrenComponents);
        uninitializedComponents.forEach((c) => c.init());
        this.props.children = [];
    }

    #getComponentToReuse(oldChildrenComponents, newChildPConn) {
        return oldChildrenComponents.find((component) => {
            return this.isEqualNameType(component.pConn, newChildPConn);
        });
    }

    #destroyOldChildrenComponents(oldChildrenComponents) {
        oldChildrenComponents.forEach((component) => {
            if (component === undefined) {
                throw new Error("Reconciliation failed, child component is 'undefined'");
            }
            if (component.destroy === undefined) {
                throw new Error("Reconciliation failed, child component is missing 'destroy' function");
            }
            component.destroy();
        });
    }

    updateComponentPConn(childComponent, newChildPConn) {
        if (childComponent === undefined) {
            throw new Error("Reconciliation failed, child component is 'undefined'");
        }
        if (childComponent.update === undefined) {
            throw new Error("Reconciliation failed, child component is missing 'update' function");
        }
        childComponent.update(newChildPConn);
    }

    isEqualNameType(oldChildPConn, newChildPConn) {
        return (
            newChildPConn.meta.name === oldChildPConn.meta.name && newChildPConn.meta.type === oldChildPConn.meta.type
        );
    }

    reuseOrCreateChild(oldComponent, newPConn) {
        if (oldComponent) {
            oldComponent.update(newPConn);
            return oldComponent;
        }

        const newComponent = this.componentsManager.create(newPConn.meta.type, [newPConn]);
        newComponent.init();
        return newComponent;
    }
}
