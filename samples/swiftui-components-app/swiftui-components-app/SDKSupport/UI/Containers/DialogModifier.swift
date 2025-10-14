import ConstellationSdk
import SwiftUI

struct ComponentDialogModifier: ViewModifier {
    let config: () -> Dialog.Config?
    let dismiss: () -> Void

    @State private var promptValue = ""

    private var isPresented: Binding<Bool> {
        Binding(
            get: { config() != nil },
            set: { presented in
                if !presented {
                    promptValue = ""
                    dismiss()
                }
            }
        )
    }

    private var displayedPromptBinding: Binding<String> {
        Binding(
            get: {
                let def = config()?.promptDefault ?? ""
                return promptValue.isEmpty ? def : promptValue
            },
            set: { promptValue = $0 }
        )
    }

    @ViewBuilder
    private var buttons: some View {
        if let dialog = config() {
            switch dialog.type {
            case .alert:
                Button("OK", role: .cancel) {
                    dialog.onConfirm()
                    dismiss()
                }
            case .confirm:
                Button("OK", role: .destructive) {
                    dialog.onConfirm()
                    dismiss()
                }
                Button("Cancel", role: .cancel) {
                    dialog.onCancel()
                    dismiss()
                }
            case .prompt:
                Button("OK", role: .destructive) {
                    dialog.onPromptConfirm(promptValue)
                    promptValue = ""
                    dismiss()
                }
                Button("Cancel", role: .cancel) {
                    dialog.onCancel()
                    promptValue = ""
                    dismiss()
                }
            default:
                EmptyView()
            }
        }
    }

    func body(content: Content) -> some View {
        content.alert("", isPresented: isPresented) {
            if config()?.type == .prompt {
                TextField("", text: displayedPromptBinding)
            }
            buttons
        } message: {
            Text(config()?.message ?? "")
        }
    }
}

extension View {
    func componentDialog(config: @escaping () -> Dialog.Config?,
                         dismiss: @escaping () -> Void ) -> some View {
        modifier(ComponentDialogModifier(config: config,
                                         dismiss: dismiss))
    }
}
