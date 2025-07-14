import {isAndroid, isIOS} from '../../init/ostype.js';
import {localSdkComponentMap} from './sdk-local-component-map.js';

const TAG = "[ComponentsOverrides]";

export function installComponentsOverrides(componentsOverridesStr, assetsPath) {
  if (isIOS()) {
    installComponentsOverridesiOS(componentsOverridesStr, assetsPath)
  } else if (isAndroid()) {
    installComponentsOverridesAndroid(componentsOverridesStr, assetsPath)
  } else {
    console.error(TAG, "Unexpected platform.")
  }
}

function installComponentsOverridesAndroid(componentsOverridesStr, assetsPath) {
  console.log(TAG, `Installing js components: ${componentsOverridesStr}`);
  const json = JSON.parse(componentsOverridesStr);
  Object.entries(json).forEach(([key, value]) => {
    console.log(TAG, `Component override: ${key}: ${value}`);
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
      .catch((err) => {
          console.error(TAG, `Failed to load ${key}: ${value} component, err: `, err);
        }
      )
  })
}

function installComponentsOverridesiOS(componentsOverridesStr, assetsPath) {
  console.log(TAG, `Installing js components...`);
  const json = JSON.parse(componentsOverridesStr);
  Object.entries(json).forEach(([key, value]) => {
    console.log(TAG, `Component override: ${key}`);
    import(`${assetsPath}/${value}`).then((component) => {
      localSdkComponentMap[key] = Object.values(component)[0];
    }).catch((error) => {
      console.error(TAG, `Error occured when installing ${key}`, error)
    });
  })
}
