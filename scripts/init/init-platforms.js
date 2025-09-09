import { initSessionStorage } from "./init-session-storage.js";
import { isAndroid } from "./ostype.js";
import { overrideXHRForRequestBody } from "./init-xhr.js";
import { installComponentsOverrides } from "../dxcomponents/mappings/components-overrides.js";

export function initPlatforms(componentsOverridesStr) {
  initSessionStorage();
  if (isAndroid()) {
    console.log("[InitPlatforms]", "Initializing Android APIs");
    overrideXHRForRequestBody();
  }
  const assetsPath = isAndroid() ? 'constellation-mobile-sdk-assets' : "/constellation-mobile-sdk-assets/components";
  installComponentsOverrides(componentsOverridesStr, assetsPath);
}
