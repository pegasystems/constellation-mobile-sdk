import { initPlatforms } from "./init-platforms.js";
import { initialRender } from "./initial-render.js";
import { bootstrap } from "./bootstrap.js";
import { createCase } from "./create-case.js";
import { openAssignment } from "./open-assignment.js";
import { getSdkComponentMap } from "../dxcomponents/mappings/sdk-component-map.js";
import { bridge } from "../bridge/native-bridge.js";
import { subscribeForEvents } from "./init-events.js";
import { localSdkComponentMap } from "../dxcomponents/mappings/sdk-local-component-map.js";
import { initErrorHandling } from "./init-error-handling.js";

const TAG = "[Init]";

async function init(sdkConfig, componentsOverridesStr) {
    try {
        console.log(TAG, "Constellation SDK initialization started");
        initErrorHandling();
        initPlatforms(componentsOverridesStr);
        const config = JSON.parse(sdkConfig);
        await bootstrap(config.url, config.version, onPCoreReady);

        if (config.action.type === "CreateCase") {
            await createCase(config.action.caseClassName, config.action.startingFields);
        } else if (config.action.type === "OpenAssignment") {
            await openAssignment(config.action.assignmentId);
        } else {
            const errorMessage = "Unknown action type: " + config.action.type;
            throw new Error(errorMessage);
        }

        console.log(TAG, "Constellation SDK initialization completed");
        const envInfo = {
          locale: PCore.getEnvironmentInfo().getUseLocale(),
          timeZone: PCore.getEnvironmentInfo().getTimeZone()
        };
        bridge.onReady(envInfo);
    } catch (error) {
        const errorMessage = "Constellation SDK initialization failed! " + (error?.message ?? "");
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
