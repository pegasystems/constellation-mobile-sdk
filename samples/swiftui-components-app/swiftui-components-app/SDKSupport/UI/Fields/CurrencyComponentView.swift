import SdkEngineWebViewKit
import SwiftUI

struct CurrencyComponentView: View {
    @ObservedObject var state: ObservableComponent<CurrencyComponent>
    @FocusState private var isFocused: Bool
    @State var value: String

    init(_ component: CurrencyComponent) {
        state = ObservableComponent(component: component)
        value = component.value
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            FieldLabelView(
                label: state.component.label,
                required: state.component.required
            )

            HStack {
                if state.component.showIsoCode {
                    Text(state.component.isoCode)
                        .foregroundStyle(Color.gray)
                        .fontWeight(.bold)
                }

                TextField(
                    text: $value,
                    prompt: Text(state.component.placeholder)
                        .foregroundStyle(Color.gray)
                        .fontWeight(.light),
                    label: {
                        Text(value)
                            .foregroundStyle(Color.black)
                            .fontWeight(.semibold)
                    }
                )
                .keyboardType(state.component.decimalPrecision == 0 ? .numberPad : .decimalPad)
                .disabled(state.component.disabled || state.component.readOnly)
                .focused($isFocused)
                .onChange(of: value) { _, newValue in
                    state.component.updateValue(
                        value: newValue.formattedToDecimalPlaces(
                            Int(state.component.decimalPrecision)
                        )
                    )
                }
                .onChange(of: isFocused) { _, newValue in
                    state.component.updateFocus(focused: newValue)
                }.onAppear {
                    BindingChangeSource.install(
                        binding: $value,
                        component: state.component,
                        keypath: \.value
                    )
                }

                FieldCheckmarkView(
                    validateMessage: state.component.validateMessage,
                    value: value
                )
            }
            .padding()
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerSize: CGSize(width: 10, height: 10)))
            .overlay {
                RoundedRectangle(cornerRadius: 10)
                    .strokeBorder(isFocused ? Color.blue : Color.gray, lineWidth: 3)
            }
            FieldMessageView(
                helperText: state.component.helperText,
                validateMessage: state.component.validateMessage
            )
        }
    }
}
