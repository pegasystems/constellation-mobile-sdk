//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Combine
import SwiftUI

class AssignmentCardComponentProps : ObservableObject, ComponentProps {
    @Published var actionButtons: ViewID? = nil
    @Published var children: [ViewID] = []
    @Published var loading: Bool = true
}

struct DecodableAssignmentCardComponentProps: Decodable {
    let children: [String]
    let actionButtons: String?

    func apply(to observableProps: AssignmentCardComponentProps) {
        observableProps.children = children.map {
            ViewID(stringId: $0)
        }
        observableProps.actionButtons = actionButtons.map {
            ViewID(stringId: $0)
        }
    }
}
