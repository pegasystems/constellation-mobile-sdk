import { init } from './listViewHelpers.js';
import { BaseComponent } from '../../../base.component.js';

const SELECTION_MODE = { SINGLE: 'single', MULTI: 'multi' };
const TAG = '[ListViewComponent]';


export class ListViewComponent extends BaseComponent {
  bInForm$ = true;
  payload;

  // repeatList$;
  fields$;

  displayedColumns$= [];
  // groupByColumns$: string[] = [];

  configProps$;

  updatedRefList;

  // repeatListData = [];

  // searchIcon$: string;
  //
  // bShowSearch$ = false;
  // bColumnReorder$ = false;
  // bGrouping$ = false;

  // perfFilter;
  // searchFilter: string;
  //
  // menuSvgIcon$: string;
  // arrowSvgIcon$ = '';
  // arrowDownSvgIcon$: string;
  // arrowUpSvgIcon$: string;
  //
  // filterSvgIcon$: string;
  // filterOnSvgIcon$: string;
  // groupBySvgIcon$: string;

  // compareType;
  // compareRef;
  // arrowDirection = 'down';
  //
  // filterByColumns = [];
  // bShowFilterPopover$ = false;
  // bContains$ = true;
  // bDateTime$ = false;
  //
  // filterContainsLabel$ = '';
  // filterContainsType$ = 'contains';
  // filterContainsValue$;
  //
  // bIsDate$ = false;
  // bIsDateTime$ = false;
  // bIsTime$ = false;
  //
  // currentFilterRefData;
  // currentFilterImageEl;

  // arFilterMainButtons$ = [];
  // arFilterSecondaryButtons$ = [];
  selectionMode;
  singleSelectionMode; // boolean
  multiSelectionMode; // boolean
  rowID;
  response;
  compositeKeys;
  showDynamicFields;
  // filters= {};
  // selectParam = [];
  filterPayload;
  ref = {}; // probably unused
  cosmosTableRef; // probably umused
  listContext = {};
  query = null;
  paging; // probably unused
  fieldDefs;
  checkBoxValue;
  label = '';

  props = {
    label: '',
    selectionMode: '',
    selectedItemId: '',
    columnNames: [],
    items: {},
  };

  constructor(componentsManager, pConn, payload) {
    super(componentsManager, pConn);
    this.type = "ListView";
    this.payload = payload
  }

  init() {
    this.componentsManager.onComponentAdded(this);
    this.updateSelf()
  }

