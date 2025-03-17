//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

open class TextInputBasedComponentProvider<T: TextInputBasedProps>: ComponentProvider {

    open var view: AnyView
    public let properties: T
    public let eventSubject: AnyPublisher<ComponentEvent, Never>

    public required init() {
        properties = T()
        let subject = PassthroughSubject<ComponentEvent, Never>()

        // TODO: simplify
        properties.onFocusChange = { input in
            guard
                let value = input["value"] as? String,
                let focus = input["focus"] as? Bool else
            {
                return
            }
            subject.send(
                ComponentEvent(
                    type: .fieldChangeWithFocus,
                    componentData: .init(value: value),
                    eventData: .init(focused: focus)
                )
            )
        }
        properties.onValueChange = { input in
            guard
                let value = input["value"] as? String,
                let focus = input["focus"] as? Bool else
            {
                return
            }
            subject.send(
                ComponentEvent(
                    type: .fieldChange,
                    componentData: .init(value: value),
                    eventData: .init(focused: focus)
                )
            )
        }
        eventSubject = subject.eraseToAnyPublisher()
        view = AnyView(Text("To be overridden"))
    }

    public func updateProperties(_ jsonInput: String) throws {
        fatalError("This method must be overridden in a subclass.")
    }
}
