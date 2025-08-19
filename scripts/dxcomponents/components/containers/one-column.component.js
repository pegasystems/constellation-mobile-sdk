import {ContainerBaseComponent} from './container-base.component.js';
import {ReferenceComponent} from './reference.component.js';

export class OneColumnComponent extends ContainerBaseComponent {
  props;

  constructor(componentsManager, pConn, childrenPConns) {
    super(componentsManager, pConn);
    this.type = "OneColumn"
    this.childrenPConns = childrenPConns;
  }

  init() {
    this.componentsManager.onComponentAdded(this);
    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.childrenPConns);
    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);
    this.sendPropsUpdate();
    this.initialized = true;
  }

  destroy() {
    // prevents sending fields from previous steps on next submit see: TASK-1776419 pulse
    PCore.getContextTreeManager().removeContextTreeNode(this.pConn.getContextName());
    this.destroyChildren();
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn, childrenPConns) {
    this.pConn = pConn;
    this.childrenPConns = ReferenceComponent.normalizePConnArray(childrenPConns);

    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);

    this.sendPropsUpdate();
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  sendPropsUpdate() {
    this.props = {
      children: this.getChildrenComponentsIds()
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
