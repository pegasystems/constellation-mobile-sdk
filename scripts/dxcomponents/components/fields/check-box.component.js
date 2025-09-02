import { handleEvent } from '../../helpers/event-util.js';
import { FieldBaseComponent } from './field-base.component.js';

const TAG = '[CheckBoxComponent]';

export class CheckBoxComponent extends FieldBaseComponent {
  selectionMode;

  updateSelf() {
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.selectionMode = configProps.selectionMode;
    if (this.selectionMode === 'multi') {
      console.log(TAG, "Selection mode 'multi' is unsupported.");
      return;
    }
    this.updateBaseProps();
    this.props.showLabel = this.props.label !== '';
    this.props.caption = configProps.caption ?? '';
    this.props.trueLabel = configProps.trueLabel ?? 'Yes';
    this.props.falseLabel = configProps.falseLabel ?? 'No';
    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }

  fieldOnChange(value) {
    if (this.selectionMode === 'multi') {
      console.log(TAG, "Selection mode 'multi' is unsupported.");
      return;
    }
    this.props.value = value;
    handleEvent(this.pConn.getActionsApi(), 'changeNblur', this.propName, this.#isChecked());
  }

  fieldOnBlur(value) {
    if (this.selectionMode === 'multi') {
      console.log(TAG, "Selection mode 'multi' is unsupported.");
      return;
    }
    this.props.value = value ?? this.props.value;
    this.pConn.getValidationApi().validate(this.#isChecked());
    this.clearErrorMessagesIfNoErrors(this.pConn, this.propName, this.jsComponentPConnectData.validateMessage);
  }

  #isChecked() {
    return this.props.value === 'true' || this.props.value === true;
  }
}
