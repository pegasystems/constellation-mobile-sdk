import { getListContextResponse } from "./listViewHelpers.js";
import { BaseComponent } from "../../../base.component.js";

const SELECTION_MODE = { SINGLE: "single", MULTI: "multi" };
const TAG = "[ListViewComponent]";

export class ListViewComponent extends BaseComponent {
    bInForm$ = true;
    payload;
    fields$;
    displayedColumns$ = [];
    displayedColumnsLabels$ = [];
    configProps$;
    selectionMode;
    singleSelectionMode;
    multiSelectionMode;
    rowID;
    listViewItems;
    compositeKeys;
    showDynamicFields;
    filterPayload;
    ref = {};
    cosmosTableRef;
    listContext = {};
    query = null;
    paging;
    fieldDefs;
    label = "";
    componentValue;
    contextPage;

    props = {
        label: "",
        selectionMode: "",
        selectedItemIndex: "",
        columnNames: [],
        items: {},
    };

    constructor(componentsManager, pConn, payload) {
        super(componentsManager, pConn);
        this.type = "ListView";
        this.payload = payload;
    }

    init() {
        this.componentsManager.onComponentAdded(this);
        this.#updateSelf();
    }

    destroy() {
        super.destroy();
        this.componentsManager.onComponentRemoved(this);
    }

    update(pConn, payload) {
        const pConnChanged = this.pConn !== pConn;
        if (!pConnChanged && this.payload === payload) {
            return;
        }
        this.pConn = pConn;

        const shouldReloadData = this.#shouldReloadData(this.payload, payload) || pConnChanged;
        this.payload = payload;

        this.#updateSelf(shouldReloadData);
    }

    onEvent(event) {
        if (event.type === "ClickItem") {
            const clickedItemIndex = Number(event.componentData.clickedItemIndex);
            const isSelected = event.componentData.isSelected === "true";
            this.#fieldOnChange(clickedItemIndex, isSelected);
        } else {
            console.log(TAG, `onEvent received unsupported event type ${event.type}`);
        }
    }

