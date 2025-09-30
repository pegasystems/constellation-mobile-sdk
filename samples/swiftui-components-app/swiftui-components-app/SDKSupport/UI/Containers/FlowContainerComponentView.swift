import WebviewKit
import SwiftUI

struct FlowContainerComponentView: View {
    @ObservedObject var state: ObservableComponent<FlowContainerComponent>

    init(_ component: FlowContainerComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack {
            if !state.component.title.isEmpty {
                Text(state.component.title)
                    .font(.title)
            }
            ForEach(state.component.alertBanners, id: \.context.id) {
                AnyView($0.render())
                    .cornerRadius(10)
            }
            if let assignment = state.component.assignment {
                AnyView(assignment.render())
                    .cornerRadius(10)
            }
        }
    }
}
