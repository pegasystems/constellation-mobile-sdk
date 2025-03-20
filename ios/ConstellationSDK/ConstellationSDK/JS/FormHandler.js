//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

iosWVJSEngine=true;

sdkbridge = {
  updateComponent: function(param, param2) {
      window.webkit.messageHandlers.formHandler.postMessage(["updateComponent", String(param), param2]);
  },

  addComponent: function(param, param2) {
      window.webkit.messageHandlers.formHandler.postMessage(["addComponent", String(param), param2]);
  },

  removeComponent: function(param) {
      window.webkit.messageHandlers.formHandler.postMessage(["removeComponent", String(param)]);
  },

  onReady: function() {
      window.webkit.messageHandlers.formHandler.postMessage(["ready"]);
  },

  onFinished: function(successMessage) {
      window.webkit.messageHandlers.formHandler.postMessage(["finished", successMessage]);
  },

  onCancelled: function() {
      window.webkit.messageHandlers.formHandler.postMessage(["cancelled"]);
  },

  onError: function(error) {
      console.error("onError not implemented.");
  }
};
