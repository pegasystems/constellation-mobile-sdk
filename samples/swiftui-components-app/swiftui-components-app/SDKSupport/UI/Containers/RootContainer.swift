import ConstellationSdk
import SwiftUI

struct RootContainer: View {
    @ObservedObject var state: ObservableComponent<RootContainerComponent>
    @State private var promptValue: String = ""

    init(_ component: RootContainerComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        if let container = state.component.viewContainer {
            container.renderView()
                .alert("", isPresented: presentDialog) {
                    if (state.component.dialogConfig?.type == .prompt) {
                        TextField("", text: displayedPromptBinding)
                    }
                    dialogButtons
                } message: {
                    Text(state.component.dialogConfig?.message ?? "")
                }
        }
    }
    
    @ViewBuilder
    private var dialogButtons: some View {
        if let dialog = state.component.dialogConfig {
            switch dialog.type {
            case .alert:
                Button("OK", role: .cancel, action: confirmAndDismiss)
            case .confirm:
                Button("OK", role: .destructive, action: confirmAndDismiss)
                Button("Cancel", role: .cancel, action: cancelAndDismiss)
            case .prompt:
                Button("OK", role: .destructive, action: promptConfirmAndDismiss)
                Button("Cancel", role: .cancel, action: cancelAndDismiss)
            default:
                EmptyView()
            }
        }
    }
    
    private var displayedPromptBinding: Binding<String> {
        Binding(
            get: {
                promptValue.isEmpty ? (state.component.dialogConfig?.promptDefault ?? "") : promptValue
            },
            set: {
                promptValue = $0
            }
        )
    }
    
    private func promptConfirmAndDismiss() {
        state.component.dialogConfig?.onPromptConfirm(promptValue)
        promptValue = ""
        state.component.dismissDialog()
    }
    
    private func confirmAndDismiss() {
        state.component.dialogConfig?.onConfirm()
        state.component.dismissDialog()
    }

    private func cancelAndDismiss() {
        state.component.dialogConfig?.onCancel()
        promptValue = ""
        state.component.dismissDialog()
    }
    
    private var presentDialog: Binding<Bool> {
        Binding(
            get: { state.component.dialogConfig != nil },
            set: { if !$0 { state.component.dismissDialog() } }
        )
    }
}
