import { initPlatforms } from './init-platforms.js';
import { initialRender } from './initial-render.js';
import { bootstrap } from './bootstrap.js'
import { createCase } from './create-case.js';
import { getSdkComponentMap } from '../dxcomponents/mappings/sdk-component-map.js';
import { bridge } from '../bridge/native-bridge.js';
import { subscribeForEvents } from './init-events.js';
import { localSdkComponentMap } from '../dxcomponents/mappings/sdk-local-component-map.js';

const TAG = "[Init]";

async function init(sdkConfig, componentsOverridesStr) {
  try {
    console.log(TAG, "Constellation SDK initialization started");
    initPlatforms(componentsOverridesStr);
    const config = JSON.parse(sdkConfig);
    await bootstrap(config.url, config.version, onPCoreReady);
    await createCase(config.caseClassName, config.startingFields);
    console.log(TAG, "Constellation SDK initialization completed");
    bridge.onReady();
  } catch (error) {
    const errorMessage = "Constellation SDK initialization failed! " + (error?.message ?? "")
    console.error(errorMessage);
    bridge.onError("InitError", errorMessage);
  }
}

async function onPCoreReady(renderObj) {
  console.log(TAG, "PCore ready!");
  await getSdkComponentMap(localSdkComponentMap);
  console.log(TAG, "SdkComponentMap initialized");
  const root = initialRender(renderObj);
  subscribeForEvents(root);
}

function sendEventToComponent(id, event) {
  bridge.onEvent(id, JSON.parse(event));
}

window.sendEventToComponent = sendEventToComponent;
window.init = init;
window.addEventListener('error', errorEvent => {
  bridge.onError("UncaughtError", `${errorEvent.message} in ${errorEvent.filename} at line ${errorEvent.lineno}`);
})
window.addEventListener('unhandledrejection', rejectionEvent => {
  bridge.onError("UnhandledRejectionError", `Unhandled promise rejection: ${stringify(rejectionEvent.reason)}`);
});

function stringify(reason) {
  return JSON.stringify(reason).replace(/^"|"$/g, '');
}
