import SdkEngineWebViewKit
import SwiftUI

struct TextAreaComponentView: View {
    @ObservedObject var state: ObservableComponent<TextAreaComponent>
    @State var inputValue: String
    @FocusState private var isFocused: Bool

    private let characterLimit = 100

    init(_ component: TextAreaComponent) {
        state = ObservableComponent(component: component)
        inputValue = component.value
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            FieldLabelView(
                label: state.component.label,
                required: state.component.required
            )

            HStack() {
                TextEditor(text: $inputValue)
                    .frame(minHeight: 100)
                    .font(.body)
                    .focused($isFocused)
                    .disabled(state.component.disabled || state.component.readOnly)
                    .onChange(of: inputValue) { _, newValue in
                        if newValue.count > characterLimit {
                            inputValue = String(newValue.prefix(characterLimit))
                        }
                    }

                FieldCheckmarkView(
                    validateMessage: state.component.validateMessage,
                    value: inputValue
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

            HStack {
                Spacer()
                Text("\(inputValue.count) of \(characterLimit)")
                    .foregroundColor(inputValue.count == characterLimit ? .red : .gray)
                    .padding(.trailing, 10)
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
