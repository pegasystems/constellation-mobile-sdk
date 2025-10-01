import SdkEngineWebViewKit
import SwiftUI

struct DateComponentView: View {
    @ObservedObject var state: ObservableComponent<DateComponent>
    @State var selectedDate: Date = .now

    private static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter
    }()

    init(_ component: DateComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            DatePicker(selection: $selectedDate,
                       displayedComponents: [.date])
            {
                FieldLabelView(
                    label: state.component.label,
                    required: state.component.required
                )
                FieldMessageView(
                    helperText: state.component.helperText,
                    validateMessage: state.component.validateMessage
                )
            }
        }
        .onChange(of: selectedDate) { _, newValue in
            state.component.updateValue(
                value: DateComponentView.dateFormatter.string(from: newValue)
            )
        }.onAppear {
            MappedBindingChangeSource.install(
                binding: $selectedDate,
                component: state.component,
                keyPath: \.value) {
                    DateComponentView.dateFormatter.date(from: $0) ?? .now
                }
        }
    }
}
