import Foundation
import ConstellationSDK

enum ComposedNetworkDelegateError: Error {
    case noSuchDelegate
}

class ComposedNetworkDelegate: PMSDKNetworkRequestDelegate {
    private var delegates = [PMSDKNetworkRequestDelegate]()

    func addDelegate(_ delegate: PMSDKNetworkRequestDelegate) {
        delegates.append(delegate)
    }

    func shouldHandle(request: URLRequest) -> Bool {
        true
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        let delegate = delegates.first {
            $0.shouldHandle(request: request)
        }
        guard let delegate else {
            throw ComposedNetworkDelegateError.noSuchDelegate
        }

        return try await delegate.performRequest(request)
    }
}
