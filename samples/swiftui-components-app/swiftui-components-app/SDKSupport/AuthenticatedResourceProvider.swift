import SdkEngineWebViewKit
import OSLog

/*
 * Provides means of authentication for multiplatform engine
 * by acquiring token from the Authorization object and
 */
class AuthenticatedResourceProvider: ResourceProvider {
    private let authorization: Authorization
    private let log = Logger(
        subsystem: "SwiftUIDemo",
        category: "AuthenticatedResourceProvider"
    )

    init(authorization: Authorization) {
        self.authorization = authorization
    }

    func shouldHandle(request: URLRequest) -> Bool {
        true
    }

    func performRequest(request: URLRequest) async throws -> KotlinPair<NSData, URLResponse> {
        let token = try await authorization.accessToken()
        log.debug("Request to \(request.url?.absoluteString ?? "(unknown)")")
        let (data, response) = try await URLSession.shared.data(
            for: request.authorizedRequest(with: token)
        )
        return KotlinPair(first: data as NSData, second: response)
    }
}

extension URLRequest {
    fileprivate func authorizedRequest(with token: String) -> URLRequest {
        var mutableRequest = self
        mutableRequest.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        return mutableRequest
    }
}
