//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

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

        if
            urlSchemeTask.request.mainDocumentURL == baseURL,
            urlSchemeTask.request.url?.relativePath.contains("prweb/assets") ?? false,
            let fileName = urlSchemeTask.request.url?.lastPathComponent,
            let content = try? PMSDKComponentManager.shared.componentFileContents(fileName)
        {
            Logger.current().debug("Responding with component file of \(fileName)")
            respond(
                to: urlSchemeTask,
                with: Data(content.utf8),
                contentType: "text/javascript"
            )
            return
        }

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

    private func respond(
        to urlSchemeTask: any WKURLSchemeTask,
        with data: Data,
        contentType: String? = nil
    ) {
        let headers: [String: String]? = if let contentType {
            ["Content-Type": contentType]
        } else {
            nil
        }

        let response = HTTPURLResponse(
            url: urlSchemeTask.request.url ?? baseURL,
            statusCode: 200,
            httpVersion: nil,
            headerFields: headers
        )!

        urlSchemeTask.didReceive(response)
        urlSchemeTask.didReceive(data)
        urlSchemeTask.didFinish()
    }
}
