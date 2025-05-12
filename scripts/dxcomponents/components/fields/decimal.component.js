import { FieldBaseComponent } from './field-base.component.js';

export class DecimalComponent extends FieldBaseComponent {

  updateSelf() {
    this.updateBaseProps();
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    if (configProps.decimalPrecision !== undefined) {
      this.props.decimalPrecision = typeof configProps.decimalPrecision === 'string'
        ? parseInt(decimalPrecision, 10)
        : configProps.decimalPrecision
    }
    if (configProps.showGroupSeparators != null) {
      this.props.showGroupSeparators = this.utils.getBooleanValue(configProps.showGroupSeparators);
    }
    this.propName = this.pConn$.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
