import Foundation
import AuthenticationServices
import OAuth2

class Authentication {
    private let oauth: OAuth2CodeGrant
    private let context = ASPresentationAnchor()

    init(settings: [String : Any]) {
        oauth = OAuth2CodeGrant(settings: settings as OAuth2JSON)
        oauth.authConfig.authorizeEmbedded = true
        oauth.authConfig.authorizeContext = context
    }

    convenience init(oauthJsonFile: String) throws {
        guard
            let url = Bundle.main.url(forResource: oauthJsonFile, withExtension: "json")
        else {
            throw CocoaError(.fileNoSuchFile)
        }
        guard
            let configuration = try JSONSerialization.jsonObject(
                with: try Data(contentsOf: url)
            ) as? [String : Any]
        else {
            throw CocoaError(.coderReadCorrupt)
        }

        self.init(settings: configuration)
    }


    func prepareOauthClient() async throws -> OAuth2 {
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
