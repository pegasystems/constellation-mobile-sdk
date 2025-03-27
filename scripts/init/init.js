import { initPlatforms } from './init-platforms.js';
import { initialRender } from './initial-render.js';
import { bootstrap } from './bootstrap.js'
import { createCase } from './create-case.js';
import { getSdkComponentMap } from '../dxcomponents/mappings/sdk-component-map.js';
import { bridge } from '../bridge/native-bridge.js';
import { subscribeForEvents } from './init-events.js';

async function init(sdkConfig, componentsOverridesStr) {
  try {
    console.log("Constellation SDK initialization started");
    initPlatforms(componentsOverridesStr);
    const config = JSON.parse(sdkConfig);
    await bootstrap(config.url, config.version, onPCoreReady);
    await createCase(config.caseClassName, config.startingFields);
    console.log("Constellation SDK initialization completed");
    bridge.onReady();
  } catch (error) {
    console.error("Constellation SDK initialization failed!", error);
    bridge.onError(error.message);
  }
}

async function onPCoreReady(renderObj) {
  console.log("PCore ready!");
  await getSdkComponentMap();
  console.log("SdkComponentMap initialized");
  const root = initialRender(renderObj);
  subscribeForEvents(root);
}

function sendEventToComponent(id, event) {
  bridge.onEvent(id, JSON.parse(event));
}

window.sendEventToComponent = sendEventToComponent;
window.init = init;