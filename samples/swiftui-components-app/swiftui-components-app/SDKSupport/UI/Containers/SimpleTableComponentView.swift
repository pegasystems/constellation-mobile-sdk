import ConstellationSdk
import SwiftUI

struct SimpleTableComponentView: View {
    @ObservedObject var state: ObservableComponent<SimpleTableComponent>

    init(_ component: SimpleTableComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        if let child = state.component.child {
            child.renderView()
        }
    }
}
