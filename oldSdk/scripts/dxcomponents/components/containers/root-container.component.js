import {Utils} from '../../helpers/utils.js';
import {BaseComponent} from '../base.component.js';

const options = {context: 'app'};
const TAG = '[RootContainerComponent]';

export class RootContainerComponent extends BaseComponent {
  #viewContainerComponent;

  jsComponentPConnectData = {};
  props = {
    viewContainer: '',
    httpMessages: {}
  }

  init() {
    const {containers} = PCore.getStore().getState();
    const items = Object.keys(containers).filter(item => item.includes('root'));
    PCore.getContainerUtils().getContainerAPI().addContainerItems(items);
    Utils.setHasViewContainer('false');
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.#checkAndUpdate);
    this.componentsManager.onComponentAdded(this);
    this.#checkAndUpdate()
  }

  destroy() {
    this.jsComponentPConnectData.unsubscribeFn?.();
    this.#viewContainerComponent?.destroy?.()
    this.#sendPropsUpdate();
    this.componentsManager.onComponentRemoved(this);
  }

  #sendPropsUpdate() {
    const httpMessages = this.jsComponentPConnectData.httpMessages || []
    this.props = {
      viewContainer: this.#viewContainerComponent.compId,
      httpMessages: httpMessages
    };
    this.componentsManager.onComponentPropsUpdate(this);

    // even if the http issue no longer exists the error is persisted in core js so we need to clear it
    if (this.jsComponentPConnectData.httpMessages && this.jsComponentPConnectData.httpMessages.length > 0) {
      this.#clearHttpMessages();
    }
  }

  #clearHttpMessages() {
    const context = PCore.getContainerUtils().getActiveContainerItemName(`${PCore.getConstants().APP.APP}/${this.pConn.getContainerName()}`);
    PCore.getMessageManager().clearMessages({
      category: 'HTTP',
      type: 'error',
      context: context
    });
  }

  #checkAndUpdate() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.#updateSelf();
    }
  }

  #updateSelf() {
    const myProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
    const {renderingMode} = myProps;
    if (renderingMode === 'noPortal') {
      this.#generateViewContainerForNoPortal();
    } else {
      console.error(TAG, "'noPortal' rendering mode supported only.")
    }
  }

  #generateViewContainerForNoPortal() {
    const arChildren = this.pConn.getChildren();
    if (!arChildren || arChildren.length !== 1 || arChildren[0].getPConnect().getComponentName() !== 'ViewContainer') {
      console.error(TAG, "Only ViewContainer in RootContainer supported for 'noPortal' mode.");
      return;
    }

    const configProps = this.pConn.getConfigProps();
    const viewContConfig = {
      meta: {
        type: 'ViewContainer',
        config: configProps
      },
      options
    };
    const viewContainerPConn = PCore.createPConnect(viewContConfig).getPConnect();
    this.#viewContainerComponent = this.componentsManager.upsert(this.#viewContainerComponent, viewContainerPConn.meta.type, [viewContainerPConn]);

    if (this.compId !== "1") {
      console.error(TAG, "RootComponent id must be '1' to match root container on consumer side");
      return;
    }
    this.#sendPropsUpdate();
  }
}
