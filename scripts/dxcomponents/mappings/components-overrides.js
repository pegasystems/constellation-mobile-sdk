import { isAndroid, isIOS } from "../../init/ostype.js";
import { localSdkComponentMap } from "./sdk-local-component-map.js";

const TAG = "[ComponentsOverrides]";

export function installComponentsOverrides(componentsOverridesStr) {
   console.log(TAG, `Installing js components: ${componentsOverridesStr}`);
   const json = JSON.parse(componentsOverridesStr);
   Object.entries(json).forEach(([type, path]) => {
      importComponent(type, path)
         .then((component) => {
            localSdkComponentMap[type] = Object.values(component)[0];
            console.log(TAG, `Installed component: ${type}`);
         })
         .catch((error) => console.error(TAG, `Error occurred when installing ${type}`, error));
   });
}

function importComponent(type, path) {
   console.log(TAG, `Importing component: ${type}: ${path}`);
   if (isIOS()) {
      return import(path);
   } else if (isAndroid()) {
      return fetch(`/${path}`)
         .then((response) => response.text())
         .then((textContent) => {
            if (textContent && textContent.trim().length > 0) {
               return import("data:text/javascript;charset=utf-8," + textContent);
            } else {
               throw Error(`Empty component content for ${type} at path: ${path}`);
            }
         });
   } else {
      return Promise.reject("Unexpected platform.");
   }
}
