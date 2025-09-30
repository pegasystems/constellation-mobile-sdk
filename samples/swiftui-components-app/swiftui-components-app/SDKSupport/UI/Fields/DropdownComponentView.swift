import WebviewKit
import SwiftUI

struct DropdownComponentView: View {
    @ObservedObject var state: ObservableComponent<DropdownComponent>
    @State var selectedValue: SelectableOption?

    init(_ component: DropdownComponent) {
        state = ObservableComponent(component: component)
        selectedValue = component.option(with: component.value)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            FieldLabelView(
                label: state.component.label,
                required: state.component.required
            )

            Picker("Select an option", selection: $selectedValue) {
                ForEach(state.component.options, id: \.key) {
                    Text($0.label).tag($0)
                }
            }
            .pickerStyle(MenuPickerStyle())
            .frame(maxWidth: .infinity)
            .padding()
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
        }
        .onChange(of: selectedValue) { _, newValue in
            state.component.updateValue(value: newValue?.key ?? "")
        }.onAppear {
            MappedBindingChangeSource.install(
                binding: $selectedValue,
                component: state.component,
                keyPath: \.value) { [weak state] value in
                    state?.component.option(with: value)
                }
        }
    }
}

extension DropdownComponent {
    fileprivate func option(with optionValue: String) -> SelectableOption? {
        options.first {
            $0.key == optionValue
        }
    }
}
