import {FieldBaseComponent} from './field-base.component.js';

export class PhoneComponent extends FieldBaseComponent {

  updateSelf() {
    this.updateBaseProps()
    const showCountryCode = this.pConn.resolveConfigProps(this.pConn.getConfigProps()).showCountryCode;
    this.props.showCountryCode = showCountryCode != null ? this.utils.getBooleanValue(showCountryCode) : true;
    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
