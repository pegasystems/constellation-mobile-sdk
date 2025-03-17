//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

iosWVJSEngine=true;

sdkbridge = {
  updateProps: function(param, param2) {
      window.webkit.messageHandlers.formHandler.postMessage(["upadateComponentProps", String(param), param2]);
  },

  addComponent: function(param, param2) {
      window.webkit.messageHandlers.formHandler.postMessage(["addComponent", String(param), param2]);
  },

  removeComponent: function(param) {
      window.webkit.messageHandlers.formHandler.postMessage(["removeComponent", String(param)]);
  },

  formFinished(successMessage) {
      window.webkit.messageHandlers.formHandler.postMessage(["finished", successMessage]);
  },

  formCancelled() {
      window.webkit.messageHandlers.formHandler.postMessage(["cancelled"]);
  }
};
