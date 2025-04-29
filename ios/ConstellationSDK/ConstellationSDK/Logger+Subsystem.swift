import Foundation
import OSLog

extension Logger {
    private static let subsystem = Bundle(for: PMSDKNetwork.self).bundleIdentifier ?? "Unknown"

    private static var loggers = [String: Logger]()
    private static let queue = DispatchQueue(label: "Logger")

    static func current(_ category: String = #file) -> Logger {
        var result: Logger? = nil
        queue.sync {
            if let logger = loggers[category] {
                result = logger
            } else {
                let newLogger = Logger(subsystem: subsystem, category: category)
                loggers[subsystem] = newLogger
                result = newLogger
            }
        }
        return result ?? Logger(subsystem: subsystem, category: category)
    }
}
