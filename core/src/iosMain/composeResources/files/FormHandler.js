(function () {
    window.iosWVJSEngine=true;

    window.sdkbridge = {
        updateComponent: function(cId, props) {
            window.webkit.messageHandlers.formHandler.postMessage(["updateComponent", String(cId), props]);
        },

        addComponent: function(cId, cType) {
            window.webkit.messageHandlers.formHandler.postMessage(["addComponent", String(cId), cType]);
        },

        removeComponent: function(cId) {
            window.webkit.messageHandlers.formHandler.postMessage(["removeComponent", String(cId)]);
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
