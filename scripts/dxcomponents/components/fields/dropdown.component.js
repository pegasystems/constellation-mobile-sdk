import { PicklistBaseComponent } from './picklist-base.component.js';
import {
  buildListSourceItems,
  Constants,
  extractFieldMetadata,
  getDisplayFieldsMetaData,
  populateItems, preProcessColumns, useDropdownInitialProcessing
} from './dropdown_utils.js';

export class DropdownComponent extends PicklistBaseComponent {
  listItems = [];

  updateSelf() {
    this.updateBaseProps();

    const configProps = this.pConn.getConfigProps();

    const fieldMetadata = configProps.fieldMetadata;
    const descriptors = configProps.descriptors;
    const dataRelationshipContext = configProps.dataRelationshipContext;
    const datasourceMetadata = configProps.datasourceMetadata;
    const contextClass = configProps.contextClass;
    const compositeKeys = configProps.compositeKeys;
    let parameters = configProps.parameters;
    let datasource = configProps.datasource;
    let columns = configProps.columns ?? [];
    let listType = configProps.listType;
    let isDeferredDatasource = configProps.deferDatasource;
    const className = this.pConn.getCaseInfo().getClassName();
    const contextName = this.pConn.getContextName();

    if (descriptors && datasourceMetadata?.datasource?.name) {
      isDeferredDatasource = true;
    }
    const isTableTypeDataPage = datasourceMetadata?.datasource?.tableType?.toLowerCase() === Constants.DATAPAGE;
    const isReferenceField = !!configProps.referenceType && ['case', 'data'].includes(configProps.referenceType.toLowerCase());

    [listType, columns, datasource, parameters] = useDropdownInitialProcessing(
      isDeferredDatasource,
      isTableTypeDataPage,
      isReferenceField,
      datasourceMetadata,
      listType,
      columns,
      datasource,
      parameters,
      descriptors,
      extractFieldMetadata,
      dataRelationshipContext,
      contextClass,
      compositeKeys
    );

    const isSourceDataPage = listType === Constants.DATAPAGE;

    const dataConfig = {
      dataSource: datasource,
      parameters: parameters,
      matchPosition: 'contains',
      listType: listType,
      columns: preProcessColumns(columns),
      cacheLifeSpan: 'form', // causes caching reposes with given parameters
      deferDatasource: isDeferredDatasource,
      maxResultsDisplay: '5000'
    };

    if (isDeferredDatasource && isSourceDataPage) {
      (PCore.getDataApi().init(dataConfig, contextName)).then((dataApiObj) => {
        dataApiObj.fetchData('').then((response) => {
          const displayFieldMeta = getDisplayFieldsMetaData(dataConfig.columns);
          this.listItems = populateItems(response, displayFieldMeta, dataApiObj);
          this.updateOptions(configProps, fieldMetadata, className, isDeferredDatasource, isSourceDataPage, datasource);
        });
      });
    }
    this.updateOptions(fieldMetadata, className, isDeferredDatasource, isSourceDataPage, datasource);
  }

  updateOptions(fieldMetadata, className, deferDatasource, isSourceDataPage, datasource) {
    const metaData = Array.isArray(fieldMetadata)
      ? fieldMetadata.filter((field) => field?.classID === className)[0]
      : fieldMetadata;

    let displayName = metaData?.datasource?.propertyForDisplayText;
    displayName = displayName?.slice(displayName.lastIndexOf('.') + 1);
    const localeContext = metaData?.datasource?.tableType === 'DataPage' ? Constants.DATAPAGE : Constants.ASSOCIATED;

    const options = buildListSourceItems(deferDatasource, isSourceDataPage, this.listItems, this.pConn, datasource);

    this.propName = this.pConn.getStateProps().value;
    const refName = this.propName?.slice(this.propName.lastIndexOf('.') + 1);
    const localeName = localeContext === 'datapage' ? metaData?.datasource?.name : refName;
    const localePath = localeContext === 'datapage' ? displayName : localeName;
    const localeClass = localeContext === 'datapage' ? '@baseclass' : className;

    this.props.options = options.map(option => {
      const localizedValue = this.getLocalizedOptionValue(option, localePath, localeClass, localeContext, localeName);
      return { key: option.key.toString(), label: localizedValue.toString() };
    });
    this.componentsManager.onComponentPropsUpdate(this);
  }
}
