import { Utils } from '../../../helpers/utils.js';
import {getComponentFromMap} from '../../../mappings/sdk-component-map.js';

export class FieldGroupTemplateComponent {
  pConn$;
  jsComponentPConnect;
  jsComponentPConnectData = {};
  compId;
  type;
  items;
  configProps;

  props = {
    child: undefined
  }

  // added
  inheritedProps$;
  showLabel$ = true;
  label$;
  readonlyMode;
  contextClass;
  referenceList;
  pageReference;
  heading;
  children;
  arChildren$;
  // menuIconOverride$;
  prevRefLength;
  allowAddEdit;
  fieldHeader;
  //

  constructor(componentsManager, pConn, configProps) {
    this.pConn$ = pConn;
    this.configProps = configProps;
    this.utils = new Utils();
    this.componentsManager = componentsManager;
    this.compId = this.componentsManager.getNextComponentId();
    this.jsComponentPConnect = componentsManager.jsComponentPConnect
    this.type = "FieldGroupTemplate"
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();

    // const menuIconOverride$ = 'trash';
    // if (menuIconOverride$) {
    //   this.menuIconOverride$ = this.utils.getImageSrc(menuIconOverride$, this.utils.getSDKStaticContentUrl());
    // }
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      this.jsComponentPConnectData.unsubscribeFn();
    }
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn, configProps) {
    if (configProps) {
      if (configProps !== this.configProps) {
        this.configProps = configProps;
        if (pConn) {
          this.pConn$ = pConn;
        }
        this.updateSelf();
      }
    }
  }

  onStateChange() {
    this.checkAndUpdate();
  }

  checkAndUpdate() {
    const bUpdateSelf = this.jsComponentPConnect.shouldComponentUpdate(this);

    if (bUpdateSelf) {
      this.updateSelf();
    }
  }

  updateSelf() {
    ////
    this.inheritedProps$ = this.pConn$.getInheritedProps();
    this.label$ = this.configProps.label;
    this.showLabel$ = this.configProps.showLabel;
    // label & showLabel within inheritedProps takes precedence over configProps
    this.label$ = this.inheritedProps$.label || this.label$;
    this.showLabel$ = this.inheritedProps$.showLabel || this.showLabel$;

    this.allowAddEdit = this.configProps.allowTableEdit;

    const renderMode = this.configProps.renderMode;
    const displayMode = this.configProps.displayMode;
    this.readonlyMode = renderMode === 'ReadOnly' || displayMode === 'DISPLAY_ONLY';
    this.contextClass = this.configProps.contextClass;
    const lookForChildInConfig = this.configProps.lookForChildInConfig;
    this.heading = this.configProps.heading ?? 'Row';
    this.fieldHeader = this.configProps.fieldHeader;
    const resolvedList = this.getReferenceList(this.pConn$);
    this.pageReference = `${this.pConn$.getPageReference()}${resolvedList}`;
    this.pConn$.setReferenceList(resolvedList);
    if (this.readonlyMode) {
      this.pConn$.setInheritedProp('displayMode', 'DISPLAY_ONLY');
    }
    this.referenceList = this.configProps.referenceList;
    if (this.prevRefLength !== this.referenceList.length) {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (!this.readonlyMode) {
        if (this.referenceList?.length === 0 && this.allowAddEdit !== false) {
          this.addFieldGroupItem();
        }
      }
      const children = [];
      this.referenceList?.forEach((item, index) => {
        //TODO: add some reconciliation
        children.push({
          id: index,
          name: this.fieldHeader === 'propertyRef' ? this.getDynamicHeader(item, index) : this.getStaticHeader(this.heading, index),
          component: this.createItemComponent(this.buildItemPConnect(this.pConn$, index, lookForChildInConfig).getPConnect())
        });
      })
      this.children = children;
    }
    this.prevRefLength = this.referenceList.length;
    ////
    this.sendPropsUpdate();
  }

  createItemComponent(pConn) {
    const childComponentClass = getComponentFromMap(pConn.getRawMetadata().type);
    const childComponentInstance = new childComponentClass(this.componentsManager, pConn);
    childComponentInstance.init();
    return childComponentInstance;
  }

  // reconcileItemsComponents(newItems) {
  //   const oldItems = this.children
  //   const reconciledItems = [];
  //
  //   newItems.forEach((newItem) => {
  //     const oldItemToReuse = this.getItemToReuse(oldItems, newItem.pConn.getPConnect());
  //     if (oldItemToReuse !== undefined) {
  //       this.updateComponentPconn(oldItemToReuse, newItem.getPConnect());
  //       reconciledItems.push({component: oldItemToReuse, shouldInit: false});
  //       oldItems.splice(oldItems.indexOf(oldItemToReuse), 1);
  //     } else {
  //       const newChildComponent = this.createNewChildComponent(component.componentsManager, newItem.getPConnect());
  //       reconciledItems.push({component: newChildComponent, shouldInit: true});
  //     }
  //   })
  //   this.destroyOldChildrenComponents(oldItems);
  //   return reconciledItems;
  // }
  //
  // getItemToReuse(oldItems, newItemPConn) {
  //   return oldItems.find((item) => {
  //     return this.isEqualNameType(item.pConn, newItemPConn);
  //   })
  // }
  //
  // destroyOldChildrenComponents(oldChildrenComponents) {
  //   oldChildrenComponents.forEach((component) => {
  //     if (component === undefined) {
  //       throw new Error("Reconciliation failed, child component is 'undefined'");
  //     }
  //     if (component.destroy === undefined) {
  //       throw new Error("Reconciliation failed, child component is missing 'destroy' function");
  //     }
  //     component.destroy();
  //   });
  // }
  //
  // createNewChildComponent(componentsManager, childPConn) {
  //   const childComponentClass = getComponentFromMap(childPConn.meta.type);
  //   return new childComponentClass(componentsManager, childPConn);
  // }
  //
  // updateComponentPconn(childComponent, newChildPConn) {
  //   if (childComponent === undefined) {
  //     throw new Error("Reconciliation failed, child component is 'undefined'");
  //   }
  //   if (childComponent.update === undefined) {
  //     throw new Error("Reconciliation failed, child component is missing 'update' function");
  //   }
  //   childComponent.update(newChildPConn);
  // }
  //
  // isEqualNameType(oldChildPConn, newChildPConn) {
  //   return newChildPConn.meta.name === oldChildPConn.meta.name && newChildPConn.meta.type === oldChildPConn.meta.type
  // }


  onEvent(event) {

  }

  sendPropsUpdate() {
    this.props = {
      items: this.children.map(child => {
        return {
          id: child.id,
          heading: child.name,
          componentId: child.component.compId
        }
      })
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  //helpers
  buildMetaForListView(fieldMetadata, fields, type, ruleClass, name, propertyLabel, isDataObject, parameters) {
    return {
      name,
      config: {
        type,
        referenceList: fieldMetadata.datasource.name,
        parameters: parameters ?? fieldMetadata.datasource.parameters,
        personalization: false,
        isDataObject,
        grouping: true,
        globalSearch: true,
        reorderFields: true,
        toggleFieldVisibility: true,
        title: propertyLabel,
        personalizationId: '' /* TODO */,
        template: 'ListView',
        presets: [
          {
            name: 'presets',
            template: 'Table',
            config: {},
            children: [
              {
                name: 'Columns',
                type: 'Region',
                children: fields
              }
            ],
            label: propertyLabel,
            id: 'P_' /* TODO */
          }
        ],
        ruleClass
      }
    };
  };

  getContext(thePConn) {
    const contextName = thePConn.getContextName();
    const pageReference = thePConn.getPageReference();
    // 8.7 change = referenceList may now be in top-level of state props,
    //  not always in config of state props
    let { referenceList } = thePConn.getStateProps()?.config || thePConn.getStateProps();
    const pageReferenceForRows = referenceList.startsWith('.') ? `${pageReference}.${referenceList.substring(1)}` : referenceList;

    // removing "caseInfo.content" prefix to avoid setting it as a target while preparing pageInstructions
    referenceList = pageReferenceForRows.replace(PCore.getConstants().CASE_INFO.CASE_INFO_CONTENT, '');

    return {
      contextName,
      referenceListStr: referenceList,
      pageReferenceForRows
    };
  };

  getStaticHeader = (heading, index) => {
    return `${heading} ${index + 1}`;
  };

  getDynamicHeader = (item, index) => {
    if (this.fieldHeader === 'propertyRef' && this.heading && item[this.heading.substring(1)]) {
      return item[this.heading.substring(1)];
    }
    return `Row ${index + 1}`;
  };

  addFieldGroupItem() {
    this.pConn$.getListActions().insert({ classID: this.contextClass }, this.referenceList.length);
  }

  deleteFieldGroupItem(index) {
    this.pConn$.getListActions().deleteEntry(index);
  }

  buildItemPConnect(pConn, index, viewConfigPath) {
    const context = pConn.getContextName();
    const referenceList = this.getReferenceList(pConn);

    const isDatapage = referenceList.startsWith('D_');
    const pageReference = isDatapage ? `${referenceList}[${index}]` : `${pConn.getPageReference()}${referenceList}[${index}]`;
    const meta = viewConfigPath ? pConn.getRawMetadata().children[0].children[0] : pConn.getRawMetadata().children[0];
    const config = {
      meta,
      options: {
        context,
        pageReference,
        referenceList,
        hasForm: true
      }
    };

    const pConnect = PCore.createPConnect(config);
    if (pConn.getConfigProps()?.displayMode === 'DISPLAY_ONLY') {
      pConnect.getPConnect()?.setInheritedProp('displayMode', 'DISPLAY_ONLY');
    }

    return pConnect;
  };

  getReferenceList(pConn) {
    let resolvePage = pConn.getComponentConfig().referenceList.replace('@P ', '');
    if (resolvePage.includes('D_')) {
      resolvePage = pConn.resolveDatasourceReference(resolvePage);
      if (resolvePage?.pxResults) {
        resolvePage = resolvePage?.pxResults;
      } else if (resolvePage.startsWith('D_') && !resolvePage.endsWith('.pxResults')) {
        resolvePage = `${resolvePage}.pxResults`;
      }
    }
    return resolvePage;
  };
}
