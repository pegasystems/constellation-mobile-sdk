import {BaseComponent} from "../../base.component.js";
import {Utils} from "../../../helpers/utils.js";
import {buildFieldsForTable, getReferenceList} from "./template-utils.js";

export class SimpleTableManualComponent extends BaseComponent {
    jsComponentPConnectData = {};

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
    prevReferenceList = []
    originalData;
    props = {
        visible: true,
        label: "",
        requestedReadOnlyMode: false,
        showAddRowButton: true,
        processedFields: [],
        elementsData: [],
        rowData: []
    }

    constructor(componentsManager, pConn) {
        super(componentsManager, pConn);
        this.type = "SimpleTableManual";
        this.utils = new Utils();
    }

    init() {
        this.isInitialized = true;
        this.componentsManager.onComponentAdded(this);
        this.#updateSelf();
    }

    destroy() {
        // this.childComponent?.destroy?.();
        // this.props.child = undefined;
        // this.componentsManager.onComponentPropsUpdate(this);
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn) {
        if (this.pConn !== pConn) {
            this.pConn = pConn;
        }
        this.#updateSelf();
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
            referenceList = [], // if referenceList not in configProps$, default to empy list
            renderMode,
            children, // destructure children into an array var: "resolvedFields"
            presets,
            allowActions,
            allowTableEdit,
            allowRowDelete,
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
            targetClassLabel
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
        this.props.requestedReadOnlyMode = renderMode === 'ReadOnly';
        this.readOnlyMode = renderMode === 'ReadOnly';
        const editableMode = renderMode === 'Editable';
        const isDisplayModeEnabled = displayMode === 'DISPLAY_ONLY';
        this.showAddRowButton = !this.readOnlyMode && !simpleTableManualProps.hideAddRow;
        this.allowEditingInModal =
            (editMode ? editMode === 'modal' : addAndEditRowsWithin === 'modal') && !(renderMode === 'ReadOnly' || isDisplayModeEnabled);
        const showDeleteButton = editableMode && !simpleTableManualProps.hideDeleteRow //&& evaluateAllowRowAction(allowRowDelete, this.rowData); // TODO: implement
        this.defaultView = editModeConfig ? editModeConfig.defaultView : viewForAddAndEditModal;
        this.bUseSeparateViewForEdit = editModeConfig ? editModeConfig.useSeparateViewForEdit : useSeparateViewForEdit;
        this.editView = editModeConfig ? editModeConfig.editView : viewForEditModal;
        const primaryFieldsViewIndex = resolvedFields.findIndex(field => field.config.value === 'pyPrimaryFields');

        // fieldDefs will be an array where each entry will have a "name" which will be the
        //  "resolved" property name (that we can use as the colId) though it's not really
        //  resolved. The buildFieldsForTable helper just removes the "@P " (which is what
        //  Nebula does). It will also have the "label", and "meta" contains the original,
        //  unchanged config info. For now, much of the info here is carried over from
        //  Nebula and we may not end up using it all.
        // PELCM: metadata for table rows like labels
        this.fieldDefs = buildFieldsForTable(rawFields, this.pConn, showDeleteButton, {
            primaryFieldsViewIndex,
            fields: resolvedFields
        });
        this.fieldDefs = this.fieldDefs?.filter(field => !(field.meta?.config?.hide === true));
        this.#initializeDefaultPageInstructions();

        // Here, we use the "name" field in fieldDefs since that has the assoicated property
        //  (if one exists for the field). If no "name", use "cellRenderer" (typically get DELETE_ICON)
        //  for our columns.
        this.displayedColumns = this.fieldDefs?.map(field => {
            return field.name ? field.name : field.cellRenderer;
        });

        // And now we can process the resolvedFields to add in the "name"
        //  from from the fieldDefs. This "name" is the value that
        //  we'll share to connect things together in the table.

        const labelsMap = this.fieldDefs.reduce((acc, curr) => {
            return {...acc, [curr.name]: curr.label};
        }, {});
        this.props.processedFields = resolvedFields.map((field, i) => {
            field.config.name = this.displayedColumns[i]; // .config["value"].replace(/ ./g,"_");   // replace space dot with underscore
            field.config.label = labelsMap[field.config.name] || field.config.label;
            return field;
        });
        // for adding rows to table when editable and not modal view
        // PELCM: it seems that when table is editable and not in modal then referenceList should be the only source of data
        if (this.prevReferenceList.length !== this.referenceList.length) {
            this.#buildElementsForTable();
        }
        // for edit and adding rows in modal view and to generate readonly list
        if (JSON.stringify(this.prevReferenceList) !== JSON.stringify(this.referenceList) && (this.readOnlyMode || this.allowEditingInModal)) {
            this.#generateRowsData();
        }

        this.prevReferenceList = this.referenceList;

        this.componentsManager.onComponentPropsUpdate(this)
    }

