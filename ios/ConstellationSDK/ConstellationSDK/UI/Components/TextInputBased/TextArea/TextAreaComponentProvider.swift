//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Combine
import Foundation
import SwiftUI

open class TextAreaComponentProvider: TextInputBasedComponentProvider<TextAreaProps> {
    
    required public init() {
        super.init()
        view = AnyView(TextAreaView(properties: properties))
    }

    public override func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableTextAreaProps.self,
                    from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

fileprivate struct DecodableTextAreaProps: Decodable {
    let value: String
    let label: String
    let helperText: String?
    let placeholder: String?
    let visible: Bool?
    let required: Bool
    let disabled: Bool
    let readOnly: Bool
    let validateMessage: String?

    func apply(to observableProps: TextAreaProps) {
        observableProps.value = value
        observableProps.label = label
        observableProps.helperText = helperText?.nilIfEmpty
        observableProps.placeholder = placeholder?.nilIfEmpty
        observableProps.required = required
        observableProps.disabled = disabled
        observableProps.readOnly = readOnly
        observableProps.validateMessage = validateMessage?.nilIfEmpty
        observableProps.visible = visible ?? true
    }
}
