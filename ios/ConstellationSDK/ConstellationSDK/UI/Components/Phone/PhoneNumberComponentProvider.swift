import Foundation
import SwiftUI
import Combine

open class PhoneNumberComponentProvider: ComponentProvider {
    public let view: AnyView
    public let properties: PhoneNumberProps
    public let eventSubject: AnyPublisher<ComponentEvent, Never>

    public required init() {
        properties = PhoneNumberProps()
        view = AnyView(PhoneNumberView(properties: properties))

        Publishers.CombineLatest(properties.$country, properties.$domesticNumber)
            .map { [weak properties] country, domesticNumber -> String in
                let cleanedNumber = domesticNumber.replacingOccurrences(of: " ", with: "")
                if properties?.showCountryCode ?? false {
                    return (country.dial_code) + cleanedNumber
                } else {
                    return cleanedNumber
                }
            }
            .assign(to: &properties.$value)

        let focusPublisher = properties.$isFocused.map { [weak properties] focused in
            ComponentEvent(
                type: .fieldChangeWithFocus,
                componentData: .init(value: properties?.value ?? ""),
                eventData: .init(focused: focused)
            )
        }

        let valuePublisher = properties.$value.map { [weak properties] value in
            ComponentEvent(
                type: .fieldChangeWithFocus,
                componentData: .init(value: value),
                eventData: .init(focused: properties?.isFocused ?? false)
            )
        }

        eventSubject = valuePublisher
            .merge(with: focusPublisher)
            .eraseToAnyPublisher()
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodablePhoneNumberProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodablePhoneNumberProps: Decodable {
    let value: String
    let label: String
    let visible: Bool
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let helperText: String?
    let placeholder: String
    let showCountryCode: Bool
    let validateMessage: String?

    func apply(to observableProps: PhoneNumberProps) {
        observableProps.label = label
        observableProps.visible = visible
        observableProps.required = required
        observableProps.disabled = disabled
        observableProps.readOnly = readOnly
        observableProps.placeholder = placeholder.nilIfEmpty
        observableProps.showCountryCode = showCountryCode
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.validateMessage = validateMessage?.nilIfEmpty

        if showCountryCode {
            let parsedNumber = PhoneParser.parse(value)
            observableProps.country = parsedNumber.country
            observableProps.domesticNumber = parsedNumber.number
        } else {
            observableProps.domesticNumber = value
        }
    }
}
