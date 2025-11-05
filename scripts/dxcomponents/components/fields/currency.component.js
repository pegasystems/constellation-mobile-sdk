import { FieldBaseComponent } from "./field-base.component.js";

export class CurrencyComponent extends FieldBaseComponent {
   updateSelf() {
      this.updateBaseProps();
      const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
      this.props.currencyISOCode = configProps.currencyISOCode ?? this.props.currencyISOCode ?? "";
      this.props.showISOCode = configProps.alwaysShowISOCode ?? this.props.showISOCode ?? false;
      this.props.decimalPrecision = this.utils.getBooleanValue(configProps.allowDecimals ?? false) ? 2 : 0;
      this.props.value = this.utils.getStringValue(configProps.value ?? this.props.value);
      this.propName = this.pConn.getStateProps().value;

      this.componentsManager.onComponentPropsUpdate(this);
   }
}
