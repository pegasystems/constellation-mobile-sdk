import SdkEngineWebViewKit
import SwiftUI

struct CheckboxComponentView: View {
    @ObservedObject var state: ObservableComponent<CheckboxComponent>
    @State var value: Bool

    init(_ component: CheckboxComponent) {
        state = ObservableComponent(component: component)
        value = component.value == "true"
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            FieldLabelView(
                label: state.component.label,
                required: state.component.required
            )

            HStack {
                Toggle(isOn: $value) {
                    Text(state.component.caption)
                }
                .toggleStyle(.switch)

                FieldCheckmarkView(
                    validateMessage: state.component.validateMessage,
                    value: value.description
                )
            }
            .padding()
            .background(Color.white)
            .clipShape(RoundedRectangle(cornerSize: CGSize(
                width: 10,
                height: 10
            )))
            FieldMessageView(
                helperText: state.component.helperText,
                validateMessage: state.component.validateMessage
            )
        }
        .onChange(of: value) { _, newValue in
            state.component.updateValue(value: newValue.description)
        }.onAppear {
            MappedBindingChangeSource.install(
                binding: $value,
                component: state.component,
                keyPath: \.value) {
                    $0 == "true"
                }
        }
    }
}
