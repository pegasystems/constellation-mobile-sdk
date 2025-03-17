//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

open class UrlComponentProvider: TextInputBasedComponentProvider<UrlProps> {

    required public init() {
        super.init()
        view = AnyView(UrlView(properties: properties))
    }

    public override func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableUrlProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableUrlProps: Decodable {
    let value: String
    let label: String
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?
    let helperText: String?

    func apply(to observableProps: UrlProps) {
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
