import { JsComponentPConnectService } from "../dxcomponents/js-component-pconnect.js";
import { ComponentsManager } from "../dxcomponents/components-manager.js";
import { bridge } from "../bridge/native-bridge.js";

export function initialRender(renderObj) {
    PCore.registerComponentCreator((c11nEnv) => c11nEnv);
    const pconn = renderObj.props.getPConnect();
    if (pconn.meta.type !== "RootContainer") {
        throw new Error("[Initial Render] Only 'RootContainer' is supported as root component");
    }
    const jsComponentPConnect = new JsComponentPConnectService();
    const componentsManager = new ComponentsManager(
        jsComponentPConnect,
        (component) => bridge.addComponent(component),
        (component) => bridge.removeComponent(component),
        (component) => bridge.updateNativeComponent(component)
    );

    return componentsManager.create("RootContainer", [pconn]);
}
