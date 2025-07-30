import Foundation
import WebKit
import Combine

extension WebViewEngine {
    struct Configuration: Codable {
        let url: URL
        let version: String
        let caseClassName: String
        let startingFields: PMSDKCreateCaseStartingFields
        let debuggable: Bool

        fileprivate func toString() throws -> String {
            String(
                decoding: try JSONEncoder().encode(self),
                as: UTF8.self)
            .replacingOccurrences(of: "\n", with: " ")
        }
    }
}

enum WebViewEngineError: Error {
    case incorrectBaseURL
}

class WebViewEngine: NSObject {
    private var webView: WKWebView?
    private var initialNavigation: WKNavigation?
    private var configuration: Configuration

    let bundle = Bundle(for: ComponentManager.self)
    let manager = ComponentManager()
    private var formHandler: FormHandler?

    init(configuration: Configuration) throws {
        guard (try? configuration.url.standardizingBaseURL()) != nil else {
            Log.error("Can not get standardized base url from configuration.")
            throw WebViewEngineError.incorrectBaseURL
        }
        self.configuration = configuration
    }

    deinit {
        Log.debug("Engine deinit.")
    }

    private func createWebView(with resourceHandler: ResourceHandler, formHandler: FormHandler) -> WKWebView {
        let config = WKWebViewConfiguration()

        WebViewOverride.isRegisteringURLSchemeHandler = true
        config.setURLSchemeHandler(resourceHandler, forURLScheme: "http")
        config.setURLSchemeHandler(resourceHandler, forURLScheme: "https")
        WebViewOverride.isRegisteringURLSchemeHandler = false

        config.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        config.userContentController.add(formHandler, name: "formHandler")
        config.userContentController.add(
            ConsoleHandler(showDebugLogs: configuration.debuggable),
            name: "consoleHandler"
        )

        return WKWebView(frame: .zero, configuration: config)
    }

    @MainActor
    func startProcessing() async -> CaseProcessingResult {
        guard let baseURL = try? configuration.url.standardizingBaseURL() else {
            Log.error("Can not get standardized base url from configuration.")
            return .error("Can not get standardized base url from configuration.")
        }

        if let formHandler {
            return await formHandler.processingResult()
        }

        let resourceHandler = ResourceHandler(baseURL: baseURL)

        let formHandler = FormHandler(manager: manager)

        let webView = createWebView(with: resourceHandler, formHandler: formHandler)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        self.webView = webView

        webView.isInspectable = configuration.debuggable

        let indexURL = baseURL.appending(
            path: "constellation-mobile-sdk-assets/scripts/index.html"
        )

        initialNavigation = webView.load(URLRequest(url: indexURL))

        manager.componentEventCallback = { [weak webView] id, event in
            webView?.evaluateJavaScript(
                "window.sendEventToComponent(\(id), '\(event)')"
            )
        }
        manager.formSubmitCallback = { [weak webView] in
            webView?.evaluateJavaScript("submitForm()")
        }

        let result = await formHandler.processingResult()
        initialNavigation = nil
        manager.reset()
        self.webView = nil
        return result
    }
}

extension WebViewEngine : WKUIDelegate {

    @MainActor
    func webView(
        _ webView: WKWebView,
        runJavaScriptAlertPanelWithMessage message: String,
        initiatedByFrame frame: WKFrameInfo,
        completionHandler: @escaping @MainActor () -> Void
    ) {
        manager.rootComponent.presentAlert(message: message) {
            completionHandler()
        }
    }

    @MainActor
    func webView(
        _ webView: WKWebView,
        runJavaScriptConfirmPanelWithMessage message: String,
        initiatedByFrame frame: WKFrameInfo,
        completionHandler: @escaping @MainActor (Bool) -> Void
    ) {
        manager.rootComponent.presentConfirm(message: message) { result in
            completionHandler(result)
        }
    }

//    @MainActor
//    func webView(
//        _ webView: WKWebView,
//        runJavaScriptTextInputPanelWithPrompt prompt: String,
//        defaultText: String?,
//        initiatedByFrame frame: WKFrameInfo,
//        completionHandler: @escaping @MainActor (String?) -> Void
//    ) {
//        // TODO: implement
//    }
}

extension WebViewEngine: WKNavigationDelegate {
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard navigation == initialNavigation else {
            return
        }
        Log.info("Initial navigation completed, injecting scripts.")
        manager.rootComponent.injectInvisible(webView)
        let injector = ScriptInjector()
        Task {
            do {
                try injector.load("Console")
                try injector.load("FormHandler")
                injector.append(script: try initScript(configuration))
                try await injector.inject(into: webView)
            } catch {
                Log.error("Error during engine initialisation: \(error)")
            }
        }
    }

    private func initScript(_ configuration: Configuration) throws -> String {
        let overrideString = PMSDKComponentManager.shared.componentOverrideString
        let configString = try configuration.toString()

        return """
        window.onload = function() {
           window.init('\(configString)', '\(overrideString)');
        }
        """
    }
}

extension URL {
    fileprivate func standardizingBaseURL() throws -> URL {
        if absoluteString.last == "/" {
            standardized
        } else if let newURL = URL(string: standardized.absoluteString + "/") {
            newURL
        } else {
            throw CocoaError(.formatting)
        }
    }
}
