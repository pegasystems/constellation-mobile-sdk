import { Utils } from '../../../helpers/utils.js';
import {getComponentFromMap} from '../../../mappings/sdk-component-map.js';
import { BaseComponent } from '../../base.component.js';

const TAG = '[SimpleTableSelectComponent]';

export class SimpleTableSelectComponent extends BaseComponent {

  jsComponentPConnectData = {};
  childComponent;
  props = {
    child: undefined
  }

  label = '';
  renderMode = '';
  showLabel = true;
  viewName = '';
  parameters = {};
  dataRelationshipContext = '';
  propsToUse;
  showSimpleTableManual;
  isSearchable;
  filters;
  listViewProps;
  pageClass;

  constructor(componentsManager, pConn) {
    super(componentsManager, pConn);
    this.type = "SimpleTableSelect"
    this.utils = new Utils();
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
    this.componentsManager.onComponentAdded(this);
    this.updateSelf();
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.jsComponentPConnectData.unsubscribeFn?.();
      this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.checkAndUpdate);
      this.checkAndUpdate();
    }
  }

  checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.updateSelf();
    }
  }

  updateSelf() {
    const theConfigProps = this.pConn.getConfigProps();
    this.label = theConfigProps.label;
    this.renderMode = theConfigProps.renderMode;
    this.showLabel = theConfigProps.showLabel;
    this.viewName = theConfigProps.viewName;
    this.parameters = theConfigProps.parameters;
    this.dataRelationshipContext = theConfigProps.dataRelationshipContext;

    this.propsToUse = { label: this.label, showLabel: this.showLabel, ...this.pConn.getInheritedProps() };

    if (this.propsToUse.showLabel === false) {
      this.propsToUse.label = '';
    }
    const { MULTI } = PCore.getConstants().LIST_SELECTION_MODE;
    const { selectionMode, selectionList } = this.pConn.getConfigProps();
    const isMultiSelectMode = selectionMode === MULTI;
    if (isMultiSelectMode && this.renderMode === 'ReadOnly') {
      this.showSimpleTableManual = true;
    } else {
      const pageReference = this.pConn.getPageReference();
      let referenceProp = isMultiSelectMode ? selectionList.substring(1) : pageReference.substring(pageReference.lastIndexOf('.') + 1);
      // Replace here to use the context name instead
      let contextPageReference = null;
      if (this.dataRelationshipContext !== null && selectionMode === 'single') {
        referenceProp = this.dataRelationshipContext;
        contextPageReference = pageReference.concat('.').concat(referenceProp);
      }
      const metadata = isMultiSelectMode
        ? this.pConn.getFieldMetadata(`@P .${referenceProp}`)
        : this.pConn.getCurrentPageFieldMetadata(contextPageReference);

      const { datasource: { parameters: fieldParameters = {} } = {}, pageClass } = metadata;

      this.pageClass = pageClass;
      const compositeKeys= [];
      Object.values(fieldParameters).forEach((param) => {
        if (this.isSelfReferencedProperty(param, referenceProp)) {
          compositeKeys.push(param.substring(param.lastIndexOf('.') + 1));
        }
      });
      this.processFilters(theConfigProps, compositeKeys);
    }
    this.createChildComponent();
    this.sendPropsUpdate();
  }


  onEvent(event) {
    // TODO: remove optional call when other modes are implemented so that child component is always defined
    this.childComponent?.onEvent(event)
  }

  sendPropsUpdate() {
    this.props = {
      child: this.childComponent.compId
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  createChildComponent() {
    let childComponentType;
    let propsToPass = [];
    if (this.showSimpleTableManual) {
      childComponentType = 'SimpleTable';
    } else if (this.isSearchable) {
      childComponentType = 'PromotedFilters';
      propsToPass = [this.viewName, this.filters, this.listViewProps, this.pageClass, this.parameters];
    } else {
      childComponentType = 'ListView';
      propsToPass = [this.listViewProps];
    }
    if (this.childComponent === undefined) {
      const childClass = getComponentFromMap(childComponentType);
      let childInstance;
      if (childClass.name === 'UnsupportedComponent') {
        // passing explicit component type because pConn's type 'SimpleTableSelect'
        childInstance = new childClass(this.componentsManager, this.pConn, childComponentType);
      } else {
        childInstance = new childClass(this.componentsManager, this.pConn, ...propsToPass);
      }
      childInstance.init();
      this.childComponent = childInstance;
    } else {
      this.childComponent.update(this.pConn, ...propsToPass)
    }
  }

  isSelfReferencedProperty(param, referenceProp) {
    const [, parentPropName] = param.split('.');
    return parentPropName === referenceProp;
  }

  processFilters(theConfigProps, compositeKeys) {
    const defaultRowHeight = '2';

    const additionalTableConfig = {
      rowDensity: false,
      enableFreezeColumns: false,
      autoSizeColumns: false,
      resetColumnWidths: false,
      defaultFieldDef: {
        showMenu: false,
        noContextMenu: true,
        grouping: false
      },
      itemKey: '$key',
      defaultRowHeight
    };

    this.listViewProps = {
      ...theConfigProps,
      title: this.propsToUse.label,
      personalization: false,
      grouping: false,
      expandGroups: false,
      reorderFields: false,
      showHeaderIcons: false,
      editing: false,
      globalSearch: true,
      toggleFieldVisibility: false,
      basicMode: true,
      additionalTableConfig,
      compositeKeys,
      viewName: this.viewName,
      parameters: this.parameters
    };

    this.filters = (this.pConn.getRawMetadata()?.config).promotedFilters ?? [];

    this.isSearchable = this.filters.length > 0;
  }
}
