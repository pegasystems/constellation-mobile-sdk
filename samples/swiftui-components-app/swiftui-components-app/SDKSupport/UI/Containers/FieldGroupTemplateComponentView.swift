import WebviewKit
import SwiftUI

struct FieldGroupTemplateComponentView: View {
    @ObservedObject var state: ObservableComponent<FieldGroupTemplateComponent>

    init(_ component: FieldGroupTemplateComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack {
            ForEach(state.component.items, id: \.id) {
                Text($0.heading).font(.title2)
                $0.component.renderView()
            }
        }
    }
}
