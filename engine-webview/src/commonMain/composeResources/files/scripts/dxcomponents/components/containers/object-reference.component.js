import { ContainerBaseComponent } from "./container-base.component.js";
import {
    OBJECT_REFERENCE_SELECTION_MODE,
    buildPresets,
    buildReferenceColumns,
    getDataRelationshipContext,
    getLeafPropertyName,
    getPropertyName,
    getReferenceDisplayProperty,
    getSelectionList,
    normalizeObjectReferenceType,
    stripPropertyAnnotation,
} from "./object-reference-utils.js";

const TAG = "[ObjectReferenceComponent]";

export class ObjectReferenceComponent extends ContainerBaseComponent {
    props = {
        children: [],
        visible: true,
        label: "",
        isDisplayOnly: false
    };
    rawMetadata = {};
    resolvedType = "";
    mode = "";
    parameterizedDataSource = [];
    parameterRequestKey = "";
    parameterRequestId = 0;

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "ObjectReference";
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
        this.componentsManager.onComponentAdded(this);
        this.#updateSelf();
    }

    update(pConn) {
        if (this.updatePConnAndResubscribeIfContextChanged(pConn, this.#checkAndUpdate)) {
            this.#checkAndUpdate();
        }
    }

    destroy() {
        this.parameterRequestId += 1;
        super.destroy();
    }

    #checkAndUpdate = () => {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) this.#updateSelf();
    };

    #updateSelf() {
        this.rawMetadata = this.pConn.getRawMetadata?.() ?? {};
        const rawConfig = this.rawMetadata.config ?? {};
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        const propsToUse = { ...(this.pConn.getInheritedProps?.() ?? {}), ...configProps };
        this.mode = rawConfig.mode ?? propsToUse.mode ?? OBJECT_REFERENCE_SELECTION_MODE.SINGLE;
        this.resolvedType = normalizeObjectReferenceType(rawConfig.componentType ?? propsToUse.componentType, this.mode);
        const displayMode = propsToUse.displayMode ?? "";
        const readOnly = this.#toBoolean(propsToUse.readOnly);

        this.props.visible = this.#toBoolean(propsToUse.visibility ?? true);
        this.props.label = propsToUse.label ?? "";
        this.props.isDisplayOnly = displayMode === "DISPLAY_ONLY" || readOnly || this.mode === "readonly-multi";

        if (!this.props.visible) {
            this.parameterRequestId += 1;
            this.parameterRequestKey = "";
            this.reconcileChildren([]);
            this.#sendPropsUpdate();
            return;
        }

        if (this.resolvedType === "CheckboxGroup" && rawConfig.parameters) {
            this.#loadCheckboxOptions(rawConfig, propsToUse.parameters ?? {});
        }

        const children = this.#buildChildren(rawConfig, propsToUse, displayMode, readOnly);
        this.reconcileChildren(children);
        this.#sendPropsUpdate();
    }

    #buildChildren(rawConfig, propsToUse, displayMode, readOnly) {
        const referenceType = (propsToUse.targetObjectType ?? rawConfig.targetObjectType)?.toLowerCase() === "case" ? "Case" : "Data";
        const displayOnly = displayMode === "DISPLAY_ONLY" || readOnly;

        if (["Cards", "Table", "SimpleTable"].includes(this.resolvedType)) {
            if (this.resolvedType === "Cards") {
                return this.#wrapChild(this.#createChild(this.mode === "single" ? "RadioButtons" : "Checkbox", {
                    ...this.#buildCardsConfig(rawConfig, propsToUse, referenceType),
                    onRecordChange: this.#onRecordChange,
                }));
            }
            return this.#wrapChild(this.#createChild("SimpleTableSelect", this.#buildTableConfig(rawConfig, propsToUse, referenceType)));
        }

        if (this.mode === "readonly-multi" || (this.mode === "multi" && displayOnly)) {
            return this.#buildReadonlyMultiChildren(rawConfig, referenceType);
        }
        if (displayOnly || this.resolvedType === "SemanticLink") {
            return this.#wrapChild(this.#buildSemanticLink(rawConfig, propsToUse, displayMode, referenceType));
        }
        if (this.resolvedType === "CheckboxGroup") {
            return this.#wrapChild(this.#createChild("Checkbox", {
                ...this.#buildCheckboxGroupConfig(rawConfig, propsToUse, referenceType),
                onRecordChange: this.#onRecordChange,
            }));
        }
        if (this.resolvedType === "Multiselect") {
            return this.#wrapChild(this.#createChild("Multiselect", {
                ...this.#buildSelectableConfig(rawConfig, propsToUse, referenceType),
                selectionMode: OBJECT_REFERENCE_SELECTION_MODE.MULTI,
                selectionList: getSelectionList(rawConfig),
                readonlyContextList: rawConfig.pagelistValue,
                selectionKey: rawConfig.selectionKey,
                columnsFormatter: rawConfig.secondaryFields,
                onRecordChange: this.#onRecordChange,
            }));
        }
        if (!["AutoComplete", "Dropdown"].includes(this.resolvedType)) {
            console.warn(TAG, "Unsupported ObjectReference component type.", { componentType: this.resolvedType });
            return this.#wrapChild(this.#createChild("Unsupported", { type: this.resolvedType, visibility: propsToUse.visibility }));
        }
        return this.#wrapChild(this.#createChild(this.resolvedType, {
            ...this.#buildSelectableConfig(rawConfig, propsToUse, referenceType),
            onRecordChange: this.#onRecordChange,
        }));
    }

    #buildSelectableConfig(rawConfig, propsToUse, referenceType) {
        const generated = buildReferenceColumns(rawConfig, this.pConn, referenceType);
        const displayField = getReferenceDisplayProperty(rawConfig) || (referenceType === "Case" ? "pyLabel" : "");
        const valueField = getLeafPropertyName(generated.value);
        const value = this.mode === OBJECT_REFERENCE_SELECTION_MODE.SINGLE && rawConfig.aliasKey
            ? `@P ${rawConfig.aliasKey}`
            : generated.value;
        const fieldMetadata = this.pConn.getFieldMetadata?.(
            this.mode === OBJECT_REFERENCE_SELECTION_MODE.SINGLE ? getPropertyName(rawConfig.value)?.split(".")[0] : getPropertyName(rawConfig.pagelistValue)
        ) ?? {};
        return {
            ...rawConfig,
            componentType: this.resolvedType,
            value,
            columns: generated.columns,
            compositeKeys: generated.compositeKeys,
            datasource: { ...generated.datasource, name: rawConfig.referenceList },
            datasourceMetadata: { datasource: {
                ...(fieldMetadata.datasource ?? {}),
                name: rawConfig.referenceList,
                parameters: propsToUse.parameters ?? {},
                propertyForDisplayText: displayField,
                propertyForValue: valueField,
                tableType: "DataPage",
            } },
            deferDatasource: true,
            listType: "datapage",
            parameters: propsToUse.parameters ?? {},
            required: propsToUse.required,
            visibility: propsToUse.visibility,
            disabled: propsToUse.disabled,
            label: propsToUse.label,
            displayMode: propsToUse.displayMode ?? "",
            placeholder: rawConfig.placeholder ?? "@L Select...",
            readOnly: false,
            referenceType,
            contextClass: rawConfig.targetObjectClass,
            primaryField: rawConfig.displayField,
            dataRelationshipContext: getDataRelationshipContext(rawConfig.displayField),
            hideLabel: propsToUse.hideLabel ?? false,
            localeReference: rawConfig.localeReference,
        };
    }

    #buildCardsConfig(rawConfig, propsToUse, referenceType) {
        const selectionKey = rawConfig.selectionKey || `.${getLeafPropertyName(rawConfig.value)}`;
        const displayField = rawConfig.displayField || selectionKey;
        return {
            ...rawConfig,
            value: this.mode === "single" ? rawConfig.value : undefined,
            contextClass: rawConfig.targetObjectClass,
            referenceType,
            readonlyContextList: this.mode.includes("multi") ? rawConfig.pagelistValue : undefined,
            selectionList: this.mode.includes("multi") ? getSelectionList(rawConfig) : stripPropertyAnnotation(rawConfig.contextPage),
            selectionKey,
            selectionMode: this.mode.includes("multi") ? "multi" : undefined,
            renderMode: this.mode === "readonly-multi" ? "ReadOnly" : "",
            variant: "card",
            presets: buildPresets(rawConfig.secondaryFields ?? [], "Cards"),
            datasource: { fields: {
                key: `@P ${selectionKey}`,
                text: `@P .${getLeafPropertyName(displayField)}`,
                value: `@P ${selectionKey}`,
            }, filterDownloadedFields: true, source: `@DATASOURCE ${rawConfig.referenceList}.pxResults` },
            displayAs: "cards",
            required: propsToUse.required,
            readOnly: this.mode === "readonly-multi" || propsToUse.readOnly,
            disabled: propsToUse.disabled,
            label: propsToUse.label,
            primaryField: displayField,
            dataRelationshipContext: getDataRelationshipContext(displayField),
        };
    }

    #buildCheckboxGroupConfig(rawConfig, propsToUse, referenceType) {
        return {
            ...rawConfig,
            datasource: { fields: {
                key: `@P ${rawConfig.selectionKey}`,
                text: `@P ${rawConfig.displayField}`,
                value: `@P ${rawConfig.selectionKey}`,
            }, source: rawConfig.parameters ? this.parameterizedDataSource : `@DATASOURCE ${rawConfig.referenceList}.pxResults` },
            displayAs: "checkboxgroup",
            label: propsToUse.label,
            primaryField: stripPropertyAnnotation(rawConfig.displayField),
            readonlyContextList: rawConfig.pagelistValue,
            referenceType,
            selectionKey: rawConfig.selectionKey,
            selectionList: getSelectionList(rawConfig),
            selectionMode: this.mode,
            disabled: propsToUse.disabled,
            required: propsToUse.required,
            visibility: propsToUse.visibility,
            displayMode: propsToUse.displayMode ?? "",
        };
    }

    #buildTableConfig(rawConfig, propsToUse, referenceType) {
        const multi = this.mode.includes("multi");
        return {
            ...rawConfig,
            contextClass: rawConfig.targetObjectClass,
            displayAs: this.resolvedType === "Table" ? "table" : "simpleTable",
            hideLabel: false,
            label: propsToUse.label,
            presets: buildPresets(rawConfig.columns ?? []),
            readOnly: this.mode === "readonly-multi" || propsToUse.readOnly,
            readonlyContextList: multi ? rawConfig.pagelistValue : undefined,
            referenceList: this.mode === "readonly-multi" ? rawConfig.pagelistValue : rawConfig.referenceList,
            referenceType,
            renderMode: this.mode === "readonly-multi" ? "ReadOnly" : "",
            selectionKey: this.mode === "single" ? rawConfig.value : rawConfig.selectionKey,
            selectionList: getSelectionList(rawConfig),
            selectionMode: multi ? "multi" : "single",
            parameters: propsToUse.parameters ?? {},
            required: propsToUse.required,
            visibility: propsToUse.visibility,
            disabled: propsToUse.disabled,
            dataRelationshipContext: this.mode === "single" ? stripPropertyAnnotation(rawConfig.contextPage) : getSelectionList(rawConfig),
        };
    }

    #buildSemanticLink(rawConfig, propsToUse, displayMode, referenceType) {
        const childType = propsToUse.linkReference === false ? "TextInput" : "SemanticLink";
        return this.#createChild(childType, childType === "TextInput" ? {
            value: rawConfig.displayField,
            label: propsToUse.label,
            readOnly: true,
            displayMode: "DISPLAY_ONLY",
        } : {
            ...rawConfig,
            text: rawConfig.displayField,
            value: rawConfig.value,
            label: propsToUse.hideLabel ? "" : propsToUse.label,
            displayMode,
            referenceType,
            dataRelationshipContext: getDataRelationshipContext(rawConfig.displayField),
        });
    }

    #buildReadonlyMultiChildren(rawConfig, referenceType) {
        const selectionList = getSelectionList(rawConfig);
        const records = this.pConn.getValue(selectionList) ?? [];
        const displayProperty = getReferenceDisplayProperty(rawConfig, { preserveRelativePath: true });
        const keyProperty = getLeafPropertyName(rawConfig.selectionKey);
        if (!Array.isArray(records)) return [];
        return records.map((record, index) => this.pConn.createComponent({
            type: "SemanticLink",
            config: {
                text: this.#getRecordProperty(record, displayProperty) ?? record?.[keyProperty] ?? "",
                referenceType,
                name: `ObjectReference_${record?.[keyProperty] ?? index}`,
            },
        }));
    }

    #getRecordProperty(record, property) {
        if (!record || !property) return undefined;
        return property.split(".").reduce((value, segment) => value?.[segment], record);
    }

    #loadCheckboxOptions(rawConfig, parameters) {
        const requestKey = JSON.stringify({
            context: this.pConn.getContextName?.(),
            referenceList: rawConfig.referenceList,
            parameters
        });
        if (requestKey === this.parameterRequestKey) return;
        this.parameterRequestKey = requestKey;
        const requestId = ++this.parameterRequestId;
        PCore.getDataApiUtils().getData(rawConfig.referenceList, { dataViewParameters: parameters })
            .then((response) => {
                if (!this.alive || requestId !== this.parameterRequestId || !this.props.visible) return;
                const records = response?.data?.data;
                if (!Array.isArray(records)) throw new Error("Invalid ObjectReference options response");
                const key = getPropertyName(rawConfig.selectionKey);
                const text = getReferenceDisplayProperty(rawConfig, { preserveRelativePath: true });
                this.parameterizedDataSource = records
                    .map((record) => {
                        const keyValue = this.#getRecordProperty(record, key);
                        const textValue = this.#getRecordProperty(record, text);
                        return keyValue == null ? null : { key: keyValue, value: keyValue, text: textValue ?? keyValue };
                    })
                    .filter(Boolean);
                this.#updateSelf();
            })
            .catch((error) => {
                if (requestId !== this.parameterRequestId) return;
                this.parameterRequestKey = "";
                this.parameterizedDataSource = [];
                console.warn(TAG, "Parameterized ObjectReference options failed to load.", {
                    status: error?.status ?? error?.statusCode ?? error?.response?.status ?? "",
                    message: error?.message ?? String(error),
                });
                this.#sendPropsUpdate();
            });
    }

    #onRecordChange = () => {
        const rawConfig = this.rawMetadata.config ?? {};
        const caseKey = this.pConn.getCaseInfo?.().getKey?.();
        const viewName = this.rawMetadata.name || this.pConn.getCurrentView?.();
        if (!viewName || !this.pConn.getActionsApi) return

        const componentConfig = this.pConn.getComponentConfig?.() ?? {};
        const isEditableTable = Boolean(componentConfig.isEditableTable);
        const contextName = this.pConn.getContextName?.() ?? "";
        const isRefreshableContext = ["modal", "workarea", "actionarea"].some((context) => contextName.includes(context));
        const fieldDefaults = PCore.getFieldDefaultUtils?.().fieldDefaults?.DataReference ?? {};
        const allowImplicitRefresh = fieldDefaults.allowImplicitRefresh ?? true;
        // Skip refreshCaseView when inside an inline editable table row (isEditableTable) —
        // a refresh would be disruptive to in-progress row edits.
        if (!allowImplicitRefresh || isEditableTable || !isRefreshableContext) return;

        const pageReference = this.pConn.getPageReference().startsWith("objectInfo")
            ? this.pConn.getPageReference().replace("objectInfo.content", "")
            : this.pConn.getPageReference().replace("caseInfo.content", "");
        this.pConn.getActionsApi().refreshCaseView(caseKey, viewName, pageReference, {
            autoDetectRefresh: true,
            propertyName: rawConfig.value ?? "",
        })?.catch((error) => console.warn(TAG, "ObjectReference refresh failed.", error?.message ?? error));
    };

    #createChild(type, config) {
        if (!type) return null;
        try {
            return this.pConn.createComponent({ type, config });
        } catch (error) {
            console.warn(TAG, "Could not create ObjectReference child.", { childType: type, message: error?.message ?? String(error) });
            return null;
        }
    }

    #wrapChild(child) { return child ? [child] : []; }

    #sendPropsUpdate() {
        this.props.children = this.getChildrenProps();
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #toBoolean(value) { return typeof value === "string" ? value.toLowerCase() === "true" : Boolean(value); }
}
