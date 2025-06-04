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
}
