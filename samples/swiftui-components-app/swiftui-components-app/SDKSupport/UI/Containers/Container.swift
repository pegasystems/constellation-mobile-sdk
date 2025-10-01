import SdkEngineWebViewKit
import SwiftUI

struct Container: View {
    @ObservedObject var state: ObservableComponent<ContainerComponent>

    init(_ component: ContainerComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        ForEach(state.component.children, id: \.context.id) { child in
            child.renderView()
        }
    }
}
