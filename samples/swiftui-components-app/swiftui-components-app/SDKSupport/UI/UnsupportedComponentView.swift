import ConstellationSdk
import SwiftUI

struct UnsupportedComponentView: View {
    @ObservedObject var state: ObservableComponent<UnsupportedComponent>

    init(_ component: UnsupportedComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack {
            if state.component.visible {
                contentView
            }
        }
        .animation(.easeInOut, value: state.component.visible)
    }

    private var contentView: some View {
        HStack(spacing: 10) {
            Text("Component not supported: <\(state.component.type)>").padding()
        }
        .background(Color(red: 0.6, green: 0.7, blue: 0.9))
        .cornerRadius(10)
    }
}
