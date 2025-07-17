import Foundation
import OSLog

public class PMSDKNetwork {

    public static let shared = PMSDKNetwork()
    private init() {}
    public weak var requestDelegate: PMSDKNetworkRequestDelegate?

    private let localProvider = BundledResourcesProvider()
    private let componentProvider = ComponentAssetsProvider()
    private let defaultProvider = DefaultProvider()
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
        var modifiedRequest = request
        let allowedHeaders = ["accept", "context", "if-match", "content-type"]
        modifiedRequest.allHTTPHeaderFields = request.allHTTPHeaderFields?.filter { allowedHeaders.contains($0.key.lowercased()) }
        return try await PMSDKNetwork.shared.delegate(for: modifiedRequest).performRequest(modifiedRequest)
    }
}
