//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import WebKit
import OSLog

class ScriptInjector {
    private weak var webView: WKWebView?
    private var bundle = Bundle(for: WebViewEngine.self)

    init(for webView: WKWebView?) {
        self.webView = webView
    }

    private func loadScript(_ name: String) throws -> String {
        guard let path = bundle.path(forResource: name, ofType: "js") else {
            throw CocoaError(.fileNoSuchFile)
        }
        return try String(contentsOfFile: path)
    }

    @MainActor
    func inject(_ name: String) async throws {
        Logger.current().debug("Loading of \(name) started")
        let script = try loadScript(name) + ";0"
        Logger.current().debug("\(name) size = \(script.count)")
        Logger.current().debug("Loaded \(name), evaluating...")
        try await webView?.evaluateJavaScript(script)
        Logger.current().debug("Evaluation of \(name) completed.")
    }

}
