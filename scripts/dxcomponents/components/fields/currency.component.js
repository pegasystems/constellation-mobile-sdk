import { FieldBaseComponent } from './field-base.component.js';

export class CurrencyComponent extends FieldBaseComponent{

  updateSelf() {
    this.updateBaseProps();
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    if (configProps.currencyISOCode != null) {
      this.props.currencyISOCode = configProps.currencyISOCode;
    }
    if (configProps.alwaysShowISOCode != null) {
      this.props.showISOCode = configProps.alwaysShowISOCode;
    }
    this.props.decimalPrecision = configProps.allowDecimals ? 2 : 0;

    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
