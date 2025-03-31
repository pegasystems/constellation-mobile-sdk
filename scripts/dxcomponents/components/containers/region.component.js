import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';

export class RegionComponent {
  pConn$;
  formGroup$;

  arChildren$ = [];
  childrenComponents = [];
  compId;
  type;
  props;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager
    this.type = pConn$.meta.type
  }

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
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
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
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.pConn$.getChildren());


    const reconciledComponents = this.componentsManager.reconcileChildren(this, oldChildren);
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.componentsManager.initReconciledComponents(reconciledComponents);

    console.log("Region children: ", this.arChildren$);
    this.sendPropsUpdate();
  }
}
