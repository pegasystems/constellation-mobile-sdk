import { FieldBaseComponent } from "./field-base.component.js";

export class DecimalComponent extends FieldBaseComponent {
    updateSelf() {
        this.updateBaseProps();
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        if (configProps.decimalPrecision != null) {
            this.props.decimalPrecision = this.#getPrecision(configProps.decimalPrecision);
        }
        if (configProps.showGroupSeparators != null) {
            this.props.showGroupSeparators = this.utils.getBooleanValue(configProps.showGroupSeparators);
        }
        this.propName = this.pConn.getStateProps().value;
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #getPrecision(decimalPrecision) {
        return typeof decimalPrecision === "string" ? parseInt(decimalPrecision, 10) : decimalPrecision;
    }
}
