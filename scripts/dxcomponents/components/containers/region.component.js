import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { BaseComponent } from '../base.component.js';

export class RegionComponent extends BaseComponent {

  arChildren$ = [];
  childrenComponents = [];
  props;

  init() {
    this.componentsManager.onComponentAdded(this);
    this.updateSelf();
  }

  destroy() {
    Utils.destroyChildren(this);
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.updateSelf();
    }
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  sendPropsUpdate() {
    const childrenComponents = this.childrenComponents
    this.props = {
       children: Utils.getChildrenComponentsIds(childrenComponents)
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  updateSelf() {
    const oldChildren = this.arChildren$;
    // The children may contain 'reference' components, so normalize the children...
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());


    const reconciledComponents = this.componentsManager.reconcileChildren(this);
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.componentsManager.initReconciledComponents(reconciledComponents);

    console.log("Region children: ", this.arChildren$);
    this.sendPropsUpdate();
  }
}
