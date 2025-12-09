export const TABLE_CELL = 'SdkRenderer';
const PRIMARY_FIELDS = 'pyPrimaryFields';

export function getReferenceList(pConn) {
    let resolvePage = pConn.getComponentConfig().referenceList.replace("@P ", "");
    if (resolvePage.includes("D_")) {
        resolvePage = pConn.resolveDatasourceReference(resolvePage);
        if (resolvePage?.pxResults) {
            resolvePage = resolvePage?.pxResults;
        } else if (resolvePage.startsWith("D_") && !resolvePage.endsWith(".pxResults")) {
            resolvePage = `${resolvePage}.pxResults`;
        }
    }
    return resolvePage;
}

export const buildFieldsForTable = (configFields, pConnect, options) => {
    const { primaryFieldsViewIndex, fields } = options;

    // get resolved field labels for primary fields raw config included in configFields
    const fieldsLabels = updateFieldLabels(fields, configFields, primaryFieldsViewIndex, pConnect, {
        columnsRawConfig: pConnect.getRawConfigProps()?.children?.find(item => item?.name === 'Columns')?.children
    });

    const fieldDefs = configFields?.map((field, index) => {
        return {
            type: 'text',
            label: fieldsLabels[index],
            fillAvailableSpace: !!field.config.fillAvailableSpace,
            id: `${index}`,
            name: field.config.value.substr(4),
            cellRenderer: TABLE_CELL,
            sort: false,
            noContextMenu: true,
            showMenu: false,
            meta: {
                ...field
            },
            // BUG-615253: Workaround for autosize in table with lazy loading components
            width: getFieldWidth(field, fields[index].config.label)
        };
    });

    return fieldDefs;
};

export const updateFieldLabels = (fields, configFields, primaryFieldsViewIndex, pConnect, options) => {
    const labelsOfFields = [];
    const { columnsRawConfig = [] } = options;
    fields.forEach((field, idx) => {
        const rawColumnConfig = columnsRawConfig[idx]?.config;
        if (field.config.value === PRIMARY_FIELDS) {
            labelsOfFields.push('');
        } else if (isFLProperty(rawColumnConfig?.label ?? rawColumnConfig?.caption)) {
            labelsOfFields.push(getFieldLabel(rawColumnConfig) || field.config.label || field.config.caption);
        } else {
            labelsOfFields.push(field.config.label || field.config.caption);
        }
    });

    if (primaryFieldsViewIndex > -1) {
        const totalPrimaryFieldsColumns = configFields.length - fields.length + 1;
        if (totalPrimaryFieldsColumns) {
            const primaryFieldLabels = [];
            for (let i = primaryFieldsViewIndex; i < primaryFieldsViewIndex + totalPrimaryFieldsColumns; i += 1) {
                let label = configFields[i].config?.label;
                if (isFLProperty(label)) {
                    label = getFieldLabel(configFields[i].config);
                } else if (label.startsWith('@')) {
                    label = label.substring(3);
                }
                if (pConnect) {
                    label = pConnect.getLocalizedValue(label);
                }
                primaryFieldLabels.push(label);
            }
            labelsOfFields.splice(primaryFieldsViewIndex, 1, ...primaryFieldLabels);
        } else {
            labelsOfFields.splice(primaryFieldsViewIndex, 1);
        }
    }
    return labelsOfFields;
};

export function isFLProperty(label) {
    return label?.startsWith('@FL');
}

function getFieldWidth(field, label) {
    let width;
    switch (field.type) {
        case 'Time':
            width = 150;
            break;
        case 'Date':
            width = 160;
            break;
        case 'DateTime':
            width = 205;
            break;
        case 'AutoComplete':
        case 'TextArea':
            width = 190;
            break;
        case 'Currency':
        case 'TextInput':
            width = 182;
            break;
        case 'Checkbox':
            // eslint-disable-next-line no-case-declarations
            const text = document.createElement('span');
            document.body.appendChild(text);
            text.style.fontSize = '13px';
            text.style.position = 'absolute';
            text.innerHTML = label;
            width = Math.ceil(text.clientWidth) + 30;
            document.body.removeChild(text);
            break;
        default:
            width = 180;
    }
    return width;
}

/**
 * [getFieldLabel]
 * Description - A utility that returns resolved field label for "@FL" annotation i.e from data model.
 * @param {Object} fieldConfig
 * @returns {string} resolved label string
 *
 * example:
 * fieldConfig = {label: "@FL .pyID", classID: "TestCase-Work"};
 * return "Case ID"
 */
export function getFieldLabel(fieldConfig) {
    const { label, classID, caption } = fieldConfig;
    let fieldLabel = (label ?? caption)?.substring(4);
    const labelSplit = fieldLabel?.split('.');
    const propertyName = labelSplit?.pop();
    const fieldMetaData = PCore.getMetadataUtils().getPropertyMetadata(propertyName, classID) ?? {};
    fieldLabel = fieldMetaData.label ?? fieldMetaData.caption ?? propertyName;
    return fieldLabel;
}

/**
 * This method evaluates whether a row action is allowed based on the provided conditions.
 * @param {string|boolean|undefined} rawExpression - The condition for allowing row action.
 * @param {object} rowData - The data of the row being evaluated.
 * @returns {boolean} - Returns true if the row action is allowed, false otherwise.
 */
export function evaluateAllowRowAction(rawExpression, rowData) {
    if (rawExpression === undefined || rawExpression === true) return true;
    if (rawExpression.startsWith?.("@E ")) {
        const expression = rawExpression.replace("@E ", "");
        return PCore.getExpressionEngine().evaluate(expression, rowData);
    }
    return false;
}

export function getContext(thePConn) {
    const contextName = thePConn.getContextName();
    const pageReference = thePConn.getPageReference();
    const {
        readonlyContextList,
        referenceList = readonlyContextList
    } = thePConn.getStateProps()?.config || thePConn.getStateProps();

    const pageReferenceForRows = referenceList.startsWith('.') ? `${pageReference}.${referenceList.substring(1)}` : referenceList;
    const viewName = thePConn.viewName;

    return {
        contextName,
        referenceListStr: referenceList,
        pageReferenceForRows,
        viewName
    };
}
