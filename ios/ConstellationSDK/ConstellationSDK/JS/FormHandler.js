(function () {
    window.iosWVJSEngine=true;

    window.sdkbridge = {
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

        onError: function(errorMessage) {
            window.webkit.messageHandlers.formHandler.postMessage(["error", errorMessage]);
        }
    };
})();
