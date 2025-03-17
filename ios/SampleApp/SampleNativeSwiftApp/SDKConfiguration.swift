//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation

class SDKConfiguration {
    
    static var environmentURL: URL = {
        guard let urlString = Bundle.main.infoDictionary?["PegaSystemURL"] as? String,
              let url = URL(string: urlString) else {
            fatalError("Cannot retrieve Pega System URL")
        }
        return url
    }()
    
    static var accessToken: String = {
        guard let accessToken = Bundle.main.infoDictionary?["PegaOAuth2AccessToken"] as? String else {
            fatalError("Cannot retrieve Pega OAuth2 access token")
        }
        return accessToken
    }()
    
    static var caseClassName: String = {
        guard let className = Bundle.main.infoDictionary?["PegaCaseClassName"] as? String else {
            fatalError("Cannot retrieve Case class name.")
        }
        return className
    }()
}

