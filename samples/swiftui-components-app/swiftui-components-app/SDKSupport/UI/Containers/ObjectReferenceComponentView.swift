import ConstellationSdk
import SwiftUI

struct ObjectReferenceComponentView: View {
    @ObservedObject var state: ObservableComponent<ObjectReferenceComponent>

    init(_ component: ObjectReferenceComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        if state.component.visible {
            VStack(alignment: .leading, spacing: 5) {
                if state.component.isDisplayOnly && !state.component.label.isEmpty {
                    Text(state.component.label)
                        .foregroundStyle(.gray)
                }
                ForEach(state.component.children, id: \.context.id) { child in
                    child.renderView()
                }
            }
        }
    }
}
