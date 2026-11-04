export const OBJECT_REFERENCE_SELECTION_MODE = { SINGLE: "single", MULTI: "multi" };

export function stripPropertyAnnotation(value = "") {
    if (typeof value !== "string") return value;
    if (!value.startsWith("@")) return value;
    const separator = value.indexOf(" ");
    return separator >= 0 ? value.substring(separator + 1) : value;
}

export function getPropertyName(value = "") {
    return stripPropertyAnnotation(value)?.replace(/^\./, "") ?? "";
}

export function getLeafPropertyName(value = "") {
    const property = getPropertyName(value);
    return property.substring(property.lastIndexOf(".") + 1);
}

export function getDataRelationshipContext(value = "") {
    const property = getPropertyName(value);
    const separator = property.lastIndexOf(".");
    return separator >= 0 ? property.substring(0, separator) : "";
}

export function getSelectionList(config) {
    return stripPropertyAnnotation(config.pagelistValue ?? config.selectionList ?? "");
}

export function normalizeObjectReferenceType(componentType, mode) {
    if (componentType !== "Combobox") return componentType;
    return mode === OBJECT_REFERENCE_SELECTION_MODE.MULTI ? "Multiselect" : "AutoComplete";
}

function getReferenceProperty(config) {
    if (config.mode === OBJECT_REFERENCE_SELECTION_MODE.MULTI || config.mode === "readonly-multi") {
        return getPropertyName(config.pagelistValue);
    }
    return getDataRelationshipContext(config.value);
}

export function getReferenceDisplayProperty(config, { preserveRelativePath = false } = {}) {
    const referenceProperty = getReferenceProperty(config);
    const displayProperty = getPropertyName(config.displayField);
    if (referenceProperty && displayProperty.startsWith(`${referenceProperty}.`)) {
        return displayProperty.substring(referenceProperty.length + 1);
    }
    return preserveRelativePath ? displayProperty : getLeafPropertyName(config.displayField);
}

function getCompositeKeys(config, pConn) {
    const referenceProperty = getReferenceProperty(config);
    const parameters = pConn.getFieldMetadata?.(referenceProperty)?.datasource?.parameters ?? {};
    const referenceLeaf = referenceProperty.split(".").pop();
    return Object.values(parameters).filter((parameter) => {
        if (typeof parameter !== "string" || !referenceProperty) return false;
        const property = getPropertyName(parameter);
        const parentProperty = property.substring(0, property.lastIndexOf(".")).split(".").pop();
        return parentProperty === referenceLeaf;
    });
}

export function buildReferenceColumns(config, pConn, referenceType) {
    const referenceProperty = getReferenceProperty(config);
    const displayField = getReferenceDisplayProperty(config) || (referenceType === "Case" ? "pyLabel" : "");
    const selectionProperty = getLeafPropertyName(
        config.mode === OBJECT_REFERENCE_SELECTION_MODE.MULTI ? config.selectionKey : config.value
    );
    const compositeKeys = getCompositeKeys(config, pConn);
    const compositeLeafNames = compositeKeys.map(getLeafPropertyName);
    const keyProperty = compositeLeafNames.includes(selectionProperty)
        ? selectionProperty
        : compositeLeafNames[0] || selectionProperty;
    const columns = [];

    if (displayField) {
        columns.push({ value: displayField, display: "true", useForSearch: true, primary: "true" });
    }
    if (keyProperty) {
        columns.push({ value: keyProperty, setProperty: "Associated property", key: "true" });
    }
    if (referenceType === "Case") {
        columns.push({ value: "pyID", display: "true", secondary: "true", useForSearch: true });
    }
    compositeKeys.forEach((key) => {
        const leaf = getLeafPropertyName(key);
        if (leaf !== keyProperty) {
            columns.push({
                value: `.${leaf}`,
                display: "false",
                secondary: "true",
                useForSearch: false,
                setProperty: key.startsWith("@") ? stripPropertyAnnotation(key) : key,
            });
        }
    });

    const value = config.value || (referenceProperty && keyProperty ? `@P .${referenceProperty}.${keyProperty}` : "");
    return {
        columns,
        compositeKeys,
        value,
        datasource: {
            fields: {
                key: `.${keyProperty}`,
                text: `.${displayField || keyProperty}`,
                value: `.${keyProperty}`,
            },
        },
    };
}

export function buildPresets(columns = [], template = "Table") {
    return [{
        children: [{ children: columns, name: "Columns", type: "Region" }],
        config: {},
        id: "P_",
        label: "",
        name: "presets",
        template,
    }];
}
