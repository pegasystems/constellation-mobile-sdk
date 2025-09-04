import {BaseComponent} from '../base.component.js';
import {ReferenceComponent} from './reference.component.js';
import {getComponentFromMap} from '../../mappings/sdk-component-map.js';

export class ContainerBaseComponent extends BaseComponent {
  childrenComponents = [];

  destroyChildren() {
    this.childrenComponents.forEach(component => component.destroy?.());
    this.childrenComponents = [];
  }

  getChildrenComponentsIds() {
    return this.childrenComponents.map(component => component.compId);
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
  reconcileChildren(newChildren = ReferenceComponent.normalizePConnArray(this.pConn.getChildren())) {
    // children may have a 'reference' so normalize the children array
    const oldChildrenComponents = this.childrenComponents
    const reconciledComponents = [];
    const uninitializedComponents = [];

    newChildren.forEach(newChild => {
      const oldComponentToReuse = this.getComponentToReuse(oldChildrenComponents, newChild.getPConnect());
      if (oldComponentToReuse !== undefined) {
        this.updateComponentPConn(oldComponentToReuse, newChild.getPConnect());
        reconciledComponents.push(oldComponentToReuse);
        oldChildrenComponents.splice(oldChildrenComponents.indexOf(oldComponentToReuse), 1);
      } else {
        const newChildComponent = this.createNewChildComponent(this.componentsManager, newChild.getPConnect());
        reconciledComponents.push(newChildComponent);
        uninitializedComponents.push(newChildComponent)
      }
    })
    this.childrenComponents = reconciledComponents;
    this.#destroyOldChildrenComponents(oldChildrenComponents);
    uninitializedComponents.forEach(c => c.init())
  }

  getComponentToReuse(oldChildrenComponents, newChildPConn) {
    return oldChildrenComponents.find((component) => {
      return this.isEqualNameType(component.pConn, newChildPConn);
    })
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

  createNewChildComponent(componentsManager, childPConn) {
    const childComponentClass = getComponentFromMap(childPConn.meta.type);
    return new childComponentClass(componentsManager, childPConn);
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
    return newChildPConn.meta.name === oldChildPConn.meta.name && newChildPConn.meta.type === oldChildPConn.meta.type
  }
}
