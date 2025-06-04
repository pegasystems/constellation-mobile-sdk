import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import { ContainerBaseComponent } from './container-base.component.js';

export class AssignmentCardComponent extends ContainerBaseComponent {
  arMainButtons$;
  arSecondaryButtons$;
  props;
  actionButtonsComponent;

  constructor(componentsManager, pConn, childrenPConns, mainButtons, secondaryButtons, actionButtonClick) {
    super(componentsManager, pConn);
    this.type = "AssignmentCard";
    this.childrenPConns = childrenPConns;
    this.arMainButtons$ = mainButtons;
    this.arSecondaryButtons$ = secondaryButtons;
    this.actionButtonClick = actionButtonClick;
  }

  init() {
    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.childrenPConns);
    this.componentsManager.onComponentAdded(this);

    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);

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
    this.pConn = pConn;
    const oldChildren = this.childrenPConns;
    this.childrenPConns = pConnChildren;
    this.arMainButtons$ = mainButtons;
    this.arSecondaryButtons$ = secondaryButtons;
    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.childrenPConns);

    const reconciledComponents = this.reconcileChildren();
    this.childrenComponents = reconciledComponents.map((item) => item.component);
    this.initReconciledComponents(reconciledComponents);

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