  destroy() {
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.updateSelf();
    }
  }

  onEvent(event) {
    if (event.type === 'SelectSingleItem') {
      this.fieldOnChange(event.componentData.idValue);
    } else {
      console.log(TAG, `onEvent received unsupported event type ${event.type}`);
    }

  }

  updateSelf() {
    this.configProps$ = this.pConn.getConfigProps();
    /** By default, pyGUID is used for Data classes and pyID is for Work classes as row-id/key */
    const defRowID = this.configProps$?.referenceType === 'Case' ? 'pyID' : 'pyGUID';
    /** If compositeKeys is defined, use dynamic value, else fallback to pyID or pyGUID. */
    this.compositeKeys = this.configProps$?.compositeKeys ?? this.payload.compositeKeys;
    this.rowID = this.compositeKeys && this.compositeKeys?.length === 1 ? this.compositeKeys[0] : defRowID;
    // this.bShowSearch$ = this.utils.getBooleanValue(this.configProps$?.globalSearch ? this.configProps$.globalSearch : this.payload?.globalSearch);
    // this.bColumnReorder$ = this.utils.getBooleanValue(this.configProps$.reorderFields);
    // this.bGrouping$ = this.utils.getBooleanValue(this.configProps$.grouping);
    this.showDynamicFields = this.configProps$?.showDynamicFields;

    // this.menuSvgIcon$ = this.utils.getImageSrc('more', this.utils.getSDKStaticContentUrl());
    // this.arrowDownSvgIcon$ = this.utils.getImageSrc('arrow-down', this.utils.getSDKStaticContentUrl());
    // this.arrowUpSvgIcon$ = this.utils.getImageSrc('arrow-up', this.utils.getSDKStaticContentUrl());

    // this.filterSvgIcon$ = this.utils.getImageSrc('filter', this.utils.getSDKStaticContentUrl());
    // this.filterOnSvgIcon$ = this.utils.getImageSrc('filter-on', this.utils.getSDKStaticContentUrl());
    // this.groupBySvgIcon$ = this.utils.getImageSrc('row', this.utils.getSDKStaticContentUrl());

    this.selectionMode = this.configProps$.selectionMode;

    this.checkBoxValue = this.configProps$.value;

    // this.arFilterMainButtons$.push({ actionID: 'submit', jsAction: 'submit', name: 'Submit' });
    // this.arFilterSecondaryButtons$.push({ actionID: 'cancel', jsAction: 'cancel', name: 'Cancel' });

    let title = this.configProps$?.title || this.configProps$?.label || 'List';
    const inheritedProps = this.configProps$?.inheritedProps;
    if (title === 'List' && inheritedProps) {
      for (const inheritedProp of inheritedProps) {
        if (inheritedProp?.prop === 'label') {
          title = inheritedProp?.value;
          break;
        }
      }
    }
    this.label = title;
    // this.searchIcon$ = this.utils.getImageSrc('search', this.utils.getSDKStaticContentUrl());
    // setTimeout(() => {
    //   PCore.getPubSubUtils().subscribe(
    //     PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CHANGE,
    //     data => {
    //       this.processFilterChange(data);
    //     },
    //     `dashboard-component-${'id'}`,
    //     false,
    //     this.pConn.getContextName()
    //   );
    //   PCore.getPubSubUtils().subscribe(
    //     PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CLEAR_ALL,
    //     () => {
    //       this.filters = {};
    //       this.processFilterClear();
    //     },
    //     `dashboard-component-${'id'}`,
    //     false,
    //     this.pConn.getContextName()
    //   );
    // }, 0);
    if (this.configProps$) {
      if (!this.payload) {
        this.payload = { referenceList: this.configProps$.referenceList };
      }
      init({
        pConn: this.pConn,
        bInForm$: this.bInForm$,
        ...this.payload,
        listContext: this.listContext,
        ref: this.ref,
        showDynamicFields: this.showDynamicFields,
        cosmosTableRef: this.cosmosTableRef,
        selectionMode: this.selectionMode
      }).then(response => {
        this.listContext = response;
        this.getListData(() => {
          this.sendPropsUpdate()
        });
      });
    }
  }

  sendPropsUpdate() {
    this.props = {
      label: this.label,
      selectionMode: this.selectionMode,
      selectedItemId: { idName: this.rowID, idValue: this.checkBoxValue},
      columnNames: this.displayedColumns$,
      items: this.response
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  // getFieldFromFilter(filter, dateRange = false) {
  //   let fieldValue;
  //   if (dateRange) {
  //     fieldValue = filter?.AND[0]?.condition.lhs.field;
  //   } else {
  //     fieldValue = filter?.condition.lhs.field;
  //   }
  //   return fieldValue;
  // }

  // // Will be triggered when EVENT_DASHBOARD_FILTER_CHANGE fires
  // processFilterChange(data) {
  //   const { filterId, filterExpression } = data;
  //   let dashboardFilterPayload= {
  //     query: {
  //       filter: {},
  //       select: []
  //     }
  //   };
  //
  //   this.filters[filterId] = filterExpression;
  //   let isDateRange = !!data.filterExpression?.AND;
  //   // Will be AND by default but making it dynamic in case we support dynamic relational ops in future
  //   const relationalOp = 'AND';
  //
  //   let field = this.getFieldFromFilter(filterExpression, isDateRange);
  //   const selectParam = [];
  //   // Constructing the select parameters list (will be sent in dashboardFilterPayload)
  //   this.displayedColumns$?.forEach(col => {
  //     selectParam.push({
  //       field: col
  //     });
  //   });
  //
  //   // Checking if the triggered filter is applicable for this list
  //   if (data.filterExpression !== null && !(this.displayedColumns$?.length && this.displayedColumns$?.includes(field))) {
  //     return;
  //   }
  //   // This is a flag which will be used to reset dashboardFilterPayload in case we don't find any valid filters
  //   let validFilter = false;
  //
  //   let index = 1;
  //   // Iterating over the current filters list to create filter data which will be POSTed
  //   const filterKeys = Object.keys(this.filters);
  //   const filterValues = Object.values(this.filters);
  //   for (let filterIndex = 0; filterIndex < filterKeys.length; filterIndex++) {
  //     const filter = filterValues[filterIndex];
  //     // If the filter is null then we can skip this iteration
  //     if (filter === null) {
  //       // eslint-disable-next-line no-continue
  //       continue;
  //     }
  //
  //     // Checking if the filter is of type- Date Range
  //     isDateRange = !!filter?.AND;
  //     field = this.getFieldFromFilter(filter, isDateRange);
  //
  //     if (!(this.displayedColumns$?.length && this.displayedColumns$?.includes(field))) {
  //       // eslint-disable-next-line no-continue
  //       continue;
  //     }
  //     // If we reach here that implies we've at least one valid filter, hence setting the flag
  //     validFilter = true;
  //     /** Below are the 2 cases for- Text & Date-Range filter types where we'll construct filter data which will be sent in the dashboardFilterPayload
  //      * In Constellation DX Components, through Repeating Structures they might be using several APIs to do it. We're doing it here
  //      */
  //     if (isDateRange) {
  //       dashboardFilterPayload = this.filterBasedOnDateRange(dashboardFilterPayload, filter, relationalOp, selectParam, index);
  //     } else {
  //       dashboardFilterPayload.query.filter.filterConditions = {
  //         ...dashboardFilterPayload.query.filter.filterConditions,
  //         [`T${index++}`]: { ...filter.condition, ignoreCase: true }
  //       };
  //
  //       if (dashboardFilterPayload.query.filter.logic) {
  //         dashboardFilterPayload.query.filter.logic = `${dashboardFilterPayload.query.filter.logic} ${relationalOp} T${index - 1}`;
  //       } else {
  //         dashboardFilterPayload.query.filter.logic = `T${index - 1}`;
  //       }
  //
  //       dashboardFilterPayload.query.select = selectParam;
  //     }
  //   }
  //
  //   // Reset the dashboardFilterPayload if we end up with no valid filters for the list
  //   if (!validFilter) {
  //     dashboardFilterPayload = undefined;
  //   }
  //   this.filterPayload = dashboardFilterPayload;
  //   this.getListData();
  // }

  // filterBasedOnDateRange(dashboardFilterPayload, filter, relationalOp, selectParam, index) {
  //   const dateRelationalOp = filter?.AND ? 'AND' : 'OR';
  //   dashboardFilterPayload.query.filter.filterConditions = {
  //     ...dashboardFilterPayload.query.filter.filterConditions,
  //     [`T${index++}`]: { ...filter[relationalOp][0].condition },
  //     [`T${index++}`]: { ...filter[relationalOp][1].condition }
  //   };
  //   if (dashboardFilterPayload.query.filter.logic) {
  //     dashboardFilterPayload.query.filter.logic = `${dashboardFilterPayload.query.filter.logic} ${relationalOp} (T${index - 2} ${dateRelationalOp} T${
  //       index - 1
  //     })`;
  //   } else {
  //     dashboardFilterPayload.query.filter.logic = `(T${index - 2} ${relationalOp} T${index - 1})`;
  //   }
  //
  //   dashboardFilterPayload.query.select = selectParam;
  //
  //   return dashboardFilterPayload;
  // }

  // processFilterClear() {
  //   this.filterPayload = undefined;
  //   this.getListData();
  // }

  getFieldsMetadata(refList) {
    // @ts-ignore - 3rd parameter "associationFilter" should be optional for getDataViewMetadata method
    return PCore.getAnalyticsUtils().getDataViewMetadata(refList, this.showDynamicFields);
  }

  getListData(onDataCollected) {
    const componentConfig = this.pConn.getComponentConfig();
    if (this.configProps$) {
      this.preparePayload();
      const refList = this.configProps$.referenceList;
      const fieldsMetaDataPromise = this.getFieldsMetadata(refList);
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

      // this.bShowFilterPopover$ = false;

      // this.psService.sendMessage(true);

      Promise.all([fieldsMetaDataPromise, workListDataPromise])
        .then((results) => {
          const fieldsMetaData = results[0];
          const workListData = results[1];

          this.fields$ = this.configProps$.presets[0].children[0].children;
          // this is an unresovled version of this.fields$, need unresolved, so can get the property reference
          const columnFields = componentConfig.presets[0].children[0].children;

          const tableDataResults = !this.bInForm$ ? workListData.data.data : workListData.data;

          const columns = this.getHeaderCells(columnFields, this.fieldDefs);
          this.fields$ = this.updateFields(this.fields$, fieldsMetaData.data.fields, columns);
          this.displayedColumns$ = columns.map(col => {
            return col.id;
          });
          this.response = tableDataResults;
          // this.updatedRefList = this.updateData(tableDataResults, this.fields$); // disabling parsing for now parsing data according to field types like date/date-time/currency
          if (this.selectionMode === SELECTION_MODE.SINGLE && tableDataResults?.length > 0) {
            this.singleSelectionMode = true;
          } else if (this.selectionMode === SELECTION_MODE.MULTI && tableDataResults?.length > 0) {
            this.multiSelectionMode = true;
          }
          onDataCollected()
          // this.repeatList$ = new MatTableDataSource(this.updatedRefList);
          // this.repeatList$.filterPredicate = this.customFilterPredicate.bind(this);

          // keeping an original copy to get back after possible sorts, filters and groupBy
          // this.repeatListData = this.repeatList$.data.slice();

          // this.repeatList$.paginator = this.paginator;
          // this.repeatList$.sort = this.sort;
          // this.psService.sendMessage(false);
        })
        .catch((e) => {
          console.error(`Couldn't fetch either the fieldsMetaData or workListData: ${e}`);
          // this.psService.sendMessage(false);
        });
    }
  }

  preparePayload() {
    const { fieldDefs, itemKey, patchQueryFields } = this.listContext.meta;
    this.fieldDefs = fieldDefs;
    let listFields = fieldDefs ? this.buildSelect(fieldDefs, undefined, patchQueryFields, this.payload?.compositeKeys) : [];
    listFields = this.addItemKeyInSelect(fieldDefs, itemKey, listFields, this.payload?.compositeKeys);
    if (this.payload.query) {
      this.query = this.payload.query;
    } else if (listFields?.length && this.listContext.meta.isQueryable) {
      if (this.filterPayload) {
        this.query = {
          select: listFields,
          filter: this.filterPayload?.query?.filter
        };
      } else {
        this.query = { select: listFields };
      }
    } else if (this.filterPayload) {
      this.query = this.filterPayload?.query;
    }
  }
  // ngOnChanges(changes) {
  //   if (changes && changes.payload) {
  //     const currentPayloadVal = changes.payload?.currentValue;
  //     const previousPayloadVal = changes.payload?.previousValue;
  //     if (currentPayloadVal !== previousPayloadVal) {
  //       this.getListData();
  //     }
  //   }
  // }

  ngOnDestroy() {
    PCore.getPubSubUtils().unsubscribe(
      PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CHANGE,
      `dashboard-component-${'id'}`,
      this.pConn.getContextName()
    );
    PCore.getPubSubUtils().unsubscribe(
      PCore.getConstants().PUB_SUB_EVENTS.EVENT_DASHBOARD_FILTER_CLEAR_ALL,
      `dashboard-component-${'id'}`,
      this.pConn.getContextName()
    );
  }

  // ngAfterViewInit() {
  //   // paginator has to exist for this to work,
  //   // so called after init (paginator drawn)
  //   // Calls are now in workListData promise
  //   // this.repeatList$.paginator = this.paginator;
  //   // this.repeatList$.sort = this.sort;
  // }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.displayedColumns$, event.previousIndex, event.currentIndex);
  // }

  updateFields(arFields, arColumns, fields) {
    const arReturn = arFields;
    arReturn.forEach((field, i) => {
      field.config = { ...field.config, ...fields[i], name: fields[i].id };
    });
    return arReturn;
  }

  // applySearch(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.searchFilter = filterValue.trim().toLowerCase();
  //
  //   if (this.groupByColumns$.length > 0) {
  //     this.repeatList$.data = this.repeatListData.slice();
  //     this.repeatList$.filter = this.searchFilter;
  //     const repeatData = this.repeatList$.sortData(this.repeatList$.filteredData, this.repeatList$.sort as MatSort);
  //     this.repeatList$.data = this.addGroups(repeatData, this.groupByColumns$);
  //
  //     this.perfFilter = performance.now().toString();
  //     this.repeatList$.filter = this.perfFilter;
  //   } else {
  //     this.repeatList$.filter = this.searchFilter;
  //   }
  //
  //   if (this.repeatList$.paginator) {
  //     this.repeatList$.paginator.firstPage();
  //   }
  // }

  // isChecked(rowIn){
  //   const initialVal = false;
  //   return this.configProps$?.readonlyContextList?.reduce((acc, currRow) => {
  //     return acc || rowIn[this.rowID] === currRow[this.rowID];
  //   }, initialVal);
  // }

  fieldOnChange(value) {
    const reqObj = {};
    if (this.compositeKeys?.length > 1) {
      const index = this.response.findIndex(element => element[this.rowID] === value);
      const selectedRow = this.response[index];
      this.compositeKeys.forEach(element => {
        reqObj[element] = selectedRow[element];
      });
    } else {
      reqObj[this.rowID] = value;
    }
    this.checkBoxValue = value;
    this.pConn?.getListActions?.()?.setSelectedRows([reqObj]);
  }

  // for value update in multi select mode
  // onCheckboxClick(row, event) {
  //   const value = row[this.rowID];
  //   const checked = event?.checked;
  //   const reqObj= {};
  //   if (this.compositeKeys?.length > 1) {
  //     const index = this.response.findIndex(element => element[this.rowID] === value);
  //     const selectedRow = this.response[index];
  //     this.compositeKeys.forEach(element => {
  //       reqObj[element] = selectedRow[element];
  //     });
  //     reqObj.$selected = checked;
  //   } else {
  //     reqObj[this.rowID] = value;
  //     reqObj.$selected = checked;
  //   }
  //   this.pConn?.getListActions()?.setSelectedRows([reqObj]);
  // }

  // rowClick(row) {
  //   switch (this.configProps$.rowClickAction) {
  //     case 'openAssignment':
  //       this.psService.sendMessage(true);
  //       this.openAssignment(row);
  //       break;
  //   }
  // }

  // _getIconStyle(level): string {
  //   let sReturn = '';
  //   let nLevel = parseInt(level, 10);
  //   nLevel--;
  //   nLevel *= 15;
  //   sReturn = `padding-left: ${nLevel}px; vertical-align: middle`;
  //
  //   return sReturn;
  // }
  //
  // _getGroupName(fieldName) {
  //   for (let fieldIndex = 0; fieldIndex < this.fields$.length; fieldIndex++) {
  //     const field = this.fields$[fieldIndex];
  //     if (field.config.name == fieldName) {
  //       return field.config.label;
  //     }
  //   }
  //   return '';
  // }

  // _showButton(name, row) {
  //   let bReturn = false;
  //   const { pxRefObjectClass, pzInsKey, pxRefObjectKey } = row;
  //   switch (name) {
  //     case 'pxTaskLabel':
  //       if (pxRefObjectClass != '' && pzInsKey != '') {
  //         bReturn = true;
  //       }
  //       break;
  //     case 'pxRefObjectInsName':
  //       if (pxRefObjectClass != '' && pxRefObjectKey != '') {
  //         bReturn = true;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   return bReturn;
  // }

  // _listViewClick(column, row) {
  //   const name = column.id;
  //   if (column.displayAsLink) {
  //     const { pxObjClass } = row;
  //     let { pzInsKey } = row;
  //     if (column.isAssociation) {
  //       const associationCategory = name.split(':')[0];
  //       pzInsKey = row[`${associationCategory}:pzInsKey`];
  //     }
  //     if (column.isAssignmentLink) {
  //       this.pConn.getActionsApi().openAssignment(pzInsKey, pxObjClass, {
  //         containerName: 'primary',
  //         channelName: ''
  //       } as any);
  //     } else {
  //       this.pConn.getActionsApi().openWorkByHandle(pzInsKey, pxObjClass);
  //     }
  //   } else {
  //     switch (name) {
  //       case 'pxTaskLabel':
  //         this.openAssignment(row);
  //         break;
  //       case 'pxRefObjectInsName':
  //         this.openWork(row);
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }

  // _headerSortClick(event, columnData) {
  //   // images 0 - filter, 1 - arrow, 2 - more
  //
  //   /** Commenting this code for now as it is giving errors not sure if it ever worked */
  //   // let arrowImage = event.srcElement.getElementsByTagName('img')[1];
  //   // let arrowAttr = arrowImage.getAttribute('arrow');
  //
  //   // this.clearOutArrows(event, columnData);
  //
  //   // switch (arrowAttr) {
  //   //   case 'up':
  //   //     arrowImage.src = this.arrowDownSvgIcon$;
  //   //     arrowImage.setAttribute('arrow', 'down');
  //   //     break;
  //   //   case 'down':
  //   //     arrowImage.src = '';
  //   //     arrowImage.setAttribute('arrow', 'none');
  //   //     break;
  //   //   default:
  //   //     arrowImage.src = this.arrowUpSvgIcon$;
  //   //     arrowImage.setAttribute('arrow', 'up');
  //   //     break;
  //   // }
  //
  //   this.compareType = columnData.type;
  //   this.compareRef = columnData.config.name;
  //   // this.arrowDirection = arrowImage.getAttribute('arrow');
  //   this.arrowDirection = this.arrowDirection === 'up' ? 'down' : 'up';
  //
  //   this.filterSortGroupBy();
  // }

  // Commenting below method, since the code which is using it, is already commented
  // clearOutArrows(event, columnData) {
  //   const arImages = event.srcElement.parentElement.getElementsByTagName('img');

  //   for (const theImage of arImages) {
  //     // let theImage = arImages[i]
  //     const arrow = theImage.getAttribute('arrow');
  //     if (arrow) {
  //       const arrowId = theImage.getAttribute('arrowid');
  //       if (arrow != 'none' && arrowId != columnData.config.name) {
  //         theImage.setAttribute('arrow', 'none');
  //         theImage.src = '';
  //       }
  //     }
  //   }
  // }

  // sortCompare(a, b): number {
  //   let aValue = a[this.compareRef];
  //   let bValue = b[this.compareRef];
  //
  //   if (this.compareType == 'Date' || this.compareType == 'DateTime') {
  //     aValue = getSeconds(aValue);
  //     bValue = getSeconds(bValue);
  //   }
  //
  //   if (this.compareRef == 'pxRefObjectInsName') {
  //     const result = this.compareByColumnPxRefObjectInsName(aValue, bValue);
  //     if (result !== undefined) {
  //       return result;
  //     }
  //   }
  //
  //   switch (this.arrowDirection) {
  //     case 'up':
  //       if (!aValue || aValue < bValue) {
  //         return -1;
  //       }
  //       if (!bValue || aValue > bValue) {
  //         return 1;
  //       }
  //       break;
  //     case 'down':
  //       if (!bValue || aValue > bValue) {
  //         return -1;
  //       }
  //       if (!aValue || aValue < bValue) {
  //         return 1;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   return 0;
  // }

  // compareByColumnPxRefObjectInsName(aValue, bValue) {
  //   const prefixX = aValue.split('-');
  //   const prefixY = bValue.split('-');
  //   switch (this.arrowDirection) {
  //     case 'up':
  //       if (prefixX[0] !== prefixY[0]) {
  //         if (prefixX[0] < prefixY[0]) return -1;
  //         if (prefixX[0] > prefixY[0]) return 1;
  //         return 0;
  //       }
  //       return prefixX[1] - prefixY[1];
  //     case 'down':
  //       if (prefixX[0] !== prefixY[0]) {
  //         if (prefixX[0] > prefixY[0]) return -1;
  //         if (prefixX[0] < prefixY[0]) return 1;
  //         return 0;
  //       }
  //       return prefixY[1] - prefixX[1];
  //     default:
  //       break;
  //   }
  //
  //   return undefined;
  // }

  // updateFilterDisplay(type) {
  //   switch (type) {
  //     case 'Date':
  //       this.filterContainsType$ = 'notequal';
  //       this.bContains$ = false;
  //       this.bDateTime$ = true;
  //       this.bIsDate$ = true;
  //       this.bIsDateTime$ = false;
  //       this.bIsTime$ = false;
  //       break;
  //     case 'DateTime':
  //       this.filterContainsType$ = 'notequal';
  //       this.bContains$ = false;
  //       this.bDateTime$ = true;
  //       this.bIsDate$ = false;
  //       this.bIsDateTime$ = true;
  //       this.bIsTime$ = false;
  //       break;
  //     case 'Time':
  //       this.filterContainsType$ = 'notequal';
  //       this.bContains$ = false;
  //       this.bDateTime$ = true;
  //       this.bIsDate$ = false;
  //       this.bIsDateTime$ = false;
  //       this.bIsTime$ = true;
  //       break;
  //     default:
  //       this.filterContainsType$ = 'contains';
  //       this.bContains$ = true;
  //       this.bDateTime$ = false;
  //       this.bIsDate$ = false;
  //       this.bIsDateTime$ = false;
  //       this.bIsTime$ = false;
  //       break;
  //   }
  // }

  // _filter(event, columnData) {
  //   // add clickAway listener
  //   window.addEventListener('mouseup', this._clickAway.bind(this));
  //
  //   this.currentFilterRefData = columnData;
  //   this.filterContainsLabel$ = columnData.config.label;
  //
  //   setTimeout(() => {
  //     this.updateFilterDisplay(columnData.type);
  //
  //     this.updateFilterVarsWithCurrent(columnData);
  //
  //     this.bShowFilterPopover$ = true;
  //   });
  // }

  // _clickAway(event: any) {
  //   let bInPopUp = false;
  //
  //   // run through list of elements in path, if menu not in th path, then want to
  //   // hide (toggle) the menu
  //   const eventPath = event.path;
  //   for (let pathIndex = 0; pathIndex < eventPath.length; pathIndex++) {
  //     if (
  //       eventPath[pathIndex].className == 'psdk-modal-file-top' ||
  //       eventPath[pathIndex].tagName == 'BUTTON' ||
  //       eventPath[pathIndex].tagName == 'MAT-OPTION' ||
  //       eventPath[pathIndex].tagName == 'MAT-INPUT'
  //     ) {
  //       bInPopUp = true;
  //       break;
  //     }
  //   }
  //   if (!bInPopUp) {
  //     // this.bShowFilterPopover$ = false;
  //
  //     window.removeEventListener('mouseup', this._clickAway.bind(this));
  //   }
  // }

  // _filterContainsType(event) {
  //   this.filterContainsType$ = event.value;
  // }
  //
  // _filterContainsValue(event) {
  //   this.filterContainsValue$ = event.target.value;
  // }
  //
  // _filterContainsDateValue(event, value) {
  //   this.filterContainsValue$ = value;
  // }
  //
  // _filterContainsDateTimeValue(event) {
  //   this.filterContainsValue$ = event.target.value;
  // }
  //
  // _filterContainsTimeValue(event) {
  //   this.filterContainsValue$ = event.target.value;
  // }

  // _onFilterActionButtonClick(event: any) {
  //   // modal buttons
  //   switch (event.action) {
  //     case 'cancel':
  //       this.currentFilterRefData = [];
  //       break;
  //     case 'submit':
  //       this.updateFilterWithInfo();
  //       this.filterSortGroupBy();
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   this.bShowFilterPopover$ = false;
  //
  //   window.removeEventListener('mouseup', this._clickAway.bind(this));
  // }

  // updateFilterWithInfo() {
  //   let bFound = false;
  //   for (const filterObj of this.filterByColumns) {
  //     if (filterObj.ref === this.currentFilterRefData.config.name) {
  //       filterObj.type = this.currentFilterRefData.type;
  //       filterObj.containsFilter = this.filterContainsType$;
  //       filterObj.containsFilterValue = this.filterContainsValue$;
  //
  //       bFound = true;
  //       break;
  //     }
  //   }
  //
  //   if (!bFound) {
  //     // add in
  //     const filterObj= {};
  //     filterObj.ref = this.currentFilterRefData.config.name;
  //     filterObj.type = this.currentFilterRefData.type;
  //     filterObj.containsFilter = this.filterContainsType$;
  //     filterObj.containsFilterValue = this.filterContainsValue$;
  //
  //     this.filterByColumns.push(filterObj);
  //   }
  //
  //   // iterate through filters and update filterOn icon
  //   for (const filterObj of this.filterByColumns) {
  //     const containsFilterValue = filterObj.containsFilterValue;
  //     const containsFilter = filterObj.containsFilter;
  //     const filterRef = filterObj.ref;
  //     const filterIndex = this.displayedColumns$.indexOf(filterRef);
  //     const arFilterImg = document.getElementsByName('filterOnIcon');
  //     const filterImg= arFilterImg[filterIndex];
  //     if (containsFilterValue == '' && containsFilter != 'null' && containsFilter != 'notnull') {
  //       // clear icon
  //       filterImg.src = '';
  //     } else {
  //       // show icon
  //       filterImg.src = this.filterOnSvgIcon$;
  //     }
  //   }
  // }

  // updateFilterVarsWithCurrent(columnData) {
  //   // find current ref, if exists, move data to variable to display
  //
  //   let bFound = false;
  //   for (const filterObj of this.filterByColumns) {
  //     if (filterObj.ref === this.currentFilterRefData.config.name) {
  //       this.filterContainsType$ = filterObj.containsFilter;
  //       this.filterContainsValue$ = filterObj.containsFilterValue;
  //
  //       bFound = true;
  //       break;
  //     }
  //   }
  //
  //   if (!bFound) {
  //     switch (columnData.type) {
  //       case 'Date':
  //       case 'DateTime':
  //       case 'Time':
  //         this.filterContainsType$ = 'notequal';
  //         break;
  //       default:
  //         this.filterContainsType$ = 'contains';
  //         break;
  //     }
  //
  //     this.filterContainsValue$ = '';
  //   }
  // }
  //
  // filterData(item: any) {
  //   let bKeep = true;
  //   for (const filterObj of this.filterByColumns) {
  //     if (filterObj.containsFilterValue != '' || filterObj.containsFilter == 'null' || filterObj.containsFilter == 'notnull') {
  //       let filterValue: any;
  //
  //       switch (filterObj.type) {
  //         case 'Date':
  //         case 'DateTime':
  //         case 'Time':
  //           bKeep = this.filterDataWithDate(item, filterObj, filterValue);
  //           break;
  //         default:
  //           bKeep = this.filterDataWithCommonTypes(item, filterObj, filterValue);
  //           break;
  //       }
  //     }
  //
  //     // if don't keep stop filtering
  //     if (!bKeep) {
  //       break;
  //     }
  //   }
  //
  //   return bKeep;
  // }

  // filterDataWithDate(item, filterObj, filterValue) {
  //   let bKeep;
  //   let value = item[filterObj.ref] != null || item[filterObj.ref] != '' ? getSeconds(item[filterObj.ref]) : null;
  //   filterValue = filterObj.containsFilterValue != null && filterObj.containsFilterValue != '' ? getSeconds(filterObj.containsFilterValue) : null;
  //
  //   switch (filterObj.containsFilter) {
  //     case 'notequal':
  //       // becasue filterValue is in minutes, need to have a range of less than 60 secons
  //       if (value != null && filterValue != null) {
  //         // get rid of millisecons
  //         value /= 1000;
  //         filterValue /= 1000;
  //
  //         const diff = value - filterValue;
  //         if (diff >= 0 && diff < 60) {
  //           bKeep = false;
  //         }
  //       }
  //       break;
  //     case 'after':
  //       if (value < filterValue) {
  //         bKeep = false;
  //       }
  //       break;
  //     case 'before':
  //       if (value > filterValue) {
  //         bKeep = false;
  //       }
  //       break;
  //     case 'null':
  //       if (value != null) {
  //         bKeep = false;
  //       }
  //       break;
  //     case 'notnull':
  //       if (value == null) {
  //         bKeep = false;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   return bKeep;
  // }
  //
  // filterDataWithCommonTypes(item, filterObj, filterValue) {
  //   let bKeep;
  //   const value = item[filterObj.ref].toLowerCase();
  //   filterValue = filterObj.containsFilterValue.toLowerCase();
  //
  //   switch (filterObj.containsFilter) {
  //     case 'contains':
  //       if (value.indexOf(filterValue) < 0) {
  //         bKeep = false;
  //       }
  //       break;
  //     case 'equals':
  //       if (value != filterValue) {
  //         bKeep = false;
  //       }
  //       break;
  //     case 'startswith':
  //       if (value.indexOf(filterValue) != 0) {
  //         bKeep = false;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //
  //   return bKeep;
  // }

  // filterSortGroupBy() {
  //   // get original data set
  //   let theData = this.repeatListData.slice();
  //
  //   // last filter config data is global
  //   theData = theData.filter(this.filterData.bind(this));
  //
  //   // last sort config data is global
  //   theData.sort(this.sortCompare.bind(this));
  //
  //   const reGroupData = this.addGroups(theData, this.groupByColumns$);
  //
  //   this.repeatList$.data = [];
  //   this.repeatList$.data.push(...reGroupData);
  //
  //   if (this.searchFilter && this.searchFilter != '') {
  //     this.repeatList$.filter = this.searchFilter;
  //   } else {
  //     this.perfFilter = performance.now().toString();
  //     this.repeatList$.filter = this.perfFilter;
  //   }
  //   this.repeatList$.filter = '';
  //
  //   if (this.repeatList$.paginator) {
  //     this.repeatList$.paginator.firstPage();
  //   }
  // }

  //
  // Grouping code inspired by this example
  // https://stackblitz.com/edit/angular-material-table-row-grouping
  //

  // _showUnGroupBy(columnData): boolean {
  //   for (const val of this.groupByColumns$) {
  //     if (val == columnData.config.name) {
  //       return true;
  //     }
  //   }
  //
  //   return false;
  // }
  //
  // _groupBy(event, columnData) {
  //   this.checkGroupByColumn(columnData.config.name, true);
  //
  //   this.filterSortGroupBy();
  // }
  //
  // _unGroupBy(event, columnData) {
  //   // event.stopPropagation();
  //   this.checkGroupByColumn(columnData.config.name, false);
  //
  //   this.filterSortGroupBy();
  // }
  //
  // checkGroupByColumn(field, add) {
  //   let found: number | null = null;
  //   for (const column of this.groupByColumns$) {
  //     if (column === field) {
  //       found = this.groupByColumns$.indexOf(column, 0);
  //     }
  //   }
  //   if (found != null && found >= 0) {
  //     if (!add) {
  //       this.groupByColumns$.splice(found, 1);
  //     }
  //   } else if (add) {
  //     this.groupByColumns$.push(field);
  //   }
  // }

  // addGroups(data, groupByColumns: string[]) {
  //   const rootGroup = new Group();
  //   rootGroup.expanded = true;
  //   return this.getSublevel(data, 0, groupByColumns, rootGroup);
  // }

  // getSublevel(data, level: number, groupByColumns: string[], parent: Group) {
  //   if (level >= groupByColumns.length) {
  //     return data;
  //   }
  //   const groups = this.uniqueBy(
  //     data.map(row => {
  //       const result = new Group();
  //       result.level = level + 1;
  //       result.parent = parent;
  //       for (let i = 0; i <= level; i++) {
  //         result[groupByColumns[i]] = row[groupByColumns[i]];
  //       }
  //       return result;
  //     }),
  //     JSON.stringify
  //   );
  //
  //   const currentColumn = groupByColumns[level];
  //   let subGroups = [];
  //   groups.forEach(group => {
  //     const rowsInGroup = data.filter(row => group[currentColumn] === row[currentColumn]);
  //     group.totalCounts = rowsInGroup.length;
  //     const subGroup = this.getSublevel(rowsInGroup, level + 1, groupByColumns, group);
  //     subGroup.unshift(group);
  //     subGroups = subGroups.concat(subGroup);
  //   });
  //   return subGroups;
  // }

  // uniqueBy(a, key) {
  //   const seen = {};
  //   return a.filter(item => {
  //     const k = key(item);
  //     // eslint-disable-next-line no-return-assign, no-prototype-builtins
  //     return seen.hasOwnProperty(k) ? false : (seen[k] = true);
  //   });
  // }

  // isGroup(index, item): boolean {
  //   return item.level;
  // }

  // _groupHeaderClick(row) {
  //   row.expanded = !row.expanded;
  //   // this.repeatList$.filter = "";
  //   this.perfFilter = performance.now().toString();
  //   this.repeatList$.filter = this.perfFilter;
  // }

  // below is for grid row grouping
  // customFilterPredicate(data| Group, filter: string): boolean {
  //   return data instanceof Group ? data.visible : this.getDataRowVisibleWithFilter(data, filter);
  // }

  // getDataRowVisible(data: any): boolean {
  //   const groupRows = this.repeatList$.data.filter(row => {
  //     if (!(row instanceof Group)) {
  //       return false;
  //     }
  //     let match = true;
  //     this.groupByColumns$.forEach(column => {
  //       if (!row[column] || !data[column] || row[column] !== data[column]) {
  //         match = false;
  //       }
  //     });
  //     return match;
  //   });
  //
  //   if (groupRows.length === 0) {
  //     return true;
  //   }
  //   const parent = groupRows[0] as Group;
  //   return parent.visible && parent.expanded;
  // }

  // getDataRowVisibleWithFilter(data, filter) {
  //   // fist check if row is visible with grouping
  //   let bVisible = this.getDataRowVisible(data);
  //
  //   if (bVisible && filter && filter != '' && filter != this.perfFilter) {
  //     // now check if row is filtered.
  //
  //     // assume not there unless we find it
  //     bVisible = false;
  //     for (const col of this.displayedColumns$) {
  //       // filter is lower case
  //       if (data[col] && data[col].toString().toLowerCase().indexOf(filter) >= 0) {
  //         bVisible = true;
  //         break;
  //       }
  //     }
  //   }
  //
  //   return bVisible;
  // }

  // updateData(listData, fieldData) {
  //   const returnList = [];
  //   listData.forEach(row => {
  //     // copy
  //     const rowData = JSON.parse(JSON.stringify(row));
  //
  //     for (let fieldIndex = 0; fieldIndex < fieldData.length; fieldIndex++) {
  //       const config = fieldData[fieldIndex].config;
  //       let fieldName;
  //       let formattedDate;
  //       let myFormat;
  //       let theCurrencyOptions;
  //
  //       switch (fieldData[fieldIndex].type) {
  //         case 'Date':
  //           fieldName = config.name;
  //           myFormat = config.formatter;
  //           if (!myFormat) {
  //             myFormat = 'Date';
  //           }
  //           formattedDate = this.utils.generateDate(rowData[fieldName], myFormat);
  //
  //           rowData[fieldName] = formattedDate;
  //           break;
  //         case 'DateTime':
  //           fieldName = config.name;
  //           myFormat = config.formatter;
  //           if (!myFormat) {
  //             myFormat = 'DateTime-Long';
  //           }
  //           formattedDate = this.utils.generateDateTime(rowData[fieldName], myFormat);
  //
  //           rowData[fieldName] = formattedDate;
  //           break;
  //         case 'Currency':
  //           fieldName = config.name;
  //           theCurrencyOptions = getCurrencyOptions(PCore.getEnvironmentInfo().getLocale());
  //           // eslint-disable-next-line no-case-declarations
  //           const defaultOptions = {
  //             locale: getLocale(),
  //             position: 'before',
  //             decPlaces: 2
  //           };
  //           // eslint-disable-next-line no-case-declarations
  //           const params = { ...defaultOptions, ...theCurrencyOptions };
  //           rowData[fieldName] = formatters.Currency(rowData[fieldName], params);
  //           // val = format(value, column.type, theCurrencyOptions);
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //     returnList.push(rowData);
  //   });
  //
  //   return returnList;
  // }

  // openAssignment(row) {
  //   const { pxRefObjectClass, pzInsKey } = row;
  //   const sTarget = this.pConn.getContainerName();
  //   const options= { containerName: sTarget };
  //   this.pConn.getActionsApi().openAssignment(pzInsKey, pxRefObjectClass, options);
  // }

  // openWork(row) {
  //   const pxRefObjectClass = row.pxRefObjectClass || row.pxObjClass;
  //   const { pxRefObjectKey } = row;
  //   if (pxRefObjectClass !== '' && pxRefObjectKey !== '') {
  //     this.pConn.getActionsApi().openWorkByHandle(pxRefObjectKey, pxRefObjectClass);
  //   }
  // }
  //
  // initializeData(data) {
  //   data.forEach((item, idx) => {
  //     item.__original_index = idx;
  //     item.__level = 1;
  //   });
  //
  //   return data;
  // }

  // getType(field) {
  //   const { config = {}, type } = field;
  //   const { formatType } = config;
  //   if (formatType === 'datetime' || formatType === 'date') {
  //     // currently cosmos has only support for date ... it also need to support dateTime
  //     return 'date';
  //   }
  //
  //   return type.toLowerCase();
  // }

  // initializeColumns(fields = []) {
  //   return fields.map((field: any, originalColIndex) => ({
  //     ...field,
  //     type: this.getType(field),
  //     name: field.config.value.substring(4),
  //     label: field.config.label.substring(3),
  //     id: originalColIndex,
  //     groupingEnabled: true,
  //     grouped: false,
  //     minWidth: 50,
  //     cellRenderer: this.getType(field) === 'text' ? null : field.type,
  //     filter: true
  //   }));
  // }

  getHeaderCells(colFields, fields) {
    const AssignDashObjects = ['Assign-Worklist', 'Assign-WorkBasket'];
    return colFields.map((field, index) => {
      let theField = field.config.value.substring(field.config.value.indexOf(' ') + 1);
      if (theField.indexOf('.') === 0) {
        theField = theField.substring(1);
      }
      const colIndex = fields.findIndex(ele => ele.name === theField);
      const displayAsLink = field.config.displayAsLink;
      const headerRow= {};
      headerRow.id = fields[index].id;
      headerRow.type = field.type;
      headerRow.displayAsLink = displayAsLink;
      headerRow.numeric = field.type === 'Decimal' || field.type === 'Integer' || field.type === 'Percentage' || field.type === 'Currency' || false;
      headerRow.disablePadding = false;
      headerRow.label = fields[index].label;
      if (colIndex > -1) {
        headerRow.classID = fields[colIndex].classID;
      }
      if (displayAsLink) {
        headerRow.isAssignmentLink = AssignDashObjects.includes(headerRow.classID);
        if (field.config.value?.startsWith('@CA')) {
          headerRow.isAssociation = true;
        }
      }
      return headerRow;
    });
  }

  buildSelect(fieldDefs, colId, patchQueryFields = [], compositeKeys = []) {
    const listFields= [];
    if (colId) {
      const field = this.getField(fieldDefs, colId);
      listFields.push({
        field: field.name
      });
    } else {
      // NOTE: If we ever decide to not set up all the `fieldDefs` on select, ensure that the fields
      //  corresponding to `state.groups` are set up. Needed in Client-mode grouping/pagination.
      fieldDefs.forEach(field => {
        if (!listFields.find(f => f.field === field.name)) {
          listFields.push({
            field: field.name
          });
        }
      });
      patchQueryFields.forEach(k => {
        if (!listFields.find(f => f.field === k)) {
          listFields.push({
            field: k
          });
        }
      });
    }

    compositeKeys.forEach(k => {
      if (!listFields.find(f => f.field === k)) {
        listFields.push({
          field: k
        });
      }
    });
    return listFields;
  }

  // getResultsText() {
  //   const recordsCount = this.repeatList$?.paginator?.length || 0;
  //   return `${recordsCount || 0} result${recordsCount > 1 ? 's' : ''}`;
  // }

  getField(fieldDefs, columnId) {
    const fieldsMap = this.getFieldsMap(fieldDefs);
    return fieldsMap.get(columnId);
  }

  getFieldsMap(fieldDefs) {
    const fieldsMap = new Map();
    fieldDefs.forEach(element => {
      fieldsMap.set(element.id, element);
    });
    return fieldsMap;
  }

  addItemKeyInSelect(fieldDefs, itemKey, select, compositeKeys) {
    const elementFound = this.getField(fieldDefs, itemKey);

    if (
      itemKey &&
      !elementFound &&
      Array.isArray(select) &&
      !(compositeKeys !== null && compositeKeys?.length) &&
      !select.find(sel => sel.field === itemKey)
    ) {
      return [
        ...select,
        {
          field: itemKey
        }
      ];
    }

    return select;
  }
}
