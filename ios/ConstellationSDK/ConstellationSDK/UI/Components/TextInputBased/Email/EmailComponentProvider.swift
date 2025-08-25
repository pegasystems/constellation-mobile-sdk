import Foundation
import SwiftUI
import Combine

open class DefaultEmailComponentProvider: TextInputBasedComponentProvider<EmailProps> {
    
    required public init() {
        super.init()
        view = AnyView(EmailView(properties: properties))
    }

    public override func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableTextEmailProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableTextEmailProps: Decodable {
    let value: String
    let label: String
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?
    let displayMode: String?

    func apply(to observableProps: EmailProps) {
        observableProps.value = value
        observableProps.label = label
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
