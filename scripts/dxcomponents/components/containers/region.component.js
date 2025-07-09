import { ReferenceComponent } from './reference.component.js';
import { ContainerBaseComponent } from './container-base.component.js';

export class RegionComponent extends ContainerBaseComponent {
  props = {
    children: []
  }

  init() {
    this.componentsManager.onComponentAdded(this);
    this.#updateSelf();
  }

  destroy() {
    this.destroyChildren();
    this.props.children = [];
    this.componentsManager.onComponentPropsUpdate(this);
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.#updateSelf();
    }
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  #updateSelf() {
    // The children may contain 'reference' components, so normalize the children...
    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());

    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);

    this.props.children = this.getChildrenComponentsIds();
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
