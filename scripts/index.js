import { initSessionStorage } from './sessionStorage.js';
import { getSdkComponentMap, getComponentFromMap } from './dxcomponents/bridge/helpers/sdk_component_map.js'
import { overrideXHRForRequestBody } from './nativebridge/android_networking.js';
import { isAndroid, isIOS } from './ostype.js';
import { NativeBridge } from './nativebridge/native-bridge.js';
import { bootstrap } from './bootstrap.js'
import { installComponentsOverrides } from './components-overrides.js';
import { createCase } from './create-case.js';
import { localSdkComponentMap } from './sdk-local-component-map.js';
import { initialRender } from './dxcomponents/dxcomponents.js';

let nativeBridge;

async function init(sdkConfig, componentsOverridesStr) {
    try {
    initPlatforms(componentsOverridesStr);
    const config = JSON.parse(sdkConfig);
    await bootstrap(config.url, config.version, onPCoreReady);
    createCase(config.caseClassName, config.startingFields);
  } catch (error) {
    console.error("Init failed!", error);
  }
}

async function initPlatforms(componentsOverridesStr) {
  initSessionStorage();
  if (isAndroid()) {
    console.log("Initializing Android APIs");
    overrideXHRForRequestBody();
  } 
  const assetsPath = isAndroid() ? 'prweb/assets' : window.location.href + "assets";
  installComponentsOverrides(componentsOverridesStr, assetsPath);
}

async function onPCoreReady(renderObj) {
  console.log("PCore ready!", renderObj);
  await getSdkComponentMap(localSdkComponentMap);
  console.log("SdkComponentMap initialized");
  nativeBridge = new NativeBridge();

  const rootComponent = initialRender(
    renderObj, 
    (component) => { nativeBridge.addComponent(component) },
    (component) => { nativeBridge.removeComponent(component)},
    (id, props) => { nativeBridge.updateComponentProps(id, props) }
  );

  PCore.getPubSubUtils().subscribe(
    'assignmentFinished',
    message => {
       console.log(`Assignment finished, message: ${message}`)
       rootComponent.destroy(); 
       nativeBridge.formFinished(message);
      },
    'assignmentFinished'
  );

  PCore.getPubSubUtils().subscribe(
    PCore.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
    () => {
      console.log(`Assignment canceled`);
      rootComponent.destroy(); 
      nativeBridge.formCancelled();
    },
    'cancelAssignment'
  );
}

function sendEventToComponent(id, event) {
  nativeBridge.onEvent(id, JSON.parse(event));
}

window.sendEventToComponent = sendEventToComponent;
window.init = init;