import Foundation

class SDKConfiguration {
    
    static var environmentURL: URL = {
        guard let urlString = Bundle.main.infoDictionary?["PegaSystemURL"] as? String,
              let url = URL(string: urlString) else {
            fatalError("Cannot retrieve Pega System URL")
        }
        return url
    }()

    static var environmentVersion: String = {
        guard let version = Bundle.main.infoDictionary?["PegaVersion"] as? String else {
            fatalError("Cannot retrieve Pega System Version.")
        }
        return version
    }()

    static var oauth2Configuration: [String: Any] = {
        guard let oauth2Config = Bundle.main.infoDictionary?["PegaAuthConfiguration"] as? [String: Any] else {
            fatalError("Cannot retrieve OAuth2 configuration.")
        }
        return oauth2Config
    }()
}

