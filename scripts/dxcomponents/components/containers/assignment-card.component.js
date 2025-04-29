import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';

export class AssignmentCardComponent {
  pConn$;
  formGroup$;
  arMainButtons$;
  arSecondaryButtons$;
  arChildren$;
  updateToken$;
  compId;
  type;
  props;

  childrenComponents = [];
  actionButtonsComponent;

  constructor(componentsManager, pConn$, childrenPConns, mainButtons, secondaryButtons, actionButtonClick) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager
    this.arChildren$ = childrenPConns;
    this.arMainButtons$ = mainButtons;
    this.arSecondaryButtons$ = secondaryButtons;
    this.actionButtonClick = actionButtonClick;
    this.type = "AssignmentCard";
  }

  init() {
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.arChildren$);
    this.componentsManager.onComponentAdded(this);

    const reconciledComponents = this.componentsManager.reconcileChildren(this, []);
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.componentsManager.initReconciledComponents(reconciledComponents);

    const actionButtonsComponentClass = getComponentFromMap("ActionButtons");
    this.actionButtonsComponent = new actionButtonsComponentClass(this.componentsManager, this.arMainButtons$, this.arSecondaryButtons$, this.actionButtonClick);
    this.actionButtonsComponent.init();

    this.sendPropsUpdate();
  }

  destroy() {
    Utils.destroyChildren(this);
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn, pConnChildren, mainButtons, secondaryButtons) {
    this.pConn$ = pConn;
    const oldChildren = this.arChildren$;
    this.arChildren$ = pConnChildren;
    this.arMainButtons$ = mainButtons;
    this.arSecondaryButtons$ = secondaryButtons;
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.arChildren$);

    const reconciledComponents = this.componentsManager.reconcileChildren(this, oldChildren);
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.componentsManager.initReconciledComponents(reconciledComponents);

    this.sendPropsUpdate()
    this.actionButtonsComponent.update(this.arMainButtons$, this.arSecondaryButtons$, this.actionButtonClick);
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }

  sendPropsUpdate() {
    this.props = {
      children: Utils.getChildrenComponentsIds(this.childrenComponents),
      actionButtons: this.actionButtonsComponent.compId
    }
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
