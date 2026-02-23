import { BaseComponent } from "../../base.component.js";
import {
    buildFieldsForTable,
    evaluateAllowRowAction,
    getContext,
    getReferenceList
} from "./template-utils.js";

export class SimpleTableManualComponent extends BaseComponent {
    jsComponentPConnectData = {};

    DISPLAY_ONLY = 'DISPLAY_ONLY';
    EDITABLE_IN_MODAL = 'EDITABLE_IN_MODAL';
    EDITABLE_IN_ROW = 'EDITABLE_IN_ROW';

    props = {
        visible: true,
        label: "",
        displayMode: this.EDITABLE_IN_ROW,
        allowAddRows: true,
        allowReorderRows: true,
        addButtonLabel: "+ Add",
        columnLabels: [],
        rows: [],
    }

    isInitialized = false;
    referenceListStr;
    targetClassLabel;
    referenceList;
    readOnlyMode;
    allowEditingInModal;
    defaultView;
    bUseSeparateViewForEdit;
    editView;
    prevReferenceList = null;
    editableRows = [];

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTableManual";
    }

    init() {
        this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(
            this,
            this.#checkAndUpdate
        );
        this.isInitialized = true;
        this.componentsManager.onComponentAdded(this);
        this.#updateSelf();
    }

    destroy() {
        super.destroy();
        this.jsComponentPConnectData.unsubscribeFn?.();
        this.editableRows.forEach(row => {
            row.cells.forEach(cell => {
                cell.component.destroy();
            });
        })
        this.editableRows = [];
        this.props.rows = [];
        this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
            this.#updateSelf();
        }
    }

    #checkAndUpdate() {
        if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
            this.#updateSelf();
        }
    }

    #updateSelf() {
        const configProps = this.pConn.resolveConfigProps(this.pConn.getConfigProps())
        if (configProps.visibility != null) {
            this.props.visible = this.utils.getBooleanValue(configProps.visibility);
        }

        const {
            referenceList = [], // if referenceList not in configProps$, default to empty list
            renderMode,
            children,
            presets,
            allowActions,
            allowTableEdit,
            allowRowDelete: allowRowDeleteExpression,
            allowRowEdit: allowRowEditExpression,
            label: labelProp,
            propertyLabel,
            editMode,
            addAndEditRowsWithin,
            viewForAddAndEditModal,
            editModeConfig,
            displayMode,
            useSeparateViewForEdit,
            viewForEditModal,
            targetClassLabel
        } = configProps;

        const conditions = this.#calculateConditions(editMode, allowActions, allowTableEdit)

        this.referenceListStr = getContext(this.pConn).referenceListStr;
        this.props.label = this.pConn.getInheritedProps().label || labelProp || propertyLabel;
        this.targetClassLabel = targetClassLabel;
        this.props.addButtonLabel = targetClassLabel ? `+ Add ${targetClassLabel}` : "+ Add";
        this.referenceList = referenceList.map((element) => {
            element.allowEdit = conditions.allowEditRow && evaluateAllowRowAction(allowRowEditExpression, element)
            return element;
        });
        this.contextClass = this.#getContextClass(configProps);

        this.pConn.setReferenceList(getReferenceList(this.pConn));

        this.readOnlyMode = renderMode === 'ReadOnly';
        const editableMode = renderMode === 'Editable';
        this.props.allowAddRows = editableMode && conditions.allowAddRow;
        this.props.allowReorderRows = editableMode && conditions.allowDragDrop;
        this.allowEditingInModal =
            (editMode ? editMode === 'modal' : addAndEditRowsWithin === 'modal') && !(renderMode === 'ReadOnly' || displayMode === 'DISPLAY_ONLY');
        if (this.readOnlyMode) {
            this.props.displayMode = this.DISPLAY_ONLY;
        } else if (editableMode && this.allowEditingInModal) {
            this.props.displayMode = this.EDITABLE_IN_MODAL;
        } else if (editableMode && !this.allowEditingInModal) {
            this.props.displayMode = this.EDITABLE_IN_ROW;
        }
        this.defaultView = editModeConfig ? editModeConfig.defaultView : viewForAddAndEditModal;
        this.bUseSeparateViewForEdit = editModeConfig ? editModeConfig.useSeparateViewForEdit : useSeparateViewForEdit;
        this.editView = editModeConfig ? editModeConfig.editView : viewForEditModal;

        const rawFields = this.#getRawFields(this.pConn.getRawMetadata())
        const resolvedFields = children?.[0]?.children || presets?.[0].children?.[0].children;
        const fieldDefs = this.#buildFieldDefs(rawFields, resolvedFields)
        this.#initializeDefaultPageInstructions(fieldDefs);

        this.props.columnLabels = this.#getColumnLabels(fieldDefs, resolvedFields);

        if ((!this.#listsEqual(this.prevReferenceList, this.referenceList))) {
            this.#buildRows(rawFields);
        }
        this.props.rows = this.editableRows.map((row, rowIndex) => {
            const allowDelete = conditions.allowDeleteRow && evaluateAllowRowAction(allowRowDeleteExpression, this.referenceList[rowIndex])
            const showEditButton = editableMode && this.allowEditingInModal && this.referenceList[rowIndex].allowEdit
            const showDeleteButton = editableMode && allowDelete
            return {
                cellComponentIds: row.cells.map((cell) => cell.component.compId),
                showEditButton: showEditButton,
                showDeleteButton:  showDeleteButton
            }
        });
        this.prevReferenceList = this.referenceList;
        this.componentsManager.onComponentPropsUpdate(this)
    }

    onEvent(event) {
        if (this.readonlyMode) {
            return;
        }
        if (event.type === "SimpleTableManualEvent") {
            switch (event.eventData?.type) {
                case "addRow":
                    this.#addSimpleTableRow();
                    break;
                case "deleteRow":
                    this.#deleteSimpleTableRow(event.eventData?.rowId);
                    break;
                case "reorderRow":
                    this.#reorderSimpleTableRow(event.eventData?.fromIndex, event.eventData?.toIndex);
                    break;
                case "editRowInModal":
                    this.#editRowInModal(event.eventData?.rowId);
                    break;
                case "addRowInModal":
                    this.#addRowInModal();
                    break;
                default:
                    console.warn("SimpleTableManualComponent", "Unexpected event: ", event.eventData?.type);
            }
            return;
        }

        this.editableRows?.forEach((row) => {
            row.cells.forEach(cell => {
                cell.component.onEvent(event);
            })
        });
    }

    #checkIfAllowActionsOrRowEditingExist(newflagobject) {
        return (newflagobject && Object.keys(newflagobject).length > 0) || this.pConn.getComponentConfig().allowRowEdit;
    }

    #initializeDefaultPageInstructions(fieldDefs) {
        if (this.isInitialized) {
            this.isInitialized = false;
            if (this.allowEditingInModal) {
                this.pConn.getListActions().initDefaultPageInstructions(
                    this.pConn.getReferenceList(),
                    fieldDefs.filter(item => item.name).map(item => item.name)
                );
            } else {
                // @ts-ignore - An argument for 'propertyNames' was not provided.
                this.pConn.getListActions().initDefaultPageInstructions(this.pConn.getReferenceList());
            }
        }
    }

    #buildRows(rawFields) {
        const context = this.pConn.getContextName();
        const newEditableRows = [];
        this.referenceList.forEach((element, rowIndex) => {
            const editableRow = this.editableRows[rowIndex];
            const newEditableCells = [];
            rawFields?.forEach((item, cellIndex) => {
                if (!item?.config?.hide) {
                    item = {
                        ...item,
                        config: {
                            ...item.config,
                            label: '',
                            displayMode: this.readOnlyMode || this.allowEditingInModal || !element.allowEdit ? 'DISPLAY_ONLY' : undefined
                        }
                    };
                    const referenceListData = getReferenceList(this.pConn);
                    const pageReferenceValue = referenceListData.startsWith('D_')
                        ? `${referenceListData}[${rowIndex}]`
                        : `${this.pConn.getPageReference()}${referenceListData}[${rowIndex}]`;
                    const config = {
                        meta: item,
                        options: {
                            context,
                            pageReference: pageReferenceValue,
                            referenceList: referenceListData,
                            hasForm: true
                        }
                    };
                    const cellPConn = PCore.createPConnect(config).getPConnect();
                    const oldComponent = editableRow?.cells?.[cellIndex]?.component;
                    let newComponent;
                    if (oldComponent) {
                        oldComponent.update(cellPConn);
                        newComponent = oldComponent;
                    } else {
                        newComponent = this.componentsManager.create(cellPConn.meta.type, [cellPConn]);
                        newComponent.init();
                    }
                    newEditableCells.push({ component: newComponent })
                }
            });
            newEditableRows.push({ cells: newEditableCells});
        });
        this.editableRows = newEditableRows;
    }

    #addSimpleTableRow() {
        this.pConn.getListActions().insert({ classID: this.contextClass }, this.referenceList.length);
    }

    #deleteSimpleTableRow(index) {
        if (index) {
            this.pConn.getListActions().deleteEntry(parseInt(index));
        } else {
            console.error("SimpleTableManualComponent", "Cannot delete row - index not provided.");
        }
    }

    #reorderSimpleTableRow(fromIndex, toIndex) {
        if (fromIndex != null && toIndex != null) {
            this.pConn.getListActions().reorder(parseInt(fromIndex), parseInt(toIndex));
        } else {
            console.error("SimpleTableManualComponent", "Cannot reorder row - correct indexes not provided.");
        }
    }

    #editRowInModal(index) {
        this.pConn.getActionsApi().openEmbeddedDataModal(
            this.bUseSeparateViewForEdit ? this.editView : this.defaultView,
            this.pConn,
            this.referenceListStr,
            index,
            PCore.getConstants().RESOURCE_STATUS.UPDATE,
            this.targetClassLabel
        );
    }

    #addRowInModal() {
        this.pConn.getActionsApi().openEmbeddedDataModal(
            this.defaultView,
            this.pConn,
            this.referenceListStr,
            this.referenceList.length,
            PCore.getConstants().RESOURCE_STATUS.CREATE,
            this.targetClassLabel
        );
    }

    #getContextClass(configProps) {
        let {contextClass} = configProps;
        if (!contextClass) {
            let listName = this.pConn.getComponentConfig().referenceList;
            listName = PCore.getAnnotationUtils().getPropertyName(listName);
            contextClass = this.pConn.getFieldMetadata(listName)?.pageClass;
        }
        return contextClass
    }

    #getRawFields(rawMetadata) {
        // get raw config as @P and other annotations are processed and don't appear in the resolved config.
        //  Destructure "raw" children into array var: "rawFields"
        //  NOTE: when config.listType == "associated", the property can be found in either
        //    config.value (ex: "@P .DeclarantChoice") or
        //    config.datasource (ex: "@ASSOCIATED .DeclarantChoice")
        //  Neither of these appear in the resolved (this.configProps$)
        const rawConfig = rawMetadata?.config;
        return rawConfig?.children?.[0]?.children || rawConfig?.presets?.[0].children?.[0]?.children;
    }

    #buildFieldDefs(rawFields, resolvedFields) {
        // fieldDefs will be an array where each entry will have a "name" which will be the
        //  "resolved" property name (that we can use as the colId) though it's not really
        //  resolved. The buildFieldsForTable helper just removes the "@P " (which is what
        //  Nebula does). It will also have the "label", and "meta" contains the original,
        //  unchanged config info. For now, much of the info here is carried over from
        //  Nebula and we may not end up using it all.
        const primaryFieldsViewIndex = resolvedFields.findIndex(field => field.config.value === 'pyPrimaryFields');
        const fieldDefs = buildFieldsForTable(rawFields, this.pConn, {
            primaryFieldsViewIndex,
            fields: resolvedFields
        });
        return fieldDefs?.filter(field => !(field.meta?.config?.hide === true));
    }

    #listsEqual(oldList, newList) {
        if (oldList == null) {
            return false;
        }
        if (oldList.length !== newList.length) {
            return false;
        }
        for (let i = 0; i < oldList.length; i++) {
            if (JSON.stringify(oldList[i]) !== JSON.stringify(newList[i])) {
                return false;
            }
        }
        return true;
    }

    #getColumnLabels(fieldDefs, resolvedFields) {
        const displayedColumns = fieldDefs?.map(field => field.name);
        const labelsMap = fieldDefs.reduce((acc, curr) => {
            return {...acc, [curr.name]: curr.label};
        }, {});
        return resolvedFields.map((field, i) => {
            const name = displayedColumns[i];
            return labelsMap[name] || field.config.label;
        });
    }

    #calculateConditions(editMode, allowActions, allowTableEdit) {
        const conditions = {
            allowAddRow: true,
            allowDeleteRow: true,
            allowEditRow: true,
            allowDragDrop: true
        };
        if (this.#checkIfAllowActionsOrRowEditingExist(allowActions) && editMode) {
            conditions.allowAddRow = (allowActions?.allowAdd ?? true) === true;
            conditions.allowDeleteRow = (allowActions?.allowDelete ?? true) === true;
            conditions.allowEditRow = (allowActions?.allowEdit ?? true) === true;
            conditions.allowDragDrop = (allowActions?.allowDragDrop ?? true) === true;
        } else if (allowTableEdit === false) {
            conditions.allowAddRow = false;
            conditions.allowDeleteRow = false;
            conditions.allowDragDrop = false;
        }
        return conditions;
    }
}
