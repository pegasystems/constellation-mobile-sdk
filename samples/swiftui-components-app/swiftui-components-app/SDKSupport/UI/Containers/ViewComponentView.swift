import ConstellationSdk
import SwiftUI

struct ViewComponentView: View {
    @ObservedObject var state: ObservableComponent<ViewComponent>

    init(_ component: ViewComponent) {
        state = ObservableComponent(component: component)
    }

    private var contentView: some View {
        VStack {
            if state.component.showLabel {
                Text(state.component.label)
                    .font(.title2)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.top, 20)
            }
            ForEach(state.component.children, id: \.context.id) { child in
                child.renderView()
            }
        }
    }

    var body: some View {
        VStack {
            if state.component.visible {
                contentView
            }
        }
        .animation(.easeInOut, value: state.component.visible)
    }
}
