class NetworkProvider: PMSDKNetworkRequestDelegate {
    private let ignoredBaseURL: URL
    private let session = URLSession(configuration: .ephemeral)

    init(ignoredBaseURL: URL) {
        self.ignoredBaseURL = ignoredBaseURL
    }

    func shouldHandle(request: URLRequest) -> Bool {
        request.url?.absoluteString.starts(with: ignoredBaseURL.absoluteString) == false
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        try await session.data(for: request)
    }
}
