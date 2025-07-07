export const Constants = {
  DATAPAGE: 'datapage',
  ASSOCIATED: 'associated'
}

const PAGE = '!P!';
const PAGELIST = '!PL!';
const PERIOD = '.';
const AT = '@';
const SQUARE_BRACKET_START = '[';
export const SQUARE_BRACKET_END = ']';

export const useDropdownInitialProcessing = (
  deferDatasource,
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
) => {
  if (deferDatasource && (isTableTypeDataPage || isReferenceField) && datasourceMetadata?.datasource?.name) {
    listType = Constants.DATAPAGE;
    const propColumns = columns ?? [];
    ({ datasource, parameters, columns } = extractFieldMetadata(datasourceMetadata));
    columns = [...propColumns, ...columns];
    const additionalColumns = generateAdditionalColumns(columns, {
      descriptors,
      compositeKeys,
      dataRelationshipContext,
      contextClass
    });
    columns = [...columns, ...additionalColumns];
  } else if (isReferenceField) {
    const additionalColumns = generateAdditionalColumns(columns, {
      descriptors,
      compositeKeys,
      dataRelationshipContext,
      contextClass
    });
    columns = [...columns, ...additionalColumns];
  }
  return [listType, columns, datasource, parameters];
};

const generateAdditionalColumns = (existingColumns, extraOptions) => {
  const { descriptors, compositeKeys, dataRelationshipContext, contextClass, additionalFields } = extraOptions;
  let columns = [];
  if (additionalFields && additionalFields.length > 0) {
    const additionalColumns = additionalFields.map((field) => {
      return {
        value: field.source,
        display: 'false',
        secondary: 'true',
        useForSearch: false,
        setProperty: field.target
      };
    });
    columns = [...columns, ...additionalColumns];
  }
  if (descriptors && descriptors.length > 0) {
    const descriptorColumns = descriptors.map((item) => {
      if (isSelfReferencedProperty(item, dataRelationshipContext) && !item.includes('(')) {
        const name = getDescriptorsFieldName(item, contextClass);
        return {
          value: name,
          display: 'false',
          secondary: 'true',
          useForSearch: false,
          descriptor: true,
          setProperty: `${item.substring(3)}`
        };
      }
      return item;
    });

    columns = [...columns, ...descriptorColumns];
  }
  if (compositeKeys && compositeKeys.length > 0) {
    const key = existingColumns.find((col) => {
      return col.key === 'true';
    });
    const existingKeyName = key && (key.value[0] === '.' ? key.value.substring(1) : key.value);
    const compositeKeysColumns = [];
    compositeKeys.forEach((item) => {
      if (isSelfReferencedProperty(item, dataRelationshipContext) && !item.includes('(')) {
        const name = getDescriptorsFieldName(item, contextClass);
        let propName = getPropertyValue(item);
        propName = propName.substring(propName.indexOf('.') + 1);
        // avoid duplicate key column
        if (existingKeyName !== name) {
          compositeKeysColumns.push({
            value: name,
            display: 'false',
            secondary: 'true',
            useForSearch: false,
            setProperty: `.${dataRelationshipContext}.${propName}`
          });
        }
      }
    });
    columns = [...columns, ...compositeKeysColumns];
  }
  return columns;
};

const isSelfReferencedProperty = (param, referenceProp) => {
  const [, parentPropName] = param.split('.');
  const referencePropParent = referenceProp?.split('.').pop();
  return parentPropName === referencePropParent;
};

/*
  convert configured descriptors/parameters fieldNames
  for leaf level property - @P .Employee.Name -> Name
  for embedded property - @P .Employee.Address.City -> !P!Address:City
*/
function getDescriptorsFieldName(property, pageClass) {
  if (property.startsWith('@')) {
    property = property.substring(property.indexOf(' ') + 1);
    if (property[0] === '.') property = property.substring(1);
  }
  property = property.substring(property.indexOf('.') + 1);
  if (isEmbeddedField(property)) {
    return getEmbeddedFieldName(property, pageClass);
  }
  return property;
}

/**
 * [getPropertyValue]
 *
 example
 {
 value: @P .Employee
 }
 modified to
 {
 value: Employee
 }
 */
function getPropertyValue(value) {
  if (value.startsWith(AT)) {
    value = value.substring(value.indexOf(' ') + 1);
    if (value.startsWith(PERIOD)) value = value.substring(1);
  }
  if (value.includes(SQUARE_BRACKET_START)) {
    value = updatePageListPropertyValue(value);
  }
  return value;
}

function updatePageListPropertyValue(value) {
  value =
    value.substring(0, value.indexOf(SQUARE_BRACKET_START)) + value.substring(value.indexOf(SQUARE_BRACKET_END) + 1);
  return value;
}

const isEmbeddedField = (field) => {
  if (field?.startsWith('@')) {
    field = field.substring(field.indexOf(' ') + 1);
    if (field[0] === '.') field = field.substring(1);
  }
  return field?.indexOf('.') > 0;
};

/**
 * [getEmbeddedFieldName]
 * Description    -               converting normal field name to embedded field starting with !P! or !PL!
 * @ignore
 * @param {string} propertyName   Field name
 * @param {string} classID        classID of datapage
 * @param {Object} [field]        field config
 * @returns {string}              returns converted string with !P! or !PL! and :
 *
 * @example <caption>Example for getEmbeddedFieldName </caption>
 * For page property, getEmbeddedFieldName('Organization.Name') return '!P!Organization:Name'
 * For pageList property, getEmbeddedFieldName('Employees.Name') return '!PL!Employees:Name'
 */

