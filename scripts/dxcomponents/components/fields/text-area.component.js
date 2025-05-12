import { FieldBaseComponent } from './field-base.component.js';

export class TextAreaComponent extends FieldBaseComponent {

  updateSelf() {
    this.updateBaseProps();
    this.props.maxLength = this.pConn$.getFieldMetadata(this.pConn$.getRawConfigProps()?.value)?.maxLength || 100;
    this.propName = this.pConn$.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
