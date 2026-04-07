import { FieldBaseComponent } from "./field-base.component.js";

export class MultiselectComponent extends FieldBaseComponent {
    selectionList = "";
    selectionKey = "";
    primaryField = "";
    referenceListPath = "";
    pageInstructionsInitialized = false;
    compositeKeys = [];
    rawRecords = {};

    props = {
        ...this.props,
        options: [],
    };

    init() {
        super.init();
        this.ensureReferenceList();
    }

    update(pConn) {
        super.update(pConn);
        this.ensureReferenceList();
    }

    updateSelf() {
        this.updateBaseProps();

        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps());
        this.selectionList = configProps.selectionList ?? "";
        this.selectionKey = configProps.selectionKey ?? "";
        this.primaryField = configProps.primaryField ?? "";
        this.referenceListPath = configProps.referenceList ?? "";

        if (this.referenceListPath) {
            this.pConn.setReferenceList(this.selectionList);
        }

        if (!this.pageInstructionsInitialized && this.selectionList) {
            this.pageInstructionsInitialized = true;
            this.compositeKeys = this.getCompositeKeys();
            this.pConn.getListActions().initDefaultPageInstructions(this.selectionList, this.compositeKeys);
        }

        this.props.selectedKeys = this.getSelectedKeys();

        this.componentsManager.onComponentPropsUpdate(this);
        this.loadOptions(configProps.parameters);
    }

    loadOptions(parameters) {
        PCore.getDataApiUtils()
            .getData(this.referenceListPath, { dataViewParameters: parameters ?? {} }, "")
            .then((res) => {
                const records = res?.data?.data || [];
                const keyProp = this.normalizePropName(this.selectionKey);
                const labelProp = this.normalizePropName(this.primaryField);

                this.rawRecords = {};
                records.forEach((entry) => {
                    const k = entry[keyProp];
                    if (k != null) {
                        this.rawRecords[k.toString()] = entry;
                    }
                });

                this.props.options = records
                    .filter((item) => item[keyProp] != null)
                    .map((item) => ({
                        key: item[keyProp].toString(),
                        value: item[keyProp],
                        label: (item[labelProp] ?? item[keyProp]).toString(),
                    }));

                this.props.selectedKeys = this.getSelectedKeys();
                this.componentsManager.onComponentPropsUpdate(this);
            })
            .catch((err) => {
                console.warn("MultiselectComponent", "Error loading options:", err);
            });
    }

    onEvent(event) {
        if (event.type === "MultiselectEvent") {
            this.onMultiselectEvent(event.eventData ?? {});
            return;
        }
        super.onEvent(event);
    }

    onMultiselectEvent(eventData) {
        switch (eventData.type) {
            case "addItem":
                this.addItem(eventData.key);
                break;
            case "removeItem":
                this.removeItem(eventData.key);
                break;
            default:
                console.warn("MultiselectComponent", "Unexpected event:", eventData.type);
        }
    }

    addItem(key) {
        if (!key || !this.selectionKey) return;

        const selectedOption = this.props.options?.find((option) => option.key === key);
        if (!selectedOption) return;

        const actualProperty = this.normalizePropName(this.selectionKey);
        const displayProperty = this.normalizePropName(this.primaryField);
        const rows = this.pConn.getValue(this.getSelectionPath()) || [];
        const startIndex = Array.isArray(rows) ? rows.length : 0;

        // Build content with key, label, and composite key values from the raw record
        const content = { [actualProperty]: selectedOption.value, [displayProperty]: selectedOption.label };
        const rawRecord = this.rawRecords[key] || {};
        this.compositeKeys.forEach((prop) => {
            if (rawRecord[prop] !== undefined) {
                content[prop] = rawRecord[prop];
            }
        });

        const nonFormProperties = Object.keys(content).filter((k) => k !== actualProperty);

        const listActions = this.pConn.getListActions();
        listActions.insert({ ...content, nonFormProperties }, startIndex);
        listActions.update(content, startIndex);
    }

    removeItem(key) {
        if (!key || !this.selectionKey) return;

        const actualProperty = this.normalizePropName(this.selectionKey);
        const rows = this.pConn.getValue(this.getSelectionPath()) || [];
        const index = Array.isArray(rows) ? rows.findIndex((row) => String(row[actualProperty]) === key) : -1;

        if (index >= 0) {
            this.pConn.getListActions().deleteEntry(index);
        }
    }

    getSelectedKeys() {
        if (!this.selectionKey || !this.selectionList) return [];

        const selectionData = this.pConn.getValue(this.getSelectionPath()) || [];
        if (!Array.isArray(selectionData)) return [];

        const keyProperty = this.normalizePropName(this.selectionKey);
        return selectionData
            .map((item) => item?.[keyProperty])
            .filter((val) => val != null)
            .map((val) => val.toString());
    }

    getSelectionPath() {
        return `${this.pConn.getPageReference()}${this.selectionList}`;
    }

    getCompositeKeys() {
        const metadata = this.pConn.getFieldMetadata(this.selectionList) || {};
        const { datasource: { parameters = {} } = {} } = metadata;
        const keys = [];
        Object.values(parameters).forEach((param) => {
            if (this.isSelfReferencedProperty(param, this.selectionList)) {
                keys.push(param.substring(param.lastIndexOf(".") + 1));
            }
        });
        return keys;
    }

    ensureReferenceList() {
        if (this.selectionList && this.pConn.getReferenceList() !== this.selectionList) {
            this.pConn.setReferenceList(this.selectionList);
            this.compositeKeys = this.getCompositeKeys();
            this.pConn.getListActions().initDefaultPageInstructions(this.selectionList, this.compositeKeys);
        }
    }

    isSelfReferencedProperty(param, referenceProp) {
        const [, parentPropName] = param.split(".");
        const referencePropParent = referenceProp?.split(".").pop();
        return parentPropName === referencePropParent;
    }

    normalizePropName(propertyName) {
        return propertyName?.startsWith(".") ? propertyName.substring(1) : propertyName;
    }
}
