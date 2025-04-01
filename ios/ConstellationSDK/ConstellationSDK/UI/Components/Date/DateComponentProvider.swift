//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

class DefaultDateComponentProvider: ComponentProvider {

    let view: AnyView
    let properties: DateProps
    let eventSubject: AnyPublisher<ComponentEvent, Never>

    required init() {
        properties = DateProps()
        let subject = PassthroughSubject<ComponentEvent, Never>()
        eventSubject = subject.eraseToAnyPublisher()
        view = AnyView(DateView(properties: properties))
        
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
            .decode(DecodableDateProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableDateProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?

    func apply(to observableProps: DateProps) {
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
    }
}
