import {BaseComponent} from "../../base.component.js";
import {Utils} from "../../../helpers/utils.js";
import {buildFieldsForTable, evaluateAllowRowAction, getReferenceList, updateFieldLabels} from "./template-utils.js";

export class SimpleTableManualComponent extends BaseComponent {
    jsComponentPConnectData = {};

    DISPLAY_ONLY = 'DISPLAY_ONLY';
    EDITABLE_IN_MODAL = 'EDITABLE_IN_MODAL';
    EDITABLE_IN_ROW = 'EDITABLE_IN_ROW';

    isInitialized = false;
    referenceListStr;
    parameters;
    targetClassLabel;
    referenceList;
    rawFields;
    readOnlyMode;
    allowEditingInModal;
    defaultView;
    bUseSeparateViewForEdit;
    editView;
    prevReferenceList = null;
    props = {
        visible: true,
        label: "",
        displayMode: this.EDITABLE_IN_ROW,
        allowAddRows: true,
        allowReorderRows: true,
        buttonLabel: "+ Add",
        columnLabels: [],
        rows: [],
    }
    editableRows = [];

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTableManual";
        this.utils = new Utils();
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
        // NOTE: getConfigProps() has each child.config with datasource and value undefined
        //  but getRawMetadata() has each child.config with datasource and value showing their unresolved values (ex: "@P thePropName")
        //  We need to use the prop name as the "glue" to tie the Angular Material table dataSource, displayColumns and data together.
        //  So, in the code below, we'll use the unresolved config.value (but replacing the space with an underscore to keep things happy)
        const rawMetadata = this.pConn.getRawMetadata();

        const {
            referenceList = [], // if referenceList not in configProps$, default to empty list
            renderMode,
            children, // destructure children into an array var: "resolvedFields"
            presets,
            allowActions,
            allowTableEdit,
            allowRowDelete,
            allowRowEdit,
            label: labelProp,
            propertyLabel,
            fieldMetadata,
            editMode,
            addAndEditRowsWithin,
            viewForAddAndEditModal,
            editModeConfig,
            displayMode,
            useSeparateViewForEdit,
            viewForEditModal,
            targetClassLabel,
            dataPageName
        } = configProps;

        const simpleTableManualProps = {};
        if (this.#checkIfAllowActionsOrRowEditingExist(allowActions) && editMode) {
            simpleTableManualProps.hideAddRow = allowActions?.allowAdd === false;
            simpleTableManualProps.hideDeleteRow = allowActions?.allowDelete === false;
            simpleTableManualProps.hideEditRow = allowActions?.allowEdit === false;
            simpleTableManualProps.disableDragDrop = allowActions?.allowDragDrop === false;
        } else if (allowTableEdit === false) {
            simpleTableManualProps.hideAddRow = true;
            simpleTableManualProps.hideDeleteRow = true;
            simpleTableManualProps.disableDragDrop = true;
        }
        this.referenceListStr = this.#getContext(this.pConn).referenceListStr;
        this.props.label = labelProp || propertyLabel;
        this.parameters = fieldMetadata?.datasource?.parameters;
        this.targetClassLabel = targetClassLabel;
        let {contextClass} = configProps;
        this.referenceList = referenceList;
        if (!contextClass) {
            let listName = this.pConn.getComponentConfig().referenceList;
            listName = PCore.getAnnotationUtils().getPropertyName(listName);
            contextClass = this.pConn.getFieldMetadata(listName)?.pageClass;
        }
        this.contextClass = contextClass;

        const resolvedFields = children?.[0]?.children || presets?.[0].children?.[0].children;
        // get raw config as @P and other annotations are processed and don't appear in the resolved config.
        //  Destructure "raw" children into array var: "rawFields"
        //  NOTE: when config.listType == "associated", the property can be found in either
        //    config.value (ex: "@P .DeclarantChoice") or
        //    config.datasource (ex: "@ASSOCIATED .DeclarantChoice")
        //  Neither of these appear in the resolved (this.configProps$)
        const rawConfig = rawMetadata?.config;
        const rawFields = rawConfig?.children?.[0]?.children || rawConfig?.presets?.[0].children?.[0]?.children;
        this.rawFields = rawFields;
        // At this point, fields has resolvedFields and rawFields we can use
        const resolvedList = getReferenceList(this.pConn);
        this.pageReference = `${this.pConn.getPageReference()}${resolvedList}`;
        this.pConn.setReferenceList(resolvedList);
        // this.props.requestedReadOnlyMode = renderMode === 'ReadOnly';
        this.readOnlyMode = renderMode === 'ReadOnly';
        const editableMode = renderMode === 'Editable';
        const isDisplayModeEnabled = displayMode === 'DISPLAY_ONLY';
        this.props.allowAddRows = editableMode && !simpleTableManualProps.hideAddRow;
        this.allowEditingInModal =
            (editMode ? editMode === 'modal' : addAndEditRowsWithin === 'modal') && !(renderMode === 'ReadOnly' || isDisplayModeEnabled);

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
        const primaryFieldsViewIndex = resolvedFields.findIndex(field => field.config.value === 'pyPrimaryFields');

