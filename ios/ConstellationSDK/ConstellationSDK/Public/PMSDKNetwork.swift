import Foundation
import OSLog

public class PMSDKNetwork {
    
    public static let shared = PMSDKNetwork()
    private init() {}
    public weak var requestDelegate: PMSDKNetworkRequestDelegate?
}

public protocol PMSDKNetworkRequestDelegate: AnyObject {
    func shouldHandle(request: URLRequest) -> Bool
    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)
}

enum HTTPHandlerError: Error {
    case delegateNotDefined
}

extension PMSDKNetwork {

    private static func canHandle(_ request: URLRequest) -> Bool {
        (PMSDKNetwork.shared.requestDelegate?.shouldHandle(request: request) ?? false)
    }

    static func send(_ request: URLRequest) async throws -> (Data, URLResponse) {
        guard let requestDelegate = PMSDKNetwork.shared.requestDelegate else {
            Logger.current().error("Network delegate not defined, cannot send request.")
            throw HTTPHandlerError.delegateNotDefined
        }
        // Remove "Authorization" header if necessary due to JS layer unnecessarily appending `undefined` value to it.
        var modifiedRequest = request
        if modifiedRequest.value(forHTTPHeaderField: "Authorization") == "undefined" {
            modifiedRequest.setValue(nil, forHTTPHeaderField: "Authorization")
        }
        if canHandle(modifiedRequest) {
            return try await requestDelegate.performRequest(modifiedRequest)
        }
        Logger.current().debug(
            "Sending request to \(modifiedRequest.url?.absoluteString ?? "nil") using built-in mechanism."
        )
        return try await URLSession.shared.data(for: modifiedRequest)
    }
}
