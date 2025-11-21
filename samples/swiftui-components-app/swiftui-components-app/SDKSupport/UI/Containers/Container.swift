import ConstellationSdk
import SwiftUI

struct Container: View {
    @ObservedObject var state: ObservableComponent<ContainerComponent>

    init(_ component: ContainerComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        let visible = (state.component as? HideableComponent)?.visible ?? true
        if visible {
            ForEach(state.component.children, id: \.context.id) { child in
                child.renderView()
            }
        }
    }
}
