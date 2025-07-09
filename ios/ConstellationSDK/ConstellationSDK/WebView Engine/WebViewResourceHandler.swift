import Foundation
import WebKit
import Combine
import OSLog

class ResourceHandler: NSObject, WKURLSchemeHandler {
    private var tasks = [URLRequest: AnyCancellable]()
    private var bundle = Bundle(for: WebViewEngine.self)
    private let baseURL: URL

    init(baseURL: URL) {
        self.baseURL = baseURL
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        let absoluteUrl = (urlSchemeTask.request.url?.absoluteString ?? "")
        Logger.current().debug("Starting task for \(absoluteUrl)")
        let task = Task {
            do {
                let (data, response) = try await PMSDKNetwork.send(urlSchemeTask.request)
                guard !Task.isCancelled else { return }
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
            } catch {
                guard !Task.isCancelled else { return }
                urlSchemeTask.didFailWithError(error)
            }
        }
        tasks[urlSchemeTask.request] = AnyCancellable {
            task.cancel()
        }
    }

    func webView(_ webView: WKWebView, stop urlSchemeTask: any WKURLSchemeTask) {
        tasks[urlSchemeTask.request]?.cancel()
        tasks[urlSchemeTask.request] = nil
    }
}
