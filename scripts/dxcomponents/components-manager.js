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
     * @param type - type of component to create
     * @param args - arguments to pass to the component's constructor
     * @param init - if true, calls the component's init() method after creation
     * @returns the created component
     */
    create(type, args = [], init = true) {
        const ComponentClass = getComponentFromMap(type);
        const component = new ComponentClass(this, ...args);
        if (init) {
            component.init();
        }
        return component;
    }

    /**
     * Creates or updates a component.
     * @param component - component to update, or null/undefined to create a new one
     * @param type - type of component to create
     * @param args - arguments to pass to the component's constructor
     * @param init - if true, calls the component's init() method after creation
     * @returns created or updated component
     */
    upsert(component, type, args = [], init = true) {
        if (component) {
            component.update(...args);
            return component;
        } else {
            return this.create(type, args, init);
        }
    }
}
