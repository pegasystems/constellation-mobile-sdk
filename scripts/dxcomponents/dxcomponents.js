import { JsComponentPConnectService } from './bridge/jsComponent-pconnect.js';
import { ComponentsManager } from './components-manager.js';
import { getComponentFromMap } from './bridge/helpers/sdk_component_map.js';

export function initialRender(renderObj, onComponentAdded, onComponentRemoved, onComponentPropsUpdate) {
    PCore.registerComponentCreator(c11nEnv => c11nEnv);
    const pconn = renderObj.props.getPConnect();
    console.log(`Root pConnect:`, JSON.stringify(pconn));
    if (pconn.meta.type !== 'RootContainer') {
      console.error("Only 'RootContainer' is supported as root component");
      return;
    }
    const rootComponentClass = getComponentFromMap(pconn.meta.type);
    const jsComponentPConnect = new JsComponentPConnectService(); // cannot be created before PCore is ready
    const componentsManager = new ComponentsManager(jsComponentPConnect, onComponentAdded, onComponentRemoved, onComponentPropsUpdate);

    const rootComponent = new rootComponentClass(componentsManager, pconn);
    rootComponent.init();
    return rootComponent;
}
