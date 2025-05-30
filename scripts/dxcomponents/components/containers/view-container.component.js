import { ReferenceComponent } from './reference.component.js';
import { Utils } from '../../helpers/utils.js';
import { getComponentFromMap } from '../../mappings/sdk-component-map.js';
import { BaseComponent } from '../base.component.js';

export class ViewContainerComponent extends BaseComponent {

  jsComponentPConnectData = {};
  props;
  arChildren$ =[];
  childComponent;
  title$ = '';
  viewPConn$;

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    this.componentsManager.onComponentAdded(this);
    this.arChildren$ = ReferenceComponent.normalizePConnArray(this.pConn$.getChildren());
    const configProps = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());
    this.templateName$ = configProps.template || '';
    this.title$ = configProps.title || '';
    const { CONTAINER_TYPE, APP } = PCore.getConstants();
    const { name = '', mode = 'single', limit = 16} = this.pConn$.resolveConfigProps(this.pConn$.getConfigProps());

    this.pConn$.isBoundToState();

    const containerMgr = this.pConn$.getContainerManager();

    if (!Utils.hasViewContainer()) {
      containerMgr.initializeContainers({
        type: mode === CONTAINER_TYPE.MULTIPLE ? CONTAINER_TYPE.MULTIPLE : CONTAINER_TYPE.SINGLE
      });

      if (mode === CONTAINER_TYPE.MULTIPLE && limit) {
        /* NOTE: setContainerLimit use is temporary. It is a non-public, unsupported API. */
        PCore.getContainerUtils().setContainerLimit(`${APP.APP}/${name}`, limit);
      }

      if (!PCore.checkIfSemanticURL()) {
        // PCore.checkIfSemanticURL() logic inside c11n-core-js is that it compares app path and path in url.
        // If they are equal then it returns false. In code these values are set to be equal.
        containerMgr.addContainerItem(this.prepareDispatchObject());
      }
      Utils.setHasViewContainer('true')
    }

    // cannot call checkAndUpdate becasue first time through, will call updateSelf and that is incorrect (causes issues).
    // however, need jsComponentPConnect to be initialized with currentProps for future updates, so calling shouldComponentUpdate directly
    // without checking to update here in init, will initialize and this is correct
    this.jsComponentPConnect.shouldComponentUpdate(this);
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      console.log("destroy for view container - id:  ", this.jsComponentPConnectData.compID);
      this.jsComponentPConnectData.unsubscribeFn();
    }
    if (this.childComponent !== undefined && this.childComponent.destroy !== undefined) {
      this.childComponent.destroy();
    }
    this.sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn$ !== pConn) {
      this.pConn$ = pConn;
      this.checkAndUpdate();
    }
  }

  sendPropsUpdate() {
    this.props = {
      children: Utils.getChildrenComponentsIds([this.childComponent])
    };
    this.componentsManager.onComponentPropsUpdate(this);
  }

  onStateChange() {
    // added because call to addContainerItem in init() causes redux to dispatch event and this method is called too early
    if (Utils.hasViewContainer()) {
      this.checkAndUpdate();
    }
  }

  checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.updateSelf();
    }
  }

  updateSelf() {
    if (this.arChildren$ == null) {
      this.arChildren$ = ReferenceComponent.normalizePConnArray(this.pConn$.getChildren());
    }
    // routingInfo was added as component prop in populateAdditionalProps
    const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');

    if (!routingInfo) {
      console.error("routingInfo is not available.")
      return;
    }
    const { accessedOrder, items } = routingInfo;
    if (accessedOrder && items) {
      const key = accessedOrder[accessedOrder.length - 1];
      let componentVisible = accessedOrder.length > 0;
      const visible = !PCore.checkIfSemanticURL();
      componentVisible = visible || componentVisible;
      if (items[key] && items[key].view && Object.keys(items[key].view).length > 0) {
        const config = this.createNewConfig(key, items);
        const configObject = PCore.createPConnect(config);
        const newCompPConn = configObject.getPConnect();
        const newCompName = newCompPConn.getComponentName();

        if (newCompName !== 'reference') {
          console.error(`newComp name is '${newCompName}. 'Only 'reference' is supported as newComp in ViewContainer`);
          return
        }
        this.viewPConn$ = ReferenceComponent.normalizePConn(newCompPConn);

        if (this.childComponent !== undefined && this.childComponent.destroy !== undefined) {
          this.childComponent.destroy();
        }
        const viewComponent = getComponentFromMap(this.viewPConn$.meta.type);
        this.childComponent = new viewComponent(this.componentsManager, this.viewPConn$);
        this.childComponent.init();

        this.sendPropsUpdate();
      }
    }
  }

  createNewConfig(key, items) {
    const { CREATE_DETAILS_VIEW_NAME } = PCore.getConstants();
    const latestItem = items[key];
    const rootView = latestItem.view;
    const { context, name: viewName } = rootView.config;
    const config = { meta: rootView };
    config.options = {
      context: latestItem.context,
      pageReference: context || this.pConn$.getPageReference(),
      containerName: this.pConn$.getContainerName(),
      containerItemName: key,
      hasForm: viewName === CREATE_DETAILS_VIEW_NAME
    };
    return config;
  }

  prepareDispatchObject() {
    const baseContext = this.pConn$.getContextName();
    // const { acName = "primary" } = pConn.getContainerName(); // doesn't work with 8.23 typings
    const acName = this.pConn$.getContainerName() || 'primary';

    return {
      semanticURL: '',
      context: baseContext,
      acName
    };
  }
}
