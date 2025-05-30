import { Utils } from '../../../helpers/utils.js';
import {getComponentFromMap} from '../../../mappings/sdk-component-map.js';
import { BaseComponent } from '../../base.component.js';

export class FieldGroupTemplateComponent extends BaseComponent {

  jsComponentPConnectData = {};
  items = [];
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
    super(componentsManager, pConn);
    this.type = "FieldGroupTemplate"
    this.configProps = configProps;
    this.utils = new Utils();
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.checkAndUpdate();
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
    this.inheritedProps$ = this.pConn$.getInheritedProps();
    const label = this.configProps.label;
    const showLabel = this.configProps.showLabel;
    // label & showLabel within inheritedProps takes precedence over configProps
    this.label$ = this.inheritedProps$.label !== undefined ? this.inheritedProps$.label : label;
    this.showLabel$ = this.inheritedProps$.showLabel !== undefined ? this.inheritedProps$.showLabel : showLabel;

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
      const items = [];
      const oldItemsComponents = this.items.map(item => item.component);
      this.referenceList?.forEach((item, index) => {
        // all components in list are the same name and type so we can pick any component for re-use.
        const oldComponent = oldItemsComponents.pop();
        const newPConn = this.buildItemPConnect(this.pConn$, index, lookForChildInConfig).getPConnect();
        const newComponent = this.reconcileItemComponent(newPConn, oldComponent);
        items.push({
          id: index,
          name: this.fieldHeader === 'propertyRef' ? this.getDynamicHeader(item, index) : this.getStaticHeader(this.heading, index),
          component: newComponent
        });
      })
      this.items = items;
      this.prevRefLength = this.referenceList.length;
    }
    this.sendPropsUpdate();
  }

  reconcileItemComponent(pConn, oldComponent) {
    if (oldComponent !== undefined) {
      oldComponent.update(pConn)
      return oldComponent;
    }
    const itemComponentClass = getComponentFromMap(pConn.getRawMetadata().type);
    const itemComponentInstance = new itemComponentClass(this.componentsManager, pConn);
    itemComponentInstance.init();
    return itemComponentInstance;
  }

  onEvent(event) {
    if (!this.readonlyMode) {
      this.referenceList?.forEach((item) => {
          item.component.onEvent(event);
        }
      )
    }
    // TODO: add handling of add and delete button when introducing support for editable field group
  }

  sendPropsUpdate() {
    this.props = {
      // TODO: pass 'allowAddEdit' prop when introducing support for editable field group
      items: this.items.map(child => {
        return {
          id: child.id,
          heading: child.name,
          componentId: child.component.compId
        }
      })
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

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
