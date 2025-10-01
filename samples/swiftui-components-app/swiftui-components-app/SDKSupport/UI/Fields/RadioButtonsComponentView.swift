import SdkEngineWebViewKit
import SwiftUI

struct RadioButtonsComponentView: View {
    @ObservedObject var state: ObservableComponent<RadioButtonsComponent>
    @State var selectedValue: String

    init(_ component: RadioButtonsComponent) {
        state = ObservableComponent(component: component)
        selectedValue = component.value
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            FieldLabelView(
                label: state.component.label,
                required: state.component.required
            )

            VStack(alignment: .leading, spacing: 12) {
                ForEach(state.component.options, id: \.key) { opt in
                    HStack {
                        Button(action: {
                            selectedValue = opt.key
                        }) {
                            HStack {
                                Image(systemName: selectedValue == opt.key ? "largecircle.fill.circle" : "circle")
                                        .foregroundColor(.blue)
                                Text(opt.label)
                                    .foregroundColor(.black)
                            }
                        }
                        .buttonStyle(PlainButtonStyle())
                        Spacer()
                    }
                }
            }
            .padding(.vertical, 5)
            .padding(.horizontal, 10)
            .background(Color.white)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color.gray, lineWidth: 2)
            )

            FieldMessageView(
                helperText: state.component.helperText,
                validateMessage: state.component.validateMessage
            )
        }.onChange(of: selectedValue) { _, newValue in
            state.component.updateValue(value: newValue)
        }.onAppear {
            BindingChangeSource.install(
                binding: $selectedValue,
                component: state.component,
                keypath: \.value
            )
        }
    }
}
