import ConstellationSdk
import SwiftUI

struct DefaultFormView: View {
    @ObservedObject var state: ObservableComponent<DefaultFormComponent>

    init(_ component: DefaultFormComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack {
            if !state.component.instructionsText.isEmpty {
                Text(state.component.instructionsText)
            }
            ForEach(state.component.children, id: \.context.id) { child in
                child.renderView()
            }
        }
    }
}
