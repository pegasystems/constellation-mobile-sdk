import {ContainerBaseComponent} from './container-base.component.js';

export class OneColumnComponent extends ContainerBaseComponent {
  props;

  constructor(componentsManager, pConn) {
    super(componentsManager, pConn);
    this.type = "OneColumn"
  }

  init() {
    this.componentsManager.onComponentAdded(this);
    this.reconcileChildren();
    this.sendPropsUpdate();
  }

  destroy() {
    // prevents sending fields from previous steps on next submit see: TASK-1776419 pulse
    PCore.getContextTreeManager().removeContextTreeNode(this.pConn.getContextName());
    this.destroyChildren();
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    this.pConn = pConn;
    this.reconcileChildren();
    this.sendPropsUpdate();
  }

  onEvent(event) {
    this.childrenComponents.forEach(component => component.onEvent(event));
  }

  sendPropsUpdate() {
    this.props = {
      children: this.getChildrenComponentsIds()
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
