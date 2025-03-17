import { isAndroid, isIOS } from './ostype.js';
import { localSdkComponentMap } from './sdk-local-component-map.js';

export function installComponentsOverrides(componentsOverridesStr, assetsPath) { 
  if (isIOS()) {
    installComponentsOverridesiOS(componentsOverridesStr, assetsPath)
  } else if (isAndroid()) {
    installComponentsOverridesAndroid(componentsOverridesStr, assetsPath)
  } else {
    console.error("Unexpected platform.")
  }
}

function installComponentsOverridesAndroid(componentsOverridesStr, assetsPath) {
  console.log(`installing js components: ${componentsOverridesStr}`);
  const json = JSON.parse(componentsOverridesStr);
  Object.entries(json).forEach(([key, value]) => {
    console.log(`component override: ${key}: ${value}`);
    fetch(`${assetsPath}/${value}`)
      .then(
        (response) => {
          response.text().then(textContent => {
            import('data:text/javascript;charset=utf-8,' + textContent).then((component) => {
              localSdkComponentMap[key] = Object.values(component)[0];
            })
          })
        }
      )
  })
}

function installComponentsOverridesiOS(componentsOverridesStr, assetsPath) {
  console.log(`Installing js components...`);
  const json = JSON.parse(componentsOverridesStr);
  Object.entries(json).forEach(([key, value]) => {
    console.log(`component override: ${key}`);
    import(`${assetsPath}/${value}`).then((component) => {
      localSdkComponentMap[key] = Object.values(component)[0];
    }).catch((error) => {
      console.error(`Error occured when installing ${key}`, error)
    });
  })
}