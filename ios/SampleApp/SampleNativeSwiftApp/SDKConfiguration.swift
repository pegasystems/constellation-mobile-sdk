import Foundation

class SDKConfiguration {
    
    static var environmentURL: URL = {
        guard let urlString = Bundle.main.infoDictionary?["PegaSystemURL"] as? String,
              let url = URL(string: urlString) else {
            fatalError("Cannot retrieve Pega System URL")
        }
        return url
    }()
    
    static var oauth2Configuration: [String: Any] = {
        guard let oauth2Config = Bundle.main.infoDictionary?["PegaOAuth2Configuration"] as? [String: Any] else {
            fatalError("Cannot retrieve OAuth2 configuration.")
        }
        return oauth2Config
    }()

    static var caseClassName: String = {
        guard let className = Bundle.main.infoDictionary?["PegaCaseClassName"] as? String else {
            fatalError("Cannot retrieve Case class name.")
        }
        return className
    }()
}

