//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import WebKit
import OSLog

class ConsoleHandler: NSObject, WKScriptMessageHandler {
    let decoder = JSONDecoder()

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard
            let input = message.body as? [Any],
            let logLevel = input[0] as? Int,
            let logMessage = input[1] as? String
        else {
            Logger.current().error("Unexpected input passed from JS")
            return
        }

        switch logLevel {
        case 1: Logger.current().error("JS: \(logMessage)")
        case 2: Logger.current().warning("JS: \(logMessage)")
        default: Logger.current().info("JS: \(logMessage)")
        }
    }
    
}
