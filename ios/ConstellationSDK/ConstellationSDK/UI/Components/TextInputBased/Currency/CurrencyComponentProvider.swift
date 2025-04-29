import Foundation
import SwiftUI
import Combine

open class CurrencyComponentProvider: TextInputBasedComponentProvider<CurrencyProps> {

    required public init() {
        super.init()
        view = AnyView(CurrencyView(properties: properties))
    }

    public override func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableCurrencyProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableCurrencyProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?
    let currencyISOCode: String?
    let showISOCode: Bool?
    let decimalPrecision: Int

    func apply(to observableProps: CurrencyProps) {
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
        observableProps.currencyISOCode = currencyISOCode ?? ""
        observableProps.showISOCode = showISOCode ?? false
        observableProps.decimalPrecision = decimalPrecision
    }
}
