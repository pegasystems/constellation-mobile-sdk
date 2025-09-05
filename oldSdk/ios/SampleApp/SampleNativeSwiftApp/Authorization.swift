import Foundation
import AuthenticationServices
import OAuth2

class Authorization {
    private let oauth: OAuth2CodeGrant
    private let context = ASPresentationAnchor()

    init(settings: [String : Any]) {
        oauth = OAuth2CodeGrant(settings: settings as OAuth2JSON)
        oauth.authConfig.authorizeEmbedded = true
        oauth.authConfig.authorizeContext = context
    }

    func prepareOAuthClient() async throws -> OAuth2 {
        if !oauth.hasUnexpiredAccessToken() {
            try await authorize()
        }

        return oauth
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
