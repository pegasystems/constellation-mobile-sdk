import { FieldBaseComponent } from './field-base.component.js';
import { handleEvent } from '../../helpers/event-util.js';

export class PicklistBaseComponent extends FieldBaseComponent {

  fieldOnChange(value) {
    this.props.value = value;
    handleEvent(this.pConn.getActionsApi(), 'changeNblur', this.propName, this.props.value);
  }

  getLocalizedOptionValue(opt, localePath, localeClass, localeContext, localeName) {
    return this.pConn.getLocalizedValue(
      opt.text,
      localePath,
      this.pConn.getLocaleRuleNameFromKeys(localeClass, localeContext, localeName)
    );
  }
}
