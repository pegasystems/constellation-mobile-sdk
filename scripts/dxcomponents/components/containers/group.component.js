
import { ContainerBaseComponent } from './container-base.component.js';
import { Utils } from '../../helpers/utils.js';
import { ReferenceComponent } from './reference.component.js';

const TAG = '[GroupComponent]';

export class GroupComponent extends ContainerBaseComponent {

  jsComponentPConnectData = {};
  props = {
    visible: true,
    children: [],
    showHeading: false,
    heading: '',
    instructions: '',
    collapsible: false,
  }

  constructor(componentsManager, pConn) {
    super(componentsManager, pConn);
    this.type = "Group"
    this.utils = new Utils();
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.jsComponentPConnectData.unsubscribeFn?.();
      this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
      this.checkAndUpdate();
    }
  }

  checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.updateSelf();
    }
  }

  updateSelf() {
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.props.visible = configProps.visibility ?? this.pConn.getComputedVisibility() ?? this.props.visible;
    this.props.showHeading = configProps.showHeading ?? this.props.showHeading;
    this.props.heading = configProps.heading ?? this.props.heading;
    this.props.instructions = configProps.instructions ?? this.props.instructions;
    this.props.collapsible = configProps.collapsible ?? this.props.collapsible;

    this.childrenPConns = ReferenceComponent.normalizePConnArray(this.pConn.getChildren());
    if (configProps.displayMode === 'DISPLAY_ONLY') {
      this.childrenPConns.forEach(child => {
        const pConn = child.getPConnect();
        pConn.setInheritedProp('displayMode', 'DISPLAY_ONLY');
        pConn.setInheritedProp('readOnly', true);
      });
    }
    this.reconcileChildren();
    this.props.children = this.getChildrenComponentsIds();
    this.componentsManager.onComponentPropsUpdate(this);
  }

  onEvent(event) {
    this.childrenComponents.forEach((component) => {component.onEvent(event);})
  }
}
