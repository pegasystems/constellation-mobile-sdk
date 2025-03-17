//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation

public struct ComponentEvent: Encodable {
    let type: EventType
    let componentData: ComponentData
    let eventData: EventData?

    public init(type: EventType, componentData: ComponentData, eventData: EventData?) {
        self.type = type
        self.componentData = componentData
        self.eventData = eventData
    }
}

public extension ComponentEvent {
    enum EventType: String, Encodable {
        case fieldChange = "FieldChange"
        case fieldChangeWithFocus = "FieldChangeWithFocus"
        case actionButtonClick = "ActionButtonClick"
    }

    // TODO: Split/simplify. Android uses map instead.
    struct ComponentData: Encodable {
        let value: String?
        let buttonType: String?
        let jsAction: String?
        public init(value: String) {
            self.value = value
            self.buttonType = nil
            self.jsAction = nil
        }
        public init(buttonType: String, jsAction: String) {
            self.value = nil
            self.buttonType = buttonType
            self.jsAction = jsAction
        }
    }
    struct EventData: Encodable {
        let focused: Bool
        public init(focused: Bool) {
            self.focused = focused
        }
    }
}
