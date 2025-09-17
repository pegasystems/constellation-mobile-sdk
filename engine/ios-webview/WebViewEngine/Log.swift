import Foundation
import OSLog

final class Log {
    private static var loggers = [String: Logger]()
    private static let subsystem = Bundle(for: Log.self).bundleIdentifier ?? "Unknown"
    private static let queue = DispatchQueue(label: "Logger")
    private static var logLevel: OSLogType = .debug

    private init() {
        // use static methods
    }

    class func debug(_ message: String, _ file: String = #file) {
        log(.debug, message: message, file: file)
    }

    class func info(_ message: String, _ file: String = #file) {
        log(.info, message: message, file: file)
    }

    class func warning(_ message: String, _ file: String = #file) {
        log(.error, message: message, file: file)
    }

    class func error(_ message: String, _ file: String = #file) {
        log(.fault, message: message, file: file)
    }

    private class func log(_ level: OSLogType, message: String, file: String) {
        queue.async {
            logger(file).log(level: level, "\(message)")
        }
    }

    private class func logger(_ category: String) -> Logger {
        if let logger = loggers[category] {
            return logger
        } else {
            let newLogger = Logger(subsystem: subsystem, category: category)
            loggers[subsystem] = newLogger
            return newLogger
        }
    }
}
