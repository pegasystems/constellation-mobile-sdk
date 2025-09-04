import {ReferenceComponent} from './reference.component.js';
import {Utils} from '../../helpers/utils.js';
import {BaseComponent} from '../base.component.js';

const TAG = '[ViewContainerComponent]';

export class ViewContainerComponent extends BaseComponent {

  jsComponentPConnectData = {};
  childComponent;
  props = {
    children: []
  }

  init() {
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
    this.componentsManager.onComponentAdded(this);

    const {CONTAINER_TYPE, APP} = PCore.getConstants();
    const {name = '', mode = 'single', limit = 16} = this.pConn.resolveConfigProps(this.pConn.getConfigProps());

    const containerMgr = this.pConn.getContainerManager();
    const type = mode === CONTAINER_TYPE.MULTIPLE ? CONTAINER_TYPE.MULTIPLE : CONTAINER_TYPE.SINGLE;
    if (!Utils.hasViewContainer()) {
      containerMgr.initializeContainers({type: type});

      if (mode === CONTAINER_TYPE.MULTIPLE) {
        /* NOTE: setContainerLimit use is temporary. It is a non-public, unsupported API. */
        PCore.getContainerUtils().setContainerLimit(`${APP.APP}/${name}`, limit);
      }

      if (!PCore.checkIfSemanticURL()) {
        // PCore.checkIfSemanticURL() logic inside c11n-core-js is that it compares app path and path in url.
        // If they are equal then it returns false. In code these values are set to be equal.
        containerMgr.addContainerItem(this.#prepareDispatchObject());
      }
      Utils.setHasViewContainer('true')
    }

    // cannot call #checkAndUpdate because first time through, will call #updateSelf and that is incorrect (causes issues).
    // however, need jsComponentPConnect to be initialized with currentProps for future updates, so calling shouldComponentUpdate directly
    // without checking to update here in init, will initialize and this is correct
    this.jsComponentPConnect.shouldComponentUpdate(this);
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.childComponent?.destroy?.();
    this.props.children = [];
    this.componentsManager.onComponentPropsUpdate(this);
    this.componentsManager.onComponentRemoved(this);
  }

  update(pConn) {
    if (this.pConn !== pConn) {
      this.pConn = pConn;
      this.#checkAndUpdate();
    }
  }

  #checkAndUpdate() {
    // added Utils.hasViewContainer() check because call to addContainerItem in init()
    // causes redux to dispatch event and this method is called too early
    if (Utils.hasViewContainer() && this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.#updateSelf();
    }
  }

  #updateSelf() {
    // routingInfo was added as component prop in populateAdditionalProps
    const routingInfo = this.jsComponentPConnect.getComponentProp(this, 'routingInfo');

    if (!routingInfo) {
      console.error(TAG, "routingInfo is not available.")
      return;
    }
    const {accessedOrder, items} = routingInfo;
    if (accessedOrder && items) {
      const lastItemKey = accessedOrder[accessedOrder.length - 1];
      if (this.#hasViewsInRoutingInfo(lastItemKey, items)) {
        const newCompPConn = this.#createNewPConn(lastItemKey, items);
        const newCompName = newCompPConn.getComponentName();

        if (newCompName !== 'reference') {
          console.error(TAG, `newComp name is '${newCompName}. 'Only 'reference' is supported as newComp in ViewContainer`);
          return
        }
        const viewPConn = ReferenceComponent.normalizePConn(newCompPConn);
        this.childComponent?.destroy?.();
        this.childComponent = this.createComponent(viewPConn.meta.type, [viewPConn]);
        this.props.children = [this.childComponent.compId];
        this.componentsManager.onComponentPropsUpdate(this);
      }
    }
  }

  #hasViewsInRoutingInfo(key, items) {
    return items[key] && items[key].view && Object.keys(items[key].view).length > 0
  }

  #createNewPConn(lastItemKey, items) {
    const config = this.#createNewConfig(lastItemKey, items);
    return PCore.createPConnect(config).getPConnect();
  }

  /**
   * Creates a new configuration object based on the last item view in the routing info.
   */
  #createNewConfig(lastItemKey, items) {
    const {CREATE_DETAILS_VIEW_NAME} = PCore.getConstants();
    const latestItem = items[lastItemKey];
    const rootView = latestItem.view;
    const {context, name: viewName} = rootView.config;
    const config = {meta: rootView};
    config.options = {
      context: latestItem.context,
      pageReference: context || this.pConn.getPageReference(),
      containerName: this.pConn.getContainerName(),
      containerItemName: lastItemKey,
      hasForm: viewName === CREATE_DETAILS_VIEW_NAME
    };
    return config;
  }

  #prepareDispatchObject() {
    return {
      semanticURL: '',
      context: this.pConn.getContextName(),
      acName: this.pConn.getContainerName() ?? 'primary'
    };
  }
}
