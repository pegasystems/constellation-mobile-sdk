import BaseCmpApp
import WebViewEngine

class AuthenticatedResourceProvider: ResourceProvider {
    private let authManager: AuthManager

    init(authManager: AuthManager) {
        self.authManager = authManager
    }

    func shouldHandle(request: URLRequest) -> Bool {
        true
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        if let token = try await authManager.getAccessToken() {
            try await URLSession.shared.data(for: request.authorizedRequest(with: token))
        } else {
            // neither token returned nor error thrown - let's try to make request without token
            try await URLSession.shared.data(for: request)
        }
    }
}

extension URLRequest {
    fileprivate func authorizedRequest(with token: String) -> URLRequest {
        var mutableRequest = self
        mutableRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        return mutableRequest
    }
}
