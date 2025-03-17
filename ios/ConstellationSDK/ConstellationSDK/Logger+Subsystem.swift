//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import OSLog

extension Logger {
    private static let subsystem = Bundle(for: PMSDKNetwork.self).bundleIdentifier ?? "Unknown"

    private static var loggers = [String: Logger]()

    static func current(_ category: String = #file) -> Logger {
        if let logger = loggers[category] {
            return logger
        } else {
            let newLogger = Logger(subsystem: subsystem, category: category)
            loggers[subsystem] = newLogger
            return newLogger
        }
    }
}