        this.props.addButtonLabel =  targetClassLabel ? `+ Add ${targetClassLabel}` : "+ Add";

        // fieldDefs will be an array where each entry will have a "name" which will be the
        //  "resolved" property name (that we can use as the colId) though it's not really
        //  resolved. The buildFieldsForTable helper just removes the "@P " (which is what
        //  Nebula does). It will also have the "label", and "meta" contains the original,
        //  unchanged config info. For now, much of the info here is carried over from
        //  Nebula and we may not end up using it all.
        this.fieldDefs = buildFieldsForTable(rawFields, this.pConn, {
            primaryFieldsViewIndex,
            fields: resolvedFields
        });
        this.fieldDefs = this.fieldDefs?.filter(field => !(field.meta?.config?.hide === true));
        this.#initializeDefaultPageInstructions();

        // Here, we use the "name" field in fieldDefs since that has the assoicated property
        //  (if one exists for the field). If no "name", use "cellRenderer" (typically get DELETE_ICON)
        //  for our columns.
        const displayedColumns = this.fieldDefs?.map(field => {
            return field.name ? field.name : field.cellRenderer;
        });

        // And now we can process the resolvedFields to add in the "name"
        //  from from the fieldDefs. This "name" is the value that
        //  we'll share to connect things together in the table.

        const labelsMap = this.fieldDefs.reduce((acc, curr) => {
            return {...acc, [curr.name]: curr.label};
        }, {});
        this.props.columnLabels = resolvedFields.map((field, i) => {
            const name = displayedColumns[i];
            return labelsMap[name] || field.config.label;
        });

        if (JSON.stringify(this.prevReferenceList) !== JSON.stringify(this.referenceList)) { //TODO PELCM: make it more efficient
            this.#buildRows(editableMode, !simpleTableManualProps.hideDeleteRow, allowRowDelete, !simpleTableManualProps.hideEditRow, allowRowEdit);
        }
        this.prevReferenceList = this.referenceList;
        this.componentsManager.onComponentPropsUpdate(this)
    }

    onEvent(event) {
        if (this.readonlyMode) {
            return; // no-op
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

    #getContext(thePConn) {
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
    };

    #initializeDefaultPageInstructions() {
        if (this.isInitialized) {
            this.isInitialized = false;
            if (this.allowEditingInModal) {
                this.pConn.getListActions().initDefaultPageInstructions(
                    this.pConn.getReferenceList(),
                    this.fieldDefs.filter(item => item.name).map(item => item.name)
                );
            } else {
                // @ts-ignore - An argument for 'propertyNames' was not provided.
                this.pConn.getListActions().initDefaultPageInstructions(this.pConn.getReferenceList());
            }
        }
    }

    #buildRows(editableMode, allowDelete, allowRowDeleteExpression, allowEdit, allowRowEditExpression) {
        const context = this.pConn.getContextName();
        const newEditableRows = [];
        this.referenceList.forEach((element, rowIndex) => {
            const showDeleteButton = editableMode && allowDelete && evaluateAllowRowAction(allowRowDeleteExpression, element);
            const showEditButton = editableMode && allowEdit && evaluateAllowRowAction(allowRowEditExpression, element) && this.allowEditingInModal;

            const editableRow = this.editableRows[rowIndex];
            const newEditableCells = [];
            this.rawFields?.forEach((item, cellIndex) => {
                if (!item?.config?.hide) {
                    item = {
                        ...item,
                        config: {
                            ...item.config,
                            label: '',
                            displayMode: this.readOnlyMode || this.allowEditingInModal ? 'DISPLAY_ONLY' : undefined
                        }
                    };
                    const referenceListData = getReferenceList(this.pConn);
                    const isDatapage = referenceListData.startsWith('D_');
                    const pageReferenceValue = isDatapage
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
                    const newComponent = this.componentsManager.upsert(oldComponent, cellPConn.meta.type, [cellPConn]);
                    newEditableCells.push({ component: newComponent })
                }
            });
            newEditableRows.push({
                cells: newEditableCells,
                showEditButton: showEditButton,
                showDeleteButton: showDeleteButton
            });
        });
        this.editableRows = newEditableRows;
        this.props.rows = newEditableRows.map((row) => {
            return {
                cellComponentIds: row.cells.map((cell) => cell.component.compId),
                showEditButton: row.showEditButton,
                showDeleteButton: row.showDeleteButton
            }
        });
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
}

