import { getComponentFromMap } from './bridge/helpers/sdk_component_map.js'
import { ErrorBoundaryComponent } from './components/containers/error-boundary.component.js';

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

    /*
    Reconciliation logic
    - Iterate all new children pConns. 
        - For each of them find exisitng child pConn with the same name and type (e.g.: "TextInput", "Name")
        - If exisiting pConn is found then update respective component (with the same index) with new pConn, push into newChildrenComponents array and remove from oldChildrenComponents
        - If there is no pConn with the same name and type then create new component, push into newChildrenComponents and initiate it
    - Iterate children which left in oldChildrenComponents and destroy them.
    - return newChildrenComponents
  */
  reconcileChildren(component, oldChidlrenPConns) {
    const newChildren = component.arChildren$;
    const oldChildrenComponents = component.childrenComponents;

    const reconciledComponents = [];
    newChildren.forEach((newChild, index) => {
      const newChildPConn = newChild.getPConnect();
      const oldChildToReuse = oldChidlrenPConns.find((oldChild) => {
        return this.isEqualNameType(oldChild.getPConnect(), newChildPConn);
      });
      if (oldChildToReuse !== undefined) {
        this.updateComponentPconn(oldChildrenComponents[index], newChildPConn);
        reconciledComponents.push({component: oldChildrenComponents[index], shouldInit: false});
        oldChildrenComponents.splice(index, 1);
      } else {
        const newChildComponent = this.createNewChildComponent(component.componentsManager, newChildPConn);
        if (!(newChildComponent instanceof ErrorBoundaryComponent)) {
          reconciledComponents.push({component: newChildComponent, shouldInit: true});
        } 
      }
    })
    oldChildrenComponents.forEach((oldChildComponent) => {
      this.destroyOldChildComponent(oldChildComponent);
    });
    return reconciledComponents;
  }
  
  destroyOldChildComponent(childComponent) {
    if (childComponent !== undefined && childComponent.destroy !== undefined) {
      childComponent.destroy();
    }
  }

  createNewChildComponent(componentsManager, childPConn) {
    const childComponentClass = getComponentFromMap(childPConn.meta.type);
    const childComponent = new childComponentClass(componentsManager, childPConn);
    return childComponent;
  }

  initReconciledComponents(reconciledComponents) {
    reconciledComponents.forEach(item => {
      if (item.shouldInit) {
        item.component.init();
      }
    });
  }

  updateComponentPconn(childComponent, newChildPConn) {
    if (childComponent !== undefined && childComponent.updatePConn !== undefined) {
      childComponent.update(newChildPConn);
    }
  }

  isEqualNameType(oldChildPConn, newChildPConn) {
    return newChildPConn.meta.name == oldChildPConn.meta.name && newChildPConn.meta.type === oldChildPConn.meta.type
  }

  handleNativeEvent(component, event) {
    const value = event.componentData !== undefined ? event.componentData.value : undefined;
    const focused = event.eventData !== undefined ? event.eventData.focused : undefined
    switch(event.type) {
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
    } else {
      component.clearErrorMessages();
    }
  }
}