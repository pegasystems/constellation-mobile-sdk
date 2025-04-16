import Foundation
import WebKit
import OSLog

class ScriptInjector {
    private var bundle = Bundle(for: WebViewEngine.self)
    private var scripts = [String]()

    private func loadScript(_ name: String) throws -> String {
        guard let path = bundle.path(forResource: name, ofType: "js") else {
            throw CocoaError(.fileNoSuchFile)
        }
        return try String(contentsOfFile: path)
    }

    func load(_ name: String) throws {
        Logger.current().debug("Loading \(name)")
        let script = try loadScript(name)
        Logger.current().debug("\(name) loaded, size = \(script.count)")
        scripts.append(script)
    }

    func append(script: String) {
        scripts.append("(function () {" + script + "})();")
    }

    @MainActor
    func inject(into webView: WKWebView) async throws {
        try await webView.evaluateJavaScript(scripts.joined(separator: ";") + ";0")
    }
}
