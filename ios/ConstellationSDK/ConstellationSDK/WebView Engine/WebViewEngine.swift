import Foundation
import WebKit
import Combine
import OSLog

extension WebViewEngine {
    struct Configuration: Codable {
        let url: URL
        let version: String
        let caseClassName: String
        let startingFields: PMSDKCreateCaseStartingFields

        fileprivate func toString() throws -> String {
            String(
                decoding: try JSONEncoder().encode(self),
                as: UTF8.self)
            .replacingOccurrences(of: "\n", with: " ")
        }
    }
}

class WebViewEngine: NSObject {
    private var webView: WKWebView?
    private var initialNavigation: WKNavigation?
    private var configuration: Configuration?

    let bundle = Bundle(for: ComponentManager.self)
    private(set) var manager = ComponentManager()

    override init() {}

    deinit {
        Logger.current().debug("Engine deinit.")
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
            ConsoleHandler(),
            name: "consoleHandler"
        )

        return WKWebView(frame: .zero, configuration: config)
    }

    func start(
        _ configuration: Configuration,
        completionHandler: @escaping CaseProcessingResultHandler
    ) {
        if !Thread.isMainThread {
            DispatchQueue.main.async {
                self.start(configuration, completionHandler: completionHandler)
            }
        }

        guard let baseURL = try? configuration.url.standardizingBaseURL() else {
            Logger.current().error("Can not get standardized base url from configuration.")
            return
        }

        guard self.webView == nil else {
            Logger.current().error("Engine already started.")
            return
        }

        self.configuration = configuration

        let resourceHandler = ResourceHandler(baseURL: baseURL)

        let formHandler = FormHandler(manager: manager) { [weak self] result in
            self?.stop()
            completionHandler(result)
        }

        let webView = createWebView(with: resourceHandler, formHandler: formHandler)
        webView.uiDelegate = self
        webView.navigationDelegate = self
        self.webView = webView

        webView.isInspectable = true

        initialNavigation = webView.loadSimulatedRequest(
            URLRequest(url: baseURL),
            responseHTML: "<html><header></header><body></body></html>"
        )

        manager.componentEventCallback = { [weak webView] id, event in
            webView?.evaluateJavaScript(
                "window.sendEventToComponent(\(id), '\(event)')"
            )
        }
        manager.formSubmitCallback = { [weak webView] in
            webView?.evaluateJavaScript("submitForm()")
        }
    }

    func stop() {
        webView = nil
        initialNavigation = nil
        configuration = nil
        manager = ComponentManager()
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
        self.manager.rootComponent.presentAlert(message: message) {
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
        self.manager.rootComponent.presentConfirm(message: message) { result in
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
        guard let configuration else {
            Logger.current().error("Unknown configuration.")
            return
        }
        Logger.current().info("Initial navigation completed, injecting scripts.")
        let injector = ScriptInjector()
        Task {
            do {
                try injector.load("Console")
                try injector.load("FormHandler")
                try injector.load("c11n")
                injector.append(script: try initScript(configuration))
                try await injector.inject(into: webView)
            } catch {
                Logger.current().error("Error during engine initialisation: \(error)")
            }
        }
    }

    private func initScript(_ configuration: Configuration) throws -> String {
        let overrideString = PMSDKComponentManager.shared.componentOverrideString
        let configString = try configuration.toString()
        return "window.init('\(configString)', '\(overrideString)');"
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
