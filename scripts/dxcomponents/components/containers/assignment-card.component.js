import { ContainerBaseComponent } from "./container-base.component.js";

export class AssignmentCardComponent extends ContainerBaseComponent {
    childrenPConns;
    arMainButtons$;
    arSecondaryButtons$;
    actionButtonClick;
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
        this.componentsManager.onComponentAdded(this);
        this.reconcileChildren(this.childrenPConns);

        this.actionButtonsComponent = this.componentsManager.create("ActionButtons", [
            this.arMainButtons$,
            this.arSecondaryButtons$,
            this.actionButtonClick,
        ]);
        this.actionButtonsComponent.init();
        this.sendPropsUpdate();
    }

    destroy() {
        super.destroy();
        this.destroyChildren();
        this.sendPropsUpdate();
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn, pConnChildren, mainButtons, secondaryButtons) {
        this.pConn = pConn;
        this.childrenPConns = pConnChildren;
        this.arMainButtons$ = mainButtons;
        this.arSecondaryButtons$ = secondaryButtons;

        this.reconcileChildren(this.childrenPConns);
        this.sendPropsUpdate();
        this.actionButtonsComponent.update(this.arMainButtons$, this.arSecondaryButtons$, this.actionButtonClick);
    }

    onEvent(event) {
        this.childrenComponents.forEach((component) => component.onEvent(event));
    }

    sendPropsUpdate() {
        this.props = {
            children: this.getChildrenComponentsIds(),
            actionButtons: this.actionButtonsComponent.compId,
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }
}
