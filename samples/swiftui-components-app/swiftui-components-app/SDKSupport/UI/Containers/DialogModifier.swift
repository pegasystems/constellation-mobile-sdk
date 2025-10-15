import ConstellationSdk
import SwiftUI

struct DialogModifier: ViewModifier {
    let config: () -> Dialog.Config?
    let onDismiss: () -> Void

    @State private var promptValue = ""

    private var isPresented: Binding<Bool> {
        Binding(
            get: {
                config() != nil
            },
            set: { presented in
                if !presented {
                    onDismiss()
                }
            }
        )
    }

    @ViewBuilder
    private var buttons: some View {
        if let dialog = config() {
            switch dialog.type {
            case .alert:
                Button("OK", role: .cancel) {
                    dialog.onConfirm()
                }
            case .confirm:
                Button("OK", role: .destructive) {
                    dialog.onConfirm()
                }
                Button("Cancel", role: .cancel) {
                    dialog.onCancel()
                }
            case .prompt:
                Button("OK", role: .destructive) {
                    dialog.onPromptConfirm(promptValue)
                }
                Button("Cancel", role: .cancel) {
                    dialog.onCancel()
                }
            default:
                EmptyView()
            }
        }
    }

    func body(content: Content) -> some View {
        content
            .alert("", isPresented: isPresented) {
            if config()?.type == .prompt {
                TextField("", text: $promptValue)
            }
            buttons
        } message: {
            Text(config()?.message ?? "")
        }
        .onChange(of: isPresented.wrappedValue) {
            if isPresented.wrappedValue {
                promptValue = config()?.promptDefault ?? ""
            }
        }
    }
}

extension View {
    func dialog(config: @escaping () -> Dialog.Config?,
                onDismiss: @escaping () -> Void ) -> some View {
        modifier(DialogModifier(config: config, onDismiss: onDismiss))
    }
}
