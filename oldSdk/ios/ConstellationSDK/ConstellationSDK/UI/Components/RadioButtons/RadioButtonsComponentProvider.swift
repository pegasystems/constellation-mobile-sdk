import Foundation
import SwiftUI
import Combine

open class RadioButtonsComponentProvider: ComponentProvider {
    
    public let view: AnyView
    public let properties: RadioButtonsProps
    public let eventSubject: AnyPublisher<ComponentEvent, Never>

    public required init() {
        properties = RadioButtonsProps()
        let subject = PassthroughSubject<ComponentEvent, Never>()
        eventSubject = subject.eraseToAnyPublisher()
        view = AnyView(RadioButtonsView(properties: properties))
        
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
            .decode(DecodableRadioButtonsProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
    
}

fileprivate struct DecodableRadioButtonsProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?
    var options: [[String: String]] = []

    func apply(to observableProps: RadioButtonsProps) {
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
        observableProps.options = options
    }
}