    onEvent(event) {

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

        // removing "caseInfo.content" prefix to avoid setting it as a target while preparing pageInstructions
        // skipping the removal as StateMachine itself is removing this case info prefix while preparing pageInstructions
        // referenceList = pageReferenceForRows.replace(PCore.getConstants().CASE_INFO.CASE_INFO_CONTENT, '');

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

    #buildElementsForTable() {
        const context = this.pConn.getContextName();
        const eleData = [];
        this.referenceList.forEach((element, index) => {
            const data = [];
            this.rawFields?.forEach(item => {
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
                        ? `${referenceListData}[${index}]`
                        : `${this.pConn.getPageReference()}${referenceListData}[${index}]`;
                    const config = {
                        meta: item,
                        options: {
                            context,
                            pageReference: pageReferenceValue,
                            referenceList: referenceListData,
                            hasForm: true
                        }
                    };
                    const view = PCore.createPConnect(config);
                    data.push(view);
                }
            });
            eleData.push(data);
        });
        // PELCM: elements data is source of data for editable non modal table
        this.props.elementsData = eleData; // its array of pConn's but we need to create array of child components
    }

    #generateRowsData() {
        const {dataPageName, referenceList} = this.configProps$;
        const context = this.pConn.getContextName();
        // if dataPageName property value exists then make a datapage fetch call and get the list of data.
        if (dataPageName) {
            this.#getDataPageData(dataPageName, this.parameters, context).then(listData => {
                const data = this.#formatRowsData(listData);
                this.originalData = data;
                // this.rowData = data //TODO: used to be new MatTableDataSource(data);
                this.props.rowData = data
                this.componentsManager.onComponentPropsUpdate(this)
            });
        } else {
            // The referenceList prop has the JSON data for each row to be displayed
            //  in the table. So, iterate over referenceList to create the dataRows that
            //  we're using as the table's dataSource
            const data = this.#formatRowsData(referenceList);
            this.originalData = data;
            // this.rowData = data //TODO: used to be new MatTableDataSource(data);
            // PELCM: data used for readonly or editable in modal table
            this.props.rowData = data
        }
    }

    #getDataPageData(dataPageName, parameters, context) {
        let dataViewParams;
        if (parameters) {
            dataViewParams = {
                dataViewParameters: parameters
            };
        }
        return new Promise((resolve, reject) => {
            (PCore.getDataApiUtils().getData(dataPageName, dataViewParams, context))
                .then((response) => {
                    resolve(response.data.data);
                }).catch(e => {
                if (e) {
                    // check specific error if 401, and wiped out if so stored token is stale.  Fetcch new tokens.
                    reject(e);
                }
            });
        });
    }

    #formatRowsData(data) {
        return data?.map(item => {
            return this.displayedColumns.reduce((dataForRow, colKey) => {
                dataForRow[colKey] = this.#getRowValue(item, colKey);
                return dataForRow;
            }, {});
        });
    }

    // return the value that should be shown as the contents for the given row data
    //  of the given row field
    #getRowValue(inRowData, inColKey) {
        // See what data (if any) we have to display
        const refKeys = inColKey.split('.');
        let valBuilder = inRowData;
        for (const key of refKeys) {
            valBuilder = valBuilder ?? valBuilder[key];
        }
        return valBuilder;
    }
}

