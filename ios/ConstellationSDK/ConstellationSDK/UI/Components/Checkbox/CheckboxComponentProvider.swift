//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

class DefaultCheckboxComponentProvider: ComponentProvider {

    let view: AnyView
    let properties: CheckboxProps
    let eventSubject: AnyPublisher<ComponentEvent, Never>

    required init() {
        properties = CheckboxProps()
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
        view = AnyView(CheckboxView(properties: properties))
    }

    func updateProperties(_ jsonInput: String) throws {
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
