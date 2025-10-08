import ConstellationSdk
import SwiftUI

struct TextInputComponentView: View {
    @ObservedObject var state: ObservableComponent<FieldComponent>
    @State var inputValue: String
    @FocusState private var isFocused: Bool

    private let keyboardType: UIKeyboardType

    init(_ component: FieldComponent, keyboardType: UIKeyboardType = .default) {
        state = ObservableComponent(component: component)
        inputValue = component.value
        self.keyboardType = keyboardType
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            FieldLabelView(
                label: state.component.label,
                required: state.component.required
            )

            HStack {
                TextField(
                    text: $inputValue,
                    prompt: Text(state.component.placeholder)
                        .foregroundStyle(Color.gray).fontWeight(.light),
                    label: {
                        Text(state.component.value)
                            .foregroundStyle(Color.black).fontWeight(.semibold)
                    }
                )
                .keyboardType(keyboardType)
                .disabled(state.component.disabled || state.component.readOnly)
                .focused($isFocused)

                FieldCheckmarkView(
                    validateMessage: state.component.validateMessage,
                    value: state.component.value
                )
            }
            .padding()
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerSize: CGSize(
                width: 10,
                height: 10
            )))
            .overlay {
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(isFocused ? Color.blue : Color.gray, lineWidth: 3)
            }
            FieldMessageView(
                helperText: state.component.helperText,
                validateMessage: state.component.validateMessage
            )
        }.onChange(of: isFocused) { _, newValue in
            state.component.updateFocus(focused: newValue)
        }.onChange(of: inputValue) { _, newValue in
            state.component.updateValue(value: newValue)
        }.onAppear {
            BindingChangeSource.install(
                binding: $inputValue,
                component: state.component,
                keypath: \.value
            )
        }
    }
}
