import Combine
import SwiftUI

public class ViewComponentProps : ObservableObject, ComponentProps {
    @Published public var title: String? = nil
    @Published public var showLabel: Bool = false
    @Published public var label: String = ""
    @Published public var instructions: String? = nil
    @Published public var children: [ViewID] = []
    @Published public var loading: Bool = true
    @Published public var visible: Bool = true
}

struct DecodableViewComponentProps: Decodable {
    let children: [String]
    let title: String?
    let instructions: String?
    let showLabel: Bool?
    let label: String?
    let visible: Bool?
    let loading: Bool?

    func apply(to observableProps: ViewComponentProps) {
        observableProps.children = children.map {
            ViewID(stringId: $0)
        }
        observableProps.title = title
        observableProps.instructions = instructions
        observableProps.showLabel = showLabel ?? false
        observableProps.label = label ?? ""
        observableProps.visible = visible ?? true
        observableProps.loading = loading ?? false
    }
}