    #shouldReloadData(oldPayload, newPayload) {
        const filterPayload = (payload) => {
            // Fields to exclude from comparison (they contain selection values, not data config).
            const { value, selectionKey, contextPage, primaryField, ...rest } = payload;
            return rest;
        };
        return JSON.stringify(filterPayload(oldPayload)) !== JSON.stringify(filterPayload(newPayload));
    }

    #fieldOnChange(clickedItemIndex, isSelected) {
        if (!this.listViewItems || clickedItemIndex < 0 || clickedItemIndex >= this.listViewItems.length) {
            console.warn(TAG, "Unexpected state when updating selected item index");
            return;
        }

        const selectedObject = {};
        if (this.compositeKeys?.length > 1) {
            const selectedRow = this.listViewItems[clickedItemIndex];
            this.compositeKeys.forEach((compositeKey) => {
                selectedObject[compositeKey] = selectedRow[compositeKey];
            });
        } else {
            selectedObject[this.rowID] = this.listViewItems[clickedItemIndex][this.rowID];
        }
        // When $selected is initialised, core-js treats the component as multi-select (not single-select)
        if (this.multiSelectionMode) {
            selectedObject.$selected = isSelected;
        }
        this.pConn?.getListActions?.()?.setSelectedRows([selectedObject]);
    }

    #updateSelf(shouldReloadData = true) {
        this.configProps$ = this.pConn.getConfigProps();

        // By default, pyGUID is used for Data classes and pyID is for Work classes as row-id/key
        const defaultRowID = this.configProps$?.referenceType === "Case" ? "pyID" : "pyGUID";
        this.compositeKeys = this.configProps$?.compositeKeys ?? this.payload.compositeKeys;
        console.debug(TAG, `Using compositeKeys: ${JSON.stringify(this.compositeKeys)}`);

        this.rowID = this.compositeKeys && this.compositeKeys?.length === 1 ? this.compositeKeys[0] : defaultRowID;
        console.debug(TAG, `Using rowID: ${this.rowID}`);

        this.componentValue = this.configProps$?.value;
        this.contextPage = this.configProps$?.contextPage;

        this.showDynamicFields = this.configProps$?.showDynamicFields;
        this.selectionMode = this.configProps$.selectionMode;

        let title = this.configProps$?.title || this.configProps$?.label || "List";
        const inheritedProps = this.configProps$?.inheritedProps;

        if (title === "List" && inheritedProps) {
            for (const inheritedProp of inheritedProps) {
                if (inheritedProp?.prop === "label") {
                    title = inheritedProp?.value;
                    break;
                }
            }
        }

        this.label = title;

        if (!shouldReloadData) {
            this.#updateSelection();
            this.#sendPropsUpdate();
            return;
        }

        console.log(TAG, `ListView update requires data reload.`);

        if (!this.configProps$) {
            console.warn(TAG, `No config props found for ListView component.`);
            return;
        }

        if (!this.payload) {
            this.payload = { referenceList: this.configProps$.referenceList };
        }
        getListContextResponse({
            pConn: this.pConn,
            bInForm$: this.bInForm$,
            ...this.payload,
            listContext: this.listContext,
            ref: this.ref,
            showDynamicFields: this.showDynamicFields,
            cosmosTableRef: this.cosmosTableRef,
            selectionMode: this.selectionMode,
        }).then((response) => {
            this.listContext = response;
            this.#getListData(() => {
                this.#updateSelection();
                this.#sendPropsUpdate();
            });
        });
    }

    #updateSelection() {
        if (this.singleSelectionMode) {
            this.#updateSelectedItemSingle();
        } else if (this.multiSelectionMode) {
            this.#updateSelectedItemsMulti();
        }
    }

    #updateSelectedItemSingle() {
        if (this.compositeKeys && this.compositeKeys.length > 1) {
            this.#updateSelectedSingleItemForCompositeKeys();
        } else {
            this.#updateSelectedSingleItemForSingleKey();
        }
    }

    #updateSelectedItemsMulti() {
        if (this.compositeKeys && this.compositeKeys.length > 1) {
            this.#updateSelectedItemsMultiForCompositeKeys();
        } else {
            this.#updateSelectedItemsMultiForSingleKey();
        }
    }


    #updateSelectedItemsMultiForCompositeKeys() {
        if (!this.listViewItems?.length) return;
        const selectedCompositeIds = this.configProps$?.readonlyContextList || [];
        this.listViewItems.forEach((item) => {
            item.selected = selectedCompositeIds.some((context) => {
                return this.compositeKeys.every((key) => {
                    const left = item[key];
                    const right = context[key];
                    return left != null && right != null && left === right;
                });
            });
        });
    }

    #updateSelectedItemsMultiForSingleKey() {
        const selectedIds = new Set(
            this.configProps$.readonlyContextList
                .map(element => element[this.rowID])
                .filter(id => id !== "" && id != null)
        );
        this.listViewItems.forEach((item) => {
            item.selected = selectedIds.has(item[this.rowID]);
        });
    }

    #updateSelectedSingleItemForCompositeKeys() {
        if (!this.listViewItems?.length) return;
        this.listViewItems.forEach((item) => {
            item.selected = this.compositeKeys.every((key) => {
                const left = item[key];
                const right = this.contextPage?.[key];
                return left != null && right != null && left === right;
            });
        });
    }

    #updateSelectedSingleItemForSingleKey() {
        if (!this.listViewItems || this.listViewItems.length === 0) {
            return;
        }
        this.listViewItems.forEach((item) => {
            const left = item[this.rowID];
            const right = this.componentValue;
            item.selected = left != null && right != null && left === right;
        });
    }

    #sendPropsUpdate() {
        this.props = {
            label: this.label,
            selectionMode: this.selectionMode,
            columnNames: this.displayedColumns$,
            columnLabels: this.displayedColumnsLabels$,
            items: this.listViewItems,
        };
        this.componentsManager.onComponentPropsUpdate(this);
    }

    #getFieldsMetadata(refList) {
        return PCore.getAnalyticsUtils().getDataViewMetadata(refList, this.showDynamicFields);
    }

    #getListData(onDataCollected) {
        const componentConfig = this.pConn.getComponentConfig();
        if (this.configProps$) {
            this.#preparePayload();
            const refList = this.configProps$.referenceList;
            const fieldsMetaDataPromise = this.#getFieldsMetadata(refList);
            // returns a promise
            const payload = this.payload || this.filterPayload || {};
            const dataViewParameters = this.payload.parameters;

            const workListDataPromise = !this.bInForm$
                ? PCore.getDataApiUtils().getData(refList, payload)
                : PCore.getDataPageUtils().getDataAsync(
                    refList,
                    this.pConn.getContextName(),
                    payload.dataViewParameters ? payload.dataViewParameters : dataViewParameters,
                    this.paging,
                    this.query
                );

            Promise.all([fieldsMetaDataPromise, workListDataPromise])
                .then(([fieldsMetaData, workListData]) => {
                    this.fields$ = this.configProps$.presets[0].children[0].children;
                    // this is an unresovled version of this.fields$, need unresolved, so can get the property reference
                    const columnFields = componentConfig.presets[0].children[0].children;

                    const tableDataResults = !this.bInForm$ ? workListData.data.data : workListData.data;

                    const columns = this.#getHeaderCells(columnFields, this.fieldDefs);
                    this.fields$ = this.#updateFields(this.fields$, fieldsMetaData.data.fields, columns);
                    this.displayedColumns$ = columns.map((c) => c.id);
                    this.displayedColumnsLabels$ = columns.map((c) => c.label);
                    this.listViewItems = tableDataResults;

                    // disabling parsing for now parsing data according to field types like date/date-time/currency
                    // this.updatedRefList = this.updateData(tableDataResults, this.fields$);
                    if (this.selectionMode === SELECTION_MODE.SINGLE && tableDataResults?.length > 0) {
                        this.singleSelectionMode = true;
                    } else if (this.selectionMode === SELECTION_MODE.MULTI && tableDataResults?.length > 0) {
                        this.multiSelectionMode = true;
                    }
                    onDataCollected();
                })
                .catch((e) => {
                    console.error(`Couldn't fetch either the fieldsMetaData or workListData: ${e}`);
                    // this.psService.sendMessage(false);
                });
        }
    }

    #preparePayload() {
        const { fieldDefs, itemKey, patchQueryFields } = this.listContext.meta;
        this.fieldDefs = fieldDefs;
        let listFields = fieldDefs
            ? this.#buildSelect(fieldDefs, undefined, patchQueryFields, this.payload?.compositeKeys)
            : [];
        listFields = this.#addItemKeyInSelect(fieldDefs, itemKey, listFields, this.payload?.compositeKeys);
        if (this.payload.query) {
            this.query = this.payload.query;
        } else if (listFields?.length && this.listContext.meta.isQueryable) {
            if (this.filterPayload) {
                this.query = {
                    select: listFields,
                    filter: this.filterPayload?.query?.filter,
                };
            } else {
                this.query = { select: listFields };
            }
        } else if (this.filterPayload) {
            this.query = this.filterPayload?.query;
        }
    }

    #updateFields(arFields, arColumns, fields) {
        const arReturn = arFields;
        arReturn.forEach((field, i) => {
            field.config = { ...field.config, ...fields[i], name: fields[i].id };
        });
        return arReturn;
    }

    #getHeaderCells(colFields, fields) {
        const AssignDashObjects = ["Assign-Worklist", "Assign-WorkBasket"];
        return colFields.map((field, index) => {
            let theField = field.config.value.substring(field.config.value.indexOf(" ") + 1);
            if (theField.indexOf(".") === 0) {
                theField = theField.substring(1);
            }
            const colIndex = fields.findIndex((ele) => ele.name === theField);
            const displayAsLink = field.config.displayAsLink;
            const headerRow = {};
            headerRow.id = fields[index].id;
            headerRow.type = field.type;
            headerRow.displayAsLink = displayAsLink;
            headerRow.numeric =
                field.type === "Decimal" ||
                field.type === "Integer" ||
                field.type === "Percentage" ||
                field.type === "Currency" ||
                false;
            headerRow.disablePadding = false;
            headerRow.label = fields[index].label;
            if (colIndex > -1) {
                headerRow.classID = fields[colIndex].classID;
            }
            if (displayAsLink) {
                headerRow.isAssignmentLink = AssignDashObjects.includes(headerRow.classID);
                if (field.config.value?.startsWith("@CA")) {
                    headerRow.isAssociation = true;
                }
            }
            return headerRow;
        });
    }

    #buildSelect(fieldDefs, colId, patchQueryFields = [], compositeKeys = []) {
        const listFields = [];
        if (colId) {
            const field = this.#getField(fieldDefs, colId);
            listFields.push({
                field: field.name,
            });
        } else {
            // NOTE: If we ever decide to not set up all the `fieldDefs` on select, ensure that the fields
            //  corresponding to `state.groups` are set up. Needed in Client-mode grouping/pagination.
            fieldDefs.forEach((field) => {
                if (!listFields.find((f) => f.field === field.name)) {
                    listFields.push({
                        field: field.name,
                    });
                }
            });
            this.#addToListFieldIfMissing(listFields, patchQueryFields);
        }
        this.#addToListFieldIfMissing(listFields, compositeKeys);
        return listFields;
    }

    #addToListFieldIfMissing(listFields, keys) {
        keys.forEach((k) => {
            if (!listFields.find((f) => f.field === k)) {
                listFields.push({ field: k });
            }
        });
    }

    #getField(fieldDefs, columnId) {
        const fieldsMap = this.#getFieldsMap(fieldDefs);
        return fieldsMap.get(columnId);
    }

    #getFieldsMap(fieldDefs) {
        return new Map(fieldDefs.map((elem) => [elem.id, elem]));
    }

    #addItemKeyInSelect(fieldDefs, itemKey, select, compositeKeys) {
        const elementFound = this.#getField(fieldDefs, itemKey);

        if (
            itemKey &&
            !elementFound &&
            Array.isArray(select) &&
            !(compositeKeys !== null && compositeKeys?.length) &&
            !select.find((sel) => sel.field === itemKey)
        ) {
            return [
                ...select,
                {
                    field: itemKey,
                },
            ];
        }
        return select;
    }
}
