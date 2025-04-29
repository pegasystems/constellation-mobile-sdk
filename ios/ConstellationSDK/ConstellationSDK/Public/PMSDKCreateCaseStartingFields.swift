import Foundation

public protocol PMSDKValue {}

extension Bool: PMSDKValue {}
extension Double: PMSDKValue {}
extension Float: PMSDKValue {}
extension Int: PMSDKValue {}
extension String: PMSDKValue {}
extension Array: PMSDKValue where Element: PMSDKValue {}
extension Dictionary: PMSDKValue where Key == String, Value: PMSDKValue {}

public class PMSDKCreateCaseStartingFields: Codable {

    private var storage: [String: PMSAnyCodingValue] = [:]

    public init() {
        storage = [:]
    }

    public func set<T: PMSDKValue>(value: T, forKey key: String) {
        storage[key] = PMSAnyCodingValue(value)
    }

    public func value(forKey key: String) -> PMSDKValue? {
        return storage[key] as? PMSDKValue
    }

    // MARK: - Codable Conformance

    public func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(storage)
    }

    public required init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        storage = try container.decode([String: PMSAnyCodingValue].self)
    }
}

struct PMSAnyCodingValue {

    /// The wrapped value.
    public let value: Any

    /// Creates a new instance from the given value.
    ///
    /// - parameter value: The object to wrap into a codable value.
    public init<T>(_ value: T?) {
        self.value = value ?? ()
    }
}

extension PMSAnyCodingValue: Codable {

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        if container.decodeNil() {
            self.init(())
        } else if let bool = try? container.decode(Bool.self) {
            self.init(bool)
        } else if let int = try? container.decode(Int.self) {
            self.init(int)
        } else if let float = try? container.decode(Float.self) {
            self.init(float)
        } else if let uint = try? container.decode(UInt.self) {
            self.init(uint)
        } else if let double = try? container.decode(Double.self) {
            self.init(double)
        } else if let string = try? container.decode(String.self) {
            self.init(string)
        } else if let array = try? container.decode([PMSAnyCodingValue].self) {
            self.init(array.map(\.value))
        } else if let dictionary = try? container.decode(
            [String: PMSAnyCodingValue].self
        ) {
            self.init(dictionary.mapValues { $0.value })
        } else {
            let description = "Value cannot be decoded."
            throw DecodingError
                .dataCorruptedError(
                    in: container,
                    debugDescription: description
                )
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        switch value {
        case is Void:
            try container.encodeNil()
        case let bool as Bool:
            try container.encode(bool)
        case let int as Int:
            try container.encode(int)
        case let int8 as Int8:
            try container.encode(int8)
        case let int16 as Int16:
            try container.encode(int16)
        case let int32 as Int32:
            try container.encode(int32)
        case let int64 as Int64:
            try container.encode(int64)
        case let uint as UInt:
            try container.encode(uint)
        case let uint8 as UInt8:
            try container.encode(uint8)
        case let uint16 as UInt16:
            try container.encode(uint16)
        case let uint32 as UInt32:
            try container.encode(uint32)
        case let uint64 as UInt64:
            try container.encode(uint64)
        case let float as Float:
            try container.encode(float)
        case let double as Double:
            try container.encode(double)
        case let string as String:
            try container.encode(string)
        case let date as Date:
            try container.encode(date)
        case let url as URL:
            try container.encode(url)
        case let array as [Any?]:
            try container.encode(array.map { PMSAnyCodingValue($0) })
        case let dictionary as [String: Any?]:
            try container.encode(dictionary.mapValues { PMSAnyCodingValue($0) })
        default:
            let description = "Value cannot be encoded."
            let context = EncodingError.Context(
                codingPath: container.codingPath,
                debugDescription: description
            )
            throw EncodingError.invalidValue(value, context)
        }
    }
}
