import SdkEngineWebViewKit
import SwiftUI

struct FieldViewWrapper: View {
    @ObservedObject var state: ObservableComponent<FieldComponent>
    private var innerView: () -> any View

    private var isDisplayOnly: Bool {
        state.component.displayMode != .editable
    }

    init(_ component: FieldComponent, innerView: @escaping () -> any View) {
        self.state = ObservableComponent(component: component)
        self.innerView = innerView
    }

    var body: some View {
        Group {
            if state.component.visible {
                if isDisplayOnly {
                    valueView()
                } else {
                    AnyView(innerView()).opacity(state.component.disabled ? 0.5 : 1)
                }
            }
        }
        .animation(.easeInOut, value: state.component.visible)
    }

    @ViewBuilder
    private func valueView() -> some View {
        HStack {
            if !state.component.label.isEmpty {
                Text(state.component.label)
            }
            if state.component.value.isEmpty {
                Text("---")
            } else {
                Text(state.component.value)
            }
        }.font(.title3).foregroundStyle(.gray)
    }
}
