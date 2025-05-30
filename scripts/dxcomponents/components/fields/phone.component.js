import {FieldBaseComponent} from './field-base.component.js';

export class PhoneComponent extends FieldBaseComponent {

  updateSelf() {
    this.updateBaseProps()
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    if (configProps.showCountryCode != null) {
      this.props.showCountryCode = this.utils.getBooleanValue(configProps.showCountryCode);
    } else {
      this.props.showCountryCode = true;
    }
    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
