import { getComponentFromMap } from "./mappings/sdk-component-map.js";

export class ComponentsManager {
    constructor(jsComponentPConnect, onComponentAdded, onComponentRemoved, onComponentPropsUpdate) {
        this.jsComponentPConnect = jsComponentPConnect;
        this.onComponentAdded = onComponentAdded;
        this.onComponentRemoved = onComponentRemoved;
        this.onComponentPropsUpdate = onComponentPropsUpdate;
    }

    /**
     * Variable used to compute the next componentID
     */
    #counterComponentID = 0;

    /**
     * Returns a unique (for this session) ComponentID that should
     * be used for that component to update its most recent props
     * (which can also be compared against its previous value
     * before updating). Note that this returns a string so we can use
     * it as a key in an associative array
     * @returns the next componentID
     */
    getNextComponentId() {
        this.#counterComponentID += 1;
        // Note that we use the string version of the number so we have an
        //  associative array that we can clean up later, if needed.
        return this.#counterComponentID.toString();
    }

    /**
     * Creates a component.
     *
     * Warning: We cannot init() component here because it may cause infinite loop.
     * If we init() child before adding it to parent the following flow may occur:
     * 1. Parent creates child (but does not add it to its children list yet)
     * 2. Child init() is called
     * 3. Parent is updated (because of redux store update)
     * 4. Parent creates child again because its children list is empty.
     * 5. Child init() is called again - and loops occurs.
     *
     * @param type - type of component to create
     * @param args - arguments to pass to the component's constructor
     * @param init - if true, calls the component's init() method after creation
     * @returns the created component
     */
    create(type, args = []) {
        const ComponentClass = getComponentFromMap(type);
        return new ComponentClass(this, ...args);
    }

    /**
     * Creates or updates a component.
     * @param component - component to update, or null/undefined to create a new one
     * @param type - type of component to create
     * @param args - arguments to pass to the component's constructor
     * @param init - if true, calls the component's init() method after creation
     * @returns created or updated component
     */
    upsert(component, type, args = []) {
        if (component) {
            component.update(...args);
            return component;
        } else {
            return this.create(type, args);
        }
    }
}
