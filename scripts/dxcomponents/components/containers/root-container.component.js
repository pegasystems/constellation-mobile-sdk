import { getComponentFromMap } from '../../bridge/helpers/sdk_component_map.js'
import { Utils } from '../../helpers/utils.js';

const options = { context: 'app' };

export class RootContainerComponent {

  jsComponentPConnectData = {};
  viewContainerComponent;
  compId;
  type;

  constructor(componentsManager, pConn$) {
    this.pConn$ = pConn$;
    this.compId = componentsManager.getNextComponentId();
    this.componentsManager = componentsManager
    this.jsComponentPConnect = componentsManager.jsComponentPConnect;
    this.type = pConn$.meta.type;
  }

  init() {
    const { containers } = PCore.getStore().getState();
    const items = Object.keys(containers).filter(item => item.includes('root'));

    PCore.getContainerUtils().getContainerAPI().addContainerItems(items);

    Utils.setHasViewContainer('false');
    this.jsComponentPConnectData = this.jsComponentPConnect.registerAndSubscribeComponent(this, this.onStateChange, this.compId);
    console.log(`Native component with id: ${this.compId} and type: 'RootContainer' already present.`)
    this.onStateChange()
  }

  destroy() {
    if (this.jsComponentPConnectData.unsubscribeFn) {
      this.jsComponentPConnectData.unsubscribeFn();
    }
    if (this.viewContainerComponent !== undefined && this.viewContainerComponent.destroy !== undefined) {
      this.viewContainerComponent.destroy();
    }

    this.sendPropsUpdate();
  }

  sendPropsUpdate() {
    const props = { 
      children: Utils.getChildrenComponentsIds([this.viewContainerComponent]) 
    };
    console.log("sending RootContainer props: ", props);
    this.componentsManager.onComponentPropsUpdate(this.compId, props);
  }

  onStateChange() {
    if (this.jsComponentPConnect.shouldComponentUpdate(this)) {
      this.updateSelf();
    }
  }

  updateSelf() {
    const myProps = this.jsComponentPConnect.getCurrentCompleteProps(this);
    const { renderingMode } = myProps;
    if (renderingMode === 'noPortal') {
      this.generateViewContainerForNoPortal();
    } else  {
      console.error("'noPortal' rendering mode supported only.")
    } 
  }

  generateViewContainerForNoPortal() {
    const arChildren = this.pConn$.getChildren();
    if (!arChildren || arChildren.length !== 1 || arChildren[0].getPConnect().getComponentName() !== 'ViewContainer') {
      console.error("Only ViewContainer in RootContainer supported for 'noPortal' mode.");
      return;
    }

    const configProps = this.pConn$.getConfigProps();
    const viewContConfig = {
      meta: {
        type: 'ViewContainer',
        config: configProps
      },
      options
    };
    
    const viewContainerPConn = PCore.createPConnect(viewContConfig).getPConnect();
    const viewContainerComponentClass = getComponentFromMap(viewContainerPConn.meta.type);
    this.viewContainerComponent = new viewContainerComponentClass(this.componentsManager, viewContainerPConn);
    this.viewContainerComponent.init();

    if (this.compId !== "1") {
      console.error("RootComponent id must be '1' to match root container on consumer side");
      return;
    }
    this.sendPropsUpdate();
  }
}
