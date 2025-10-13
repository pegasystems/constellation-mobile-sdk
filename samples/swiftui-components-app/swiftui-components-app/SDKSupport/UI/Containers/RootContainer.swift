import ConstellationSdk
import SwiftUI

struct RootContainer: View {
    @ObservedObject var state: ObservableComponent<RootContainerComponent>

    init(_ component: RootContainerComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        if let container = state.component.viewContainer {
            container.renderView()
                .alert("", isPresented: presentDialog) {
                    dialogButtons
                } message: {
                    Text(state.component.dialogConfig?.message ?? "Unknown error")
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
            default:
                EmptyView()
            }
        }
    }
    
    private func confirmAndDismiss() {
        state.component.dialogConfig?.onConfirm()
        state.component.dismissDialog()
    }

    private func cancelAndDismiss() {
        state.component.dialogConfig?.onCancel()
        state.component.dismissDialog()
    }
    
    private var presentDialog: Binding<Bool> {
        Binding(
            get: { state.component.dialogConfig != nil },
            set: { if !$0 { state.component.dismissDialog() } }
        )
    }
}
