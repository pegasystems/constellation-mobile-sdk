import Combine
import SwiftUI

public class AssignmentCardComponentProps : ObservableObject, ComponentProps {
    @Published public var actionButtons: ViewID? = nil
    @Published public var children: [ViewID] = []
    @Published public var loading: Bool = true
}

struct DecodableAssignmentCardComponentProps: Decodable {
    let children: [String]
    let actionButtons: String?
    let loading: Bool?

    func apply(to observableProps: AssignmentCardComponentProps) {
        observableProps.children = children.map {
            ViewID(stringId: $0)
        }
        observableProps.actionButtons = actionButtons.map {
            ViewID(stringId: $0)
        }
        observableProps.loading = loading ?? false
    }
}
