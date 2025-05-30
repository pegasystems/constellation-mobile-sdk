import { Utils } from '../../helpers/utils.js';
import { handleEvent } from '../../helpers/event-util.js';
import { FieldBaseComponent } from './field-base.component.js';

export class CheckBoxComponent extends FieldBaseComponent {
  selectionMode;

  updateSelf() {
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    this.selectionMode = configProps.selectionMode;
    if (this.selectionMode === 'multi') {
      console.log("Selection mode 'multi' is unsupported.");
      return;
    }
    this.updateBaseProps();
    if (this.props.label !== '') {
      this.props.showLabel = true;
    }
    this.props.caption = configProps.caption || '';
    this.props.trueLabel = configProps.trueLabel || 'Yes';
    this.props.falseLabel = configProps.falseLabel || 'No';
    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }

  fieldOnChange(value) {
    if (this.selectionMode === 'multi') {
      console.log("Selection mode 'multi' is unsupported.");
      return;
    }
    this.props.value = value;
    const checked = this.props.value === 'true' || this.props.value === true;
    handleEvent(this.pConn.getActionsApi(), 'changeNblur', this.propName, checked);
  }

  fieldOnBlur(value) {
    if (this.selectionMode === 'multi') {
      console.log("Selection mode 'multi' is unsupported.");
      return;
    }
    if (value !== undefined) {
      this.props.value = value;
    }
    const checked = this.props.value === 'true' || this.props.value === true;
    this.pConn.getValidationApi().validate(checked);
    Utils.clearErrorMessagesIfNoErrors(this.pConn, this.propName, this.jsComponentPConnectData.validateMessage);
  }
}
