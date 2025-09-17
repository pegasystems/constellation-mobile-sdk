import Combine
import Foundation
import WebKit

public protocol EngineEventHandler {
    func handleEvent(_ event: Engine.Event)
}

public class Engine: NSObject {
    private let config: Configuration

    private let webView: WKWebView
    private let resourceProviderManager: ResourceProviderManager
    private let formHandler: FormHandler

    private var initialNavigation: WKNavigation?
    private var initScript: String?
    private var eventStreamCancellable: AnyCancellable?

    public init(
        config: Configuration,
        handler: any EngineEventHandler,
        provider: (any ResourceProvider)?
    ) {
        self.config = config

        resourceProviderManager = ResourceProviderManager(
            baseURL: config.url,
            customDelegate: provider
        )
        let resourceHandler = ResourceHandler(delegate: resourceProviderManager)

        let wkConfig = WKWebViewConfiguration()

        WebViewOverride.isRegisteringURLSchemeHandler = true
        wkConfig.setURLSchemeHandler(resourceHandler, forURLScheme: "http")
        wkConfig.setURLSchemeHandler(resourceHandler, forURLScheme: "https")
        WebViewOverride.isRegisteringURLSchemeHandler = false

        wkConfig.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        wkConfig.userContentController.add(
            ConsoleHandler(showDebugLogs: config.debuggable),
            name: "consoleHandler"
        )

        formHandler = FormHandler(eventHandler: handler)
        wkConfig.userContentController.add(
            formHandler,
            name: "formHandler"
        )

        webView = WKWebView(frame: .zero, configuration: wkConfig)
    }

    public func load(caseClassName: String, startingFields: [String : Any]) {
        formHandler.handleLoading()
        self.initScript = try? initScript(
            overrideString: "{}",
            Configuration(
                config,
                caseClassName: caseClassName
            )
        )

        //webView.uiDelegate = self
        webView.navigationDelegate = self
        webView.isInspectable = config.debuggable

        let indexURL = config.url.appending(
            path: "constellation-mobile-sdk-assets/scripts/index.html"
        )

        initialNavigation = webView.load(URLRequest(url: indexURL))
    }

    private func initScript(overrideString: String, _ configuration: Configuration) throws -> String {
        let configString = try configuration.toString()

        return """
        window.onload = function() {
           window.init('\(configString)', '\(overrideString)');
        }
        """
    }
}

extension Engine: WKNavigationDelegate {
    public func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        guard navigation == initialNavigation else {
            return
        }
        Log.info("Initial navigation completed, injecting scripts.")
        let injector = ScriptInjector()
        Task {
            do {
                try injector.load("Console")
                try injector.load("FormHandler")
                injector.append(script: initScript ?? "")
                try await injector.inject(into: webView)
            } catch {
                Log.error("Error during engine initialisation: \(error)")
            }
        }
        eventStreamCancellable = formHandler.eventStream.sink { [weak webView] event in
            webView?.evaluateJavaScript(
                "window.sendEventToComponent(\(event.id), '\(event.eventContent)')"
            )
        }
    }
}

extension Engine {
    public struct Configuration: Encodable {
        let url: URL
        let version: String
        let caseClassName: String?
        //let startingFields: [String : Encodable]
        let debuggable: Bool

        // do not encode 'debuggable' and 'requestDelegate'
        private enum CodingKeys: String, CodingKey {
            case url, version, caseClassName //, startingFields
        }

        public init(url: URL, version: String, debuggable: Bool) {
            self.url = url
            self.version = version
            self.caseClassName = nil
            self.debuggable = debuggable
        }

        init(_ configuration: Configuration, caseClassName: String) {
            self.url = configuration.url
            self.version = configuration.version
            self.caseClassName = caseClassName
            self.debuggable = configuration.debuggable
        }

        fileprivate func toString() throws -> String {
            String(
                decoding: try JSONEncoder().encode(self),
                as: UTF8.self
            )
            .replacingOccurrences(of: "\n", with: " ")
        }
    }
}

extension Engine {
    public enum Event {
        case loading
        case ready
        case finished(String?)
        case error(String?)
        case cancelled

        case addComponent(ComponentContext)
        case updateComponent(ComponentData)
        case removeComponent(Int)

        public struct ComponentData {
            public let id: Int
            public let data: String
        }

        public struct ComponentContext {
            public let id: Int
            public let type: String
            public let updateHandler: (String) -> Void
        }
    }
}
