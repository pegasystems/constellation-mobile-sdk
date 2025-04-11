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

        let resourceHandler = ResourceHandler(baseURL: baseURL)

        let formHandler = FormHandler(manager: manager) { [weak self] result in
            self?.stop()
            completionHandler(result)
        }

        let webView = createWebView(with: resourceHandler, formHandler: formHandler)
        self.webView = webView
        self.webView?.uiDelegate = self

        webView.isInspectable = true

        webView.loadSimulatedRequest(
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

        let injector = ScriptInjector(for: webView)
        Task { @MainActor in
            do {
                try await Task.sleep(for: .seconds(0.5))
                try await injector.inject("Console")

                try await Task.sleep(for: .seconds(0.5))
                try await injector.inject("FormHandler")

                try await Task.sleep(for: .seconds(0.5))
                try await injector.inject("c11n")

                try await Task.sleep(for: .seconds(0.5))
                try await callInit(configuration)
            } catch {
                Logger.current().error("Error during engine initialisation: \(error)")
            }
        }
    }

    private func stop() {
        webView = nil
        manager = ComponentManager()
    }

    @MainActor
    private func callInit(_ configuration: Configuration) async throws {
        let overrideString = PMSDKComponentManager.shared.componentOverrideString
        let configString = try configuration.toString()
        try await webView?.evaluateJavaScript(
            "window.init('\(configString)', '\(overrideString)');0"
        )
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
