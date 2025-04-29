import { getComponentFromMap } from './mappings/sdk-component-map.js';

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
  counterComponentID = 0;

  /**
   * Returns a unique (for this session) ComponentID that should
   * be used for that component to update its most recent props
   * (which can also be compared against its previous value
   * before updating). Note that this returns a string so we can use
   * it as a key in an associative array
   * @returns the next componentID
   */
  getNextComponentId() {
    this.counterComponentID += 1;
    // Note that we use the string version of the number so we have an
    //  associative array that we can clean up later, if needed.
    return this.counterComponentID.toString();
  }

  /**
   * Reconciliation logic
   * - Iterate all new children pConns.
   *    - For each of them find existing component with child pConn with the same name and type (e.g.: "TextInput", "Name")
   *    - If existing component is found then update it with new pConn, push into reconciledComponents with shouldInit: false and remove from oldChildrenComponents
   *    - If there is no component found then create new component, push into reconciledComponents with shouldInit: true
   *- Iterate children which left in oldChildrenComponents and destroy them.
   *- return newChildrenComponents
   *
   * @param component
   * @return [] reconciledComponents - array of elements: { component: component, shouldInit: true/false }
   *
    */
  reconcileChildren(component) {
    this.assertComponent(component);
    const newChildren = component.arChildren$;
    const oldChildrenComponents = component.childrenComponents
    const reconciledComponents = [];

    newChildren.forEach((newChild) => {
      const oldComponentToReuse = this.getComponentToReuse(oldChildrenComponents, newChild.getPConnect());
      if (oldComponentToReuse !== undefined) {
        this.updateComponentPconn(oldComponentToReuse, newChild.getPConnect());
        reconciledComponents.push({component: oldComponentToReuse, shouldInit: false});
        oldChildrenComponents.splice(oldChildrenComponents.indexOf(oldComponentToReuse), 1);
      } else {
        const newChildComponent = this.createNewChildComponent(component.componentsManager, newChild.getPConnect());
        reconciledComponents.push({component: newChildComponent, shouldInit: true});
      }
    })
    this.destroyOldChildrenComponents(oldChildrenComponents);
    return reconciledComponents;
  }

  assertComponent(component) {
    if (component.childrenComponents === undefined) {
      throw new Error("Cannot reconcile children on component without childrenComponents");
    }
    if (component.arChildren$ === undefined) {
      throw new Error("Cannot reconcile children on component without children pConns");
    }
  }

  getComponentToReuse(oldChildrenComponents, newChildPconn) {
    return oldChildrenComponents.find((component) => {
      return this.isEqualNameType(component.pConn$, newChildPconn);
    })
  }

  destroyOldChildrenComponents(oldChildrenComponents) {
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

  createNewChildComponent(componentsManager, childPConn) {
    const childComponentClass = getComponentFromMap(childPConn.meta.type);
    return new childComponentClass(componentsManager, childPConn);
  }

  initReconciledComponents(reconciledComponents) {
    reconciledComponents.forEach((item) => {
      if (item.shouldInit) {
        item.component.init();
      }
    });
  }

  updateComponentPconn(childComponent, newChildPConn) {
    if (childComponent === undefined) {
      throw new Error("Reconciliation failed, child component is 'undefined'");
    }
    if (childComponent.update === undefined) {
      throw new Error("Reconciliation failed, child component is missing 'update' function");
    }
    childComponent.update(newChildPConn);
  }

  isEqualNameType(oldChildPConn, newChildPConn) {
    return newChildPConn.meta.name === oldChildPConn.meta.name && newChildPConn.meta.type === oldChildPConn.meta.type
  }

  handleNativeEvent(component, event) {
    const value = event.componentData !== undefined ? event.componentData.value : undefined;
    const focused = event.eventData !== undefined ? event.eventData.focused : undefined
    switch (event.type) {
      case 'FieldChange':
        console.log(`FieldChange for ${component.compId}, value: ${value}`);
        this.updateComponentValue(component, value)
        break;
      case 'FieldChangeWithFocus':
        console.log(`FieldChangeWithFocus for ${component.compId}, value: ${value}, focused: ${focused}`);
        this.updateComponentFocus(component, value, focused)
        break;
      default:
        console.log(`unknown event type: ${event.type}`)
    }
  }

  updateComponentValue(component, value) {
    component.fieldOnChange(value);
  }

  updateComponentFocus(component, value, focused) {
    if (focused === "false" || focused === false) {
      component.fieldOnBlur(value)
    }
  }
}