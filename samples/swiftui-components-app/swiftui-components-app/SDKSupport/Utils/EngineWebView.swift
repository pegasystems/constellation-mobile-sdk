import SwiftUI
import UIKit
import ConstellationSdk

struct EngineWebView: UIViewRepresentable {
    private let webView: UIView

    init(_ engine: WKWebViewBasedEngine) {
        self.webView = engine.webView
    }

    func makeUIView(context: Context) -> UIView {
        webView
    }

    func updateUIView(_ uiView: UIView, context: Context) {
        // no-op
    }
}
