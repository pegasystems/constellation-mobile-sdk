import ConstellationSdk
import SwiftUI

struct FieldGroupTemplateComponentView: View {
    @ObservedObject var state: ObservableComponent<FieldGroupTemplateComponent>

    init(_ component: FieldGroupTemplateComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            if state.component.showLabel && !state.component.label.isEmpty {
                Text(state.component.label)
            }
            ForEach(state.component.items, id: \.id) {
                Text($0.heading).font(.title2)
                $0.component.renderView()
            }
        }
    }
}
