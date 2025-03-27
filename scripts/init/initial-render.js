import { JsComponentPConnectService } from '../dxcomponents/js-component-pconnect.js';
import { ComponentsManager } from '../dxcomponents/components-manager.js';
import { getComponentFromMap } from '../dxcomponents/mappings/sdk-component-map.js';
import { bridge } from '../bridge/native-bridge.js';

export function initialRender(renderObj) {
  PCore.registerComponentCreator(c11nEnv => c11nEnv);
  const pconn = renderObj.props.getPConnect();
  if (pconn.meta.type !== 'RootContainer') {
    throw new Error("Only 'RootContainer' is supported as root component");
  }
  const jsComponentPConnect = new JsComponentPConnectService();
  const componentsManager = new ComponentsManager(
    jsComponentPConnect,
    (component) => { bridge.addComponent(component) },
    (component) => { bridge.removeComponent(component) },
    (id, props) => { bridge.updateComponentProps(id, props) }
  );

  const rootComponentClass = getComponentFromMap(pconn.meta.type);
  const rootComponent = new rootComponentClass(componentsManager, pconn);
  rootComponent.init();
  return rootComponent;
}
