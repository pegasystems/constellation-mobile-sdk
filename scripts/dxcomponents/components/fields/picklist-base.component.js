import { FieldBaseComponent } from './field-base.component.js';
import { handleEvent } from '../../helpers/event-util.js';

export class PicklistBaseComponent extends FieldBaseComponent {

  updateSelf() {
    this.updateBaseProps();
    const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
    const options = this.utils.getOptionList(configProps, this.pConn.getDataObject());
    const className = this.pConn.getCaseInfo().getClassName();
    const refName = this.propName?.slice(this.propName.lastIndexOf('.') + 1);
    const fieldMetadata = configProps.fieldMetadata;
    const metaData = Array.isArray(fieldMetadata) ? fieldMetadata.filter(field => field?.classID === className)[0] : fieldMetadata;
    let displayName = metaData?.datasource?.propertyForDisplayText;
    displayName = displayName?.slice(displayName.lastIndexOf('.') + 1);
    const localeContext = metaData?.datasource?.tableType === 'DataPage' ? 'datapage' : 'associated';
    const localeClass = localeContext === 'datapage' ? '@baseclass' : className;
    const localeName = localeContext === 'datapage' ? metaData?.datasource?.name : refName;
    const localePath = localeContext === 'datapage' ? displayName : localeName;

    this.props.options = options.map(option => {
      const localizedValue = this.getLocalizedOptionValue(option, localePath, localeClass, localeContext, localeName);
      return { key: option.key.toString(), label: localizedValue.toString() };
    });

    this.propName = this.pConn.getStateProps().value;
    this.componentsManager.onComponentPropsUpdate(this);
  }

  fieldOnChange(value) {
    this.props.value = value;
    handleEvent(this.pConn.getActionsApi(), 'changeNblur', this.propName, this.props.value);
  }

  getLocalizedOptionValue(opt, localePath, localeClass, localeContext, localeName) {
    return this.pConn.getLocalizedValue(
      opt.value,
      localePath,
      this.pConn.getLocaleRuleNameFromKeys(localeClass, localeContext, localeName)
    );
  }
}
