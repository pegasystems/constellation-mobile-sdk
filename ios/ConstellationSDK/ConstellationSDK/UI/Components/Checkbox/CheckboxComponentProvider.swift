import Foundation
import SwiftUI
import Combine

open class DefaultCheckboxComponentProvider: ComponentProvider {

    public let view: AnyView
    public let properties: CheckboxProps
    public let eventSubject: AnyPublisher<ComponentEvent, Never>

    public required init() {
        properties = CheckboxProps()
        let subject = PassthroughSubject<ComponentEvent, Never>()
        
        properties.onFocusChange = { input in
            guard
                let value = input["value"] as? Bool,
                let focus = input["focus"] as? Bool else
            {
                return
            }
            subject.send(
                ComponentEvent(
                    type: .fieldChangeWithFocus,
                    componentData: .init(value: String(value)),
                    eventData: .init(focused: focus)
                )
            )
        }
        properties.onValueChange = { input in
            guard
                let value = input["value"] as? Bool,
                let focus = input["focus"] as? Bool else
            {
                return
            }
            subject.send(
                ComponentEvent(
                    type: .fieldChange,
                    componentData: .init(value: String(value)),
                    eventData: .init(focused: focus)
                )
            )
        }
        eventSubject = subject.eraseToAnyPublisher()
        view = AnyView(CheckboxView(properties: properties))
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableCheckboxProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableCheckboxProps: Decodable {
    let value: Bool
    let caption: String
    let label: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?

    func apply(to observableProps: CheckboxProps) {
        observableProps.value = value
        observableProps.label = label
        observableProps.required = required
        observableProps.disabled = disabled
        observableProps.readOnly = readOnly
        observableProps.caption = caption
        observableProps.validateMessage = validateMessage?.nilIfEmpty
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.visible = visible ?? true
    }
}
