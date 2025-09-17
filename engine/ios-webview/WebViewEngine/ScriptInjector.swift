import Foundation
import WebKit

class ScriptInjector {
    private var bundle = Bundle(for: Engine.self)
    private var scripts = [String]()

    private func loadScript(_ name: String) throws -> String {
        guard let path = bundle.path(forResource: name, ofType: "js") else {
            throw CocoaError(.fileNoSuchFile)
        }
        return try String(contentsOfFile: path)
    }

    func load(_ name: String) throws {
        Log.debug("Loading \(name)")
        let script = try loadScript(name)
        Log.debug("\(name) loaded, size = \(script.count)")
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
