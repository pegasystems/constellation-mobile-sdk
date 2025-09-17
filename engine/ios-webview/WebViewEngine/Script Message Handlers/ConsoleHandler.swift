import Foundation
import WebKit

final class ConsoleHandler: NSObject, WKScriptMessageHandler {
    let decoder = JSONDecoder()
    let showDebugLogs: Bool

    init(showDebugLogs: Bool) {
        self.showDebugLogs = showDebugLogs
    }

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard
            let input = message.body as? [Any],
            let logLevel = input[0] as? Int,
            let logMessage = input[1] as? String
        else {
            Log.error("Unexpected input passed from JS")
            return
        }

        guard showDebugLogs || logLevel <= 2 else {
            return
        }

        switch logLevel {
        case 1: Log.error("JS: \(logMessage)")
        case 2: Log.warning("JS: \(logMessage)")
        default: Log.info("JS: \(logMessage)")
        }
    }
    
}
