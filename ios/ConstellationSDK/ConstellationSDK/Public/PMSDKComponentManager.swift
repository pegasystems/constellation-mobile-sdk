import Foundation

public typealias ComponentProviderBlock = (() -> any ComponentProvider)

enum ComponentManagerError: Error {
    case unknownComponent
}

public enum PMSDKComponentManagerError: LocalizedError {
    case invalidURL
    case fileNotFound

    public var errorDescription: String? {
        switch self {
        case .invalidURL: "Provided URL shall point to local file."
        case .fileNotFound: "Provided URL shall point to existing file."
        }
    }
}

// This one is simplified implementation of original PMSDKComponentManager by mloct
// TODO: provide docs
public class PMSDKComponentManager {
    private init() {} // no-op, singleton

    public static let shared = PMSDKComponentManager()

    private var providersRegistry = [String: ComponentProviderBlock]()
    private var jsFilesRegistry = [String: URL]()

    private var defaultProviders: [String: any ComponentProvider.Type] = [
        "TextArea": TextAreaComponentProvider.self,
        "TextInput": TextInputComponentProvider.self,
        "URL": UrlComponentProvider.self,
        "Email": DefaultEmailComponentProvider.self,
        "Checkbox": DefaultCheckboxComponentProvider.self,
        "Currency": CurrencyComponentProvider.self,
        "Decimal": DecimalComponentProvider.self,
        "Date": DefaultDateComponentProvider.self,
        "Integer": IntegerComponentProvider.self,
        "Dropdown": DropdownComponentProvider.self,
        "RadioButtons": RadioButtonsComponentProvider.self,

        "Region": ViewComponentProvider.self,
        "View": ViewComponentProvider.self,
        "ViewContainer": ViewComponentProvider.self,
        "FlowContainer": FlowContainerComponentProvider.self,
        "Assignment": ViewComponentProvider.self,
        "AssignmentCard": AssignmentCardComponentProvider.self,
        "RootContainer": RootContainerComponentProvider.self,
        "DefaultForm": ViewComponentProvider.self,

        "ActionButtons": ActionButtonsProvider.self,
        "AlertBanner": AlertBannerComponentProvider.self,

        "Unsupported": UnsupportedComponentProvider.self
    ]

    func create(_ type: String) throws -> any ComponentProvider {
        if let customProvider = providersRegistry[type] {
             customProvider()
        } else if let defaultProvider = defaultProviders[type] {
            defaultProvider.init()
        } else {
            throw ComponentManagerError.unknownComponent
        }
    }

    var componentOverrideString: String {
        var keyDictionary = [String: String]()
        jsFilesRegistry.keys.forEach {
            keyDictionary[$0] = $0
        }
        return if
            let encoded = try? JSONEncoder().encode(keyDictionary),
            let string = String(data: encoded, encoding: .utf8)
        { string } else { "" }
    }

    func componentFileContents(_ type: String) throws -> String {
        if let url = jsFilesRegistry[type] {
            try String(contentsOf: url)
        } else {
            throw ComponentManagerError.unknownComponent
        }
    }

    public func register(_ type: String, provider: @escaping ComponentProviderBlock) {
        providersRegistry[type] = provider
    }

    public func register(
        _ type: String,
        jsFile fileUrl: URL,
        provider: @escaping ComponentProviderBlock
    ) throws {
        if !fileUrl.isFileURL {
            throw PMSDKComponentManagerError.invalidURL
        }
        if !FileManager.default.fileExists(atPath: fileUrl.path()) {
            throw PMSDKComponentManagerError.fileNotFound
        }
        jsFilesRegistry[type] = fileUrl
        providersRegistry[type] = provider
    }
}
