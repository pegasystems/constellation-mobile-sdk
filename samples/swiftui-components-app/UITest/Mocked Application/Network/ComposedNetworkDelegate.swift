import Foundation
import ConstellationSdk

enum ComposedNetworkResourceProviderError: Error {
    case noSuchDelegate
}

class ComposedNetworkResourceProvider: ResourceProvider {
    private var providers = [ResourceProvider]()

    func addProvider(_ provider: ResourceProvider) {
        providers.append(provider)
    }

    func shouldHandle(request: URLRequest) -> Bool {
        true
    }

    func performRequest(request: URLRequest) async throws -> KotlinPair<NSData, URLResponse> {
        let delegate = providers.first {
            $0.shouldHandle(request: request)
        }
        guard let delegate else {
            throw ComposedNetworkResourceProviderError.noSuchDelegate
        }

        return try await delegate.performRequest(request: request)
    }
}
