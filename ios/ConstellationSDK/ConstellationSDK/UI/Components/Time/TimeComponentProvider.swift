import Foundation
import SwiftUI
import Combine

open class DefaultTimeComponentProvider: ComponentProvider {

    public let view: AnyView
    public let properties: TimeProps
    public let eventSubject: AnyPublisher<ComponentEvent, Never>

    public required init() {
        properties = TimeProps()
        let subject = PassthroughSubject<ComponentEvent, Never>()
        eventSubject = subject.eraseToAnyPublisher()
        view = AnyView(TimeView(properties: properties))

        properties.onValueChange = { input in
            guard
                let value = input["value"] as? String else
            {
                return
            }
            subject.send(
                ComponentEvent(
                    type: .fieldChangeWithFocus,
                    componentData: .init(value: value),
                    eventData: .init(focused: false)
                )
            )
        }
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableTimeProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableTimeProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?
    let clockFormat: String?
    let displayMode: String?

    func apply(to observableProps: TimeProps) {
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
        observableProps.is24Hour = switch clockFormat?.nilIfEmpty {
            case "12": false
            case "24": true
            default: nil
        }
    }
}
