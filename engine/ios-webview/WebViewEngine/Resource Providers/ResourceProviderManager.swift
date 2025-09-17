import Foundation

class ResourceProviderManager: ResourceHandlerDelegate {
    private weak var customDelegate: ResourceProvider?

    private let networkProvider: NetworkProvider
    private let localProvider = BundledResourcesProvider()
    //private let componentProvider = ComponentAssetsProvider()
    private let defaultProvider = DefaultProvider()

    init(baseURL: URL, customDelegate: ResourceProvider?) {
        networkProvider = .init(ignoredBaseURL: baseURL)
        self.customDelegate = customDelegate
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        try await delegate(for: request)
            .performRequest(
                request.removingUnwantedHeaders()
            )
    }

    private func delegate(for request: URLRequest) -> ResourceProvider {
        switch (true) {
        //case componentProvider.shouldHandle(request: request):
        //    componentProvider
        case localProvider.shouldHandle(request: request):
            localProvider
        case networkProvider.shouldHandle(request: request):
            networkProvider
        case customDelegate?.shouldHandle(request: request):
            customDelegate ?? defaultProvider
        default:
            defaultProvider
        }
    }
}
