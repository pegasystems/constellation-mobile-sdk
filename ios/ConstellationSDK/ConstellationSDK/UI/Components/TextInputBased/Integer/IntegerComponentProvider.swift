import Foundation
import SwiftUI
import Combine

open class IntegerComponentProvider: TextInputBasedComponentProvider<IntegerProps> {

    required public init() {
        super.init()
        view = AnyView(IntegerView(properties: properties))
    }

    public override func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableIntegerProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableIntegerProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?
    let displayMode: String?

    func apply(to observableProps: IntegerProps) {
        observableProps.value = value
        observableProps.label = label
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.placeholder = placeholder?.nilIfEmpty
        observableProps.required = required
        observableProps.disabled = if displayMode == "DISPLAY_ONLY" {
            true
        } else {
            disabled
        }
        observableProps.readOnly = readOnly
        observableProps.validateMessage = validateMessage?.nilIfEmpty
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.visible = visible ?? true
    }
}
