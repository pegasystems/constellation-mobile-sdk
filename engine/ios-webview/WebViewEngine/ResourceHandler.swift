import Foundation
import WebKit
import Combine

enum ResourceHandlerError: Error {
    case networkDelegateDeallocated
    case unknown
}

protocol ResourceHandlerDelegate: AnyObject {
    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)
}

class ResourceHandler: NSObject, WKURLSchemeHandler {
    private var tasks = [URLRequest: AnyCancellable]()
    private weak var delegate: ResourceHandlerDelegate?

    init(delegate: ResourceHandlerDelegate) {
        self.delegate = delegate
    }

    private func send(_ request: URLRequest) async throws -> (Data, URLResponse) {
        if let delegate {
            try await delegate.performRequest(request)
        } else {
            throw ResourceHandlerError.networkDelegateDeallocated
        }
    }

    func webView(_ webView: WKWebView, start urlSchemeTask: any WKURLSchemeTask) {
        let task = Task {
            do {
                let (data, response) = try await send(urlSchemeTask.request)
                guard !Task.isCancelled else { return }
                tasks[urlSchemeTask.request] = nil
                urlSchemeTask.didReceive(response)
                urlSchemeTask.didReceive(data)
                urlSchemeTask.didFinish()
            } catch {
                guard !Task.isCancelled else { return }
                Log.error(error.localizedDescription)
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
