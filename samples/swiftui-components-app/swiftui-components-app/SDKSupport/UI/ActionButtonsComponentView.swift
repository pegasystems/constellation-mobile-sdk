import WebviewKit
import SwiftUI

struct ActionButtonsComponentView: View {
    @ObservedObject var state: ObservableComponent<ActionButtonsComponent>

    init(_ component: ActionButtonsComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        HStack {
            buildButtons(isPrimary: false)
            buildButtons(isPrimary: true)
        }
    }

    private func handleTap(_ button: ActionButton) {
        let event = ComponentEvent.Companion().forActionButtonClick(
            buttonType: button.type,
            jsAction: button.jsAction
        )
        state.component.context.sendComponentEvent(
            event: event
        )
    }

    @ViewBuilder
    private func buildButtons(isPrimary: Bool) -> some View {
        HStack {
            ForEach(
                isPrimary ? state.component.primaryButtons : state.component.secondaryButtons,
                id: \.name
            ) { buttonInfo in
                Button(action: {
                    handleTap(buttonInfo)
                }) {
                    Text(buttonInfo.name)
                        .padding(8)
                        .frame(maxWidth: .infinity)
                        .foregroundColor(.white)
                        .background(isPrimary ? .blue : .gray)
                        .cornerRadius(10)
                }
            }
        }
    }
}
