import { isAndroid, isIOS } from "./ostype.js";

const altStorage = {};
 const altSessionStorage = {
  setItem: (key, val) => {
    altStorage[key] = val;
  },
  getItem: key => {
    return altStorage[key] || null;
  },
  removeItem: key => {
    delete altStorage[key];
  },
};

export function initSessionStorage() {
  if (isIOS()) {
    window.sdkSessionStorage = altSessionStorage;
  } else if (isAndroid()) {
    window.sdkSessionStorage = sessionStorage;
  }
}
