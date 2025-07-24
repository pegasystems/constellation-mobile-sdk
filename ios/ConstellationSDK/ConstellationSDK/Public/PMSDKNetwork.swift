import Foundation
import OSLog

public class PMSDKNetwork {

    public static let shared = PMSDKNetwork()
    private init() {}
    public weak var requestDelegate: PMSDKNetworkRequestDelegate?

    private let localProvider = BundledResourcesProvider()
    private let componentProvider = ComponentAssetsProvider()
    private let defaultProvider = DefaultProvider()
    private static let disallowedHeaders = [
        "Referer",
        "Origin",
        "X-Requested-With",
        "User-Agent",
        "sec-ch-ua*"
    ].map { $0.lowercased() }
}

public protocol PMSDKNetworkRequestDelegate: AnyObject {
    func shouldHandle(request: URLRequest) -> Bool
    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)
}

enum HTTPHandlerError: Error {
    case delegateNotDefined
}

extension PMSDKNetwork {

    private func delegate(for request: URLRequest) throws -> PMSDKNetworkRequestDelegate {
        guard let requestDelegate else {
            // customer-provided network delegate is always required
            Logger.current().error("Network delegate not defined, cannot send request.")
            throw HTTPHandlerError.delegateNotDefined
        }

        return switch (true) {
        case componentProvider.shouldHandle(request: request):
            componentProvider
        case localProvider.shouldHandle(request: request):
            localProvider
        case requestDelegate.shouldHandle(request: request):
            requestDelegate
        default:
            PMSDKNetwork.shared.defaultProvider
        }
    }

    static func send(_ request: URLRequest) async throws -> (Data, URLResponse) {
        // Remove "Authorization" header if necessary due to JS layer unnecessarily appending `undefined` value to it.
        var modifiedRequest = request
        if modifiedRequest.value(forHTTPHeaderField: "Authorization") == "undefined" {
            modifiedRequest.setValue(nil, forHTTPHeaderField: "Authorization")
        }
        modifiedRequest.allHTTPHeaderFields = request.allHTTPHeaderFields?
            .filter { PMSDKNetwork.isHeaderAllowed($0.key.lowercased()) }
        return try await PMSDKNetwork.shared.delegate(for: modifiedRequest).performRequest(modifiedRequest)
    }

    private static func isHeaderAllowed(_ key: String) -> Bool {
        !disallowedHeaders.contains { header in
            if header.hasSuffix("*") {
                let prefix = String(header.dropLast())
                return key.hasPrefix(prefix)
            } else {
                return key == header
            }
        }
    }
}