function getEmbeddedFieldName(propertyName, classID, field) {
  let value = propertyName;
  // #EmbeddedPropertyMetaInMetadataAPI
  // isPageListField flag originates from metadata API response and helps in indentifying if a field is of type pagelist or not
  // check isPageListField identifier from field config or check the field meta from rule store
  if (field?.config?.isPageListField || isPageListInPath(value, classID)) {
    value = `!PL!${value.replace(/\./g, ':')}`;
  } else {
    value = `!P!${value.replace(/\./g, ':')}`;
  }
  return value;
}

const isPageListInPath = (propertyName, currentClassID) => {
  if (!propertyName.includes('.')) {
    return false;
  }
  const [first, ...rest] = propertyName.split('.');
  const metadata = PCore.getMetadataUtils().getPropertyMetadata(first, currentClassID);
  if (metadata?.type === 'Page List') {
    return true;
  }
  return isPageListInPath(rest.join('.'), metadata?.pageClass);
};

export const extractFieldMetadata = (datasourceMetadata) => {
  const datasource = datasourceMetadata.datasource.name;
  const parameters = flattenParameters(datasourceMetadata.datasource.parameters);
  let displayProp = datasourceMetadata.datasource.propertyForDisplayText?.startsWith('@P')
    ? datasourceMetadata.datasource.propertyForDisplayText.substring(3)
    : datasourceMetadata.datasource.propertyForDisplayText;
  const valueProp = datasourceMetadata.datasource.propertyForValue?.startsWith('@P')
    ? datasourceMetadata.datasource.propertyForValue.substring(3)
    : datasourceMetadata.datasource.propertyForValue;
  if (displayProp === '') {
    displayProp = valueProp;
  }
  const columns = [
    {
      key: 'true',
      setProperty: 'Associated property',
      value: valueProp
    },
    {
      display: 'true',
      primary: 'true',
      useForSearch: true,
      value: displayProp
    }
  ];
  return { datasource, parameters, columns };
};

const flattenParameters = (parameters = {}) => {
  const flatParams = {};
  let requireFlattening = true;
  Object.keys(parameters).forEach((key) => {
    if (typeof parameters[key] !== 'object') {
      requireFlattening = false;
    } else {
      requireFlattening = true;
      const { name, value } = parameters[key];
      flatParams[name] = value;
    }
  });
  if (!requireFlattening) {
    return parameters;
  }
  return flatParams;
};

export const preProcessColumns = (columns) => {
  return columns?.map((col) => {
    const tempColObj = { ...col };
    tempColObj.value = col.value && col.value.startsWith('.') ? col.value.substring(1) : col.value;
    return tempColObj;
  });
};

export const getDisplayFieldsMetaData = (columns) => {
  const displayColumns = columns.filter((col) => col.display === 'true' || col.secondary === 'true');
  const metaDataObj = { key: '', primary: '', secondary: [], hidden: [] };
  const keyCol = columns.filter((col) => col.key === 'true');
  metaDataObj.key = keyCol.length > 0 ? keyCol[0].value : 'auto';
  for (let index = 0; index < displayColumns.length; index += 1) {
    if (displayColumns[index].primary === 'true') {
      metaDataObj.primary = displayColumns[index].value;
    } else {
      if (displayColumns[index].display === 'false') {
        metaDataObj.hidden.push(displayColumns[index].value);
      }
      metaDataObj.secondary.push(displayColumns[index].value);
    }
  }
  return metaDataObj;
};

export const populateItems = (
  response,
  displayFieldMeta,
  dataApiObj
) => {
  let columnsWithSetProperty = [];
  if (dataApiObj.columns) {
    columnsWithSetProperty = dataApiObj.columns
      .filter((col) => col.setProperty && col.setProperty !== 'Associated property')
      .map((col) => {
        return col.value;
      });
  }
  return (response.data || []).map((entry) => {
    const secondaryFieldValues = [];
    (displayFieldMeta.secondary).forEach((col) => {
      if (columnsWithSetProperty.includes(col)) {
        if (dataApiObj.isQueryable) {
          secondaryFieldValues.push(entry[col]);
        } else {
          secondaryFieldValues.push(get(entry, getFieldNameFromEmbeddedFieldName(col)));
        }
      }
    });
    return {
      key: entry[displayFieldMeta.key],
      text: entry[displayFieldMeta.primary],
      secondaryFieldValues
    };
  });
};

/**
 * [getFieldNameFromEmbeddedFieldName]
 * Description    -               converting embeddedField name starting with !P! or !PL! to normal field
 * @ignore
 * @param {string} propertyName   EmbeddedField name starting with !P! or !PL!
 * @returns {string}              returns converted string without !P! or !PL! and :
 *
 * @example <caption>Example for getFieldNameFromEmbeddedFieldName </caption>
 * getFieldNameFromEmbeddedFieldName('!P!Organization:Name') return 'Organization.Name'
 * getFieldNameFromEmbeddedFieldName('!PL!Employees:Name') return 'Employees.Name'
 */
function getFieldNameFromEmbeddedFieldName(propertyName) {
  let value = propertyName;
  if (value.startsWith(PAGE) || value.startsWith(PAGELIST)) {
    value = value.substring(value.lastIndexOf('!') + 1);
    value = value.replace(/:/g, '.');
  }
  return value;
}

export const buildListSourceItems = (
  deferDatasource,
  isSourceDatapage,
  listItems,
  pConnect,
  datasource
) => {
  let listSourceItems = [];
  if (deferDatasource && isSourceDatapage) {
    listSourceItems = listItems;
  } else {
    const configProps = pConnect.getConfigProps();
    // FIXME: Add listOutput type in configprops
    listSourceItems = isSourceDatapage ? configProps.listOutput : datasource;

    if (isSourceDatapage && typeof datasource === 'object' && !Array.isArray(listSourceItems)) {
      listSourceItems = datasource.source ? datasource.source : [];
    }
  }
  return listSourceItems;
};
