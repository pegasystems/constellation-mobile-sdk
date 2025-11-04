import { Utils } from '../../helpers/utils.js';
import { BaseComponent } from '../base.component.js';

const TAG = '[UnsupportedComponent]';

export class UnsupportedComponent extends BaseComponent {
  utils;
  props = {
    visible: true,
    type: ''
  }
  unsupportedType;

  constructor(componentsManager, pConn, unsupportedType) {
    super(componentsManager, pConn);
    this.type = "Unsupported";
    this.utils = new Utils();
    this.unsupportedType = unsupportedType ?? this.pConn.meta.type;
  }

  init() {
    this.updateSelf()
  }

  destroy() {
    console.log(TAG, `Unsupported component ${this.type} for property ${this.propName} destroyed`);
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.updateSelf();
    }
  }

  updateSelf() {
    this.propName = this.pConn.getStateProps().value;
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.props.type = this.unsupportedType;
    if (configProps.visibility != null) {
      this.props.visible = this.utils.getBooleanValue(configProps.visibility);
    }
    console.log(TAG, `Unsupported component ${this.type} for property ${this.propName} inited`);
    this.componentsManager.onComponentAdded(this);
    this.componentsManager.onComponentPropsUpdate(this);
  }

  destroy() {
    console.log(TAG, `Unsupported component ${this.type} for property ${this.propName} destroyed`);
    this.componentsManager.onComponentRemoved(this);
  }

  onEvent(event) {

  }
}
