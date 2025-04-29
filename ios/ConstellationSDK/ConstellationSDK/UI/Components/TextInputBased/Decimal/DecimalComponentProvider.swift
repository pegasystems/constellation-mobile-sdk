import Foundation
import SwiftUI
import Combine

open class DecimalComponentProvider: TextInputBasedComponentProvider<DecimalProps> {
    
    required public init() {
        super.init()
        view = AnyView(DecimalView(properties: properties))
    }
    
    public override func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableDecimalProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableDecimalProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?
    let decimalPrecision: Int?
    let showGroupSeparators: Bool
    
    func apply(to observableProps: DecimalProps) {
        observableProps.value = value
        observableProps.label = label
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.placeholder = placeholder?.nilIfEmpty
        observableProps.required = required
        observableProps.disabled = disabled
        observableProps.readOnly = readOnly
        observableProps.validateMessage = validateMessage?.nilIfEmpty
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.visible = visible ?? true
        observableProps.showGroupSeparators = showGroupSeparators
        observableProps.decimalPrecision = decimalPrecision ?? 0
    }
}
