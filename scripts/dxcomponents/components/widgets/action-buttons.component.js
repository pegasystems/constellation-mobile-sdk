
export class ActionButtonsComponent {
  arMainButtons$ = []
  arSecondaryButtons$ = []
  actionButtonClick;

  localizedVal = PCore.getLocaleUtils().getLocaleValue;
  localeCategory = 'Assignment';
  compId;
  type;

  constructor(componentsManager, mainButtons, secondaryButtons, actionButtonClick) {
    this.compId = componentsManager.getNextComponentId();
    this.type = "ActionButtons";
    this.componentsManager = componentsManager;
    this.arMainButtons$ = mainButtons;
    this.arSecondaryButtons$ = secondaryButtons;
    this.actionButtonClick = actionButtonClick;
  }

  init() {
    this.componentsManager.onComponentAdded(this);
    this.sendProps();
  }

  destroy() {
    this.componentsManager.onComponentRemoved(this);
  }

  update(mainButtons, secondaryButtons, actionButtonClick) {
    this.arMainButtons$ = mainButtons;
    this.arSecondaryButtons$ = secondaryButtons;
    this.actionButtonClick = actionButtonClick;
    this.sendProps();
  }

  onEvent(event) {
    this.actionButtonClick(
      {
        buttonType: event.componentData.buttonType, 
        action: event.componentData.jsAction
      }
    );
  }

  sendProps() {
    const props = {
      mainButtons: this.arMainButtons$.map((button) => this.toButtonProp(button, 'primary') ),
      secondaryButtons: this.arSecondaryButtons$
      .filter((button) => button.jsAction !== 'saveAssignment') // not supported yet
      .map((button) => this.toButtonProp(button, 'secondary'))
    };
    console.log("sending ActionButtons props: ", props);
    this.componentsManager.onComponentPropsUpdate(this.compId, props);
  }

  toButtonProp(button, type) {
    return {
      type: type,
      name: button.name,
      jsAction: button.jsAction
    }
  }
}
