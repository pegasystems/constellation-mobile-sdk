import Foundation
import WebKit
import Combine

class ResourceHandler: NSObject, WKURLSchemeHandler {
    private var tasks = [URLRequest: AnyCancellable]()
    private var httpHandler: HTTPHandler

    init(httpHandler: HTTPHandler) {
        self.httpHandler = httpHandler
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        let absoluteUrl = (urlSchemeTask.request.url?.absoluteString ?? "")
        Log.debug("Starting task for \(absoluteUrl)")
        let task = Task {
            do {
                let (data, response) = try await httpHandler.send(urlSchemeTask.request)
                guard !Task.isCancelled else { return }
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
            } catch {
                guard !Task.isCancelled else { return }
                Log.debug("Task for \(absoluteUrl) has finished with error: \(error)")
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
