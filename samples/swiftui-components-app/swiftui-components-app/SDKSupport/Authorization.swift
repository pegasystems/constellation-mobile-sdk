import Foundation
import AuthenticationServices
import OAuth2

/*
 * Wraps OAuth2CodeGrant from OAuth2 library to provide asynchronous
 * API for retrieving access token. Current implementation is intended
 * for demonstration purposes only, as it does not allows refresh flow.
 */
class Authorization {
    private let oauth: OAuth2CodeGrant
    private let context = ASPresentationAnchor()

    init(settings: [String : Any]) {
        oauth = OAuth2CodeGrant(settings: settings as OAuth2JSON)
        oauth.authConfig.authorizeEmbedded = true
        oauth.authConfig.authorizeContext = context
    }

    func accessToken() async throws -> String {
        if !oauth.hasUnexpiredAccessToken() {
            try await authorize()
        }

        if let token = oauth.accessToken {
            return token
        } else {
            throw OAuth2Error.noAccessToken
        }
    }

    private func authorize() async throws {
        try await withCheckedThrowingContinuation { (continuation: CheckedContinuation<Void, Error>) -> Void in
            oauth.authorize() { _, error in
                if let error {
                    continuation.resume(throwing: error)
                } else {
                    continuation.resume()
                }
            }
        }
    }
}
