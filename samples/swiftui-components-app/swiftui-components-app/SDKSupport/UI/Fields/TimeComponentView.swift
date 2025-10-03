import ConstellationSdk
import SwiftUI

struct TimeComponentView: View {
    @ObservedObject var state: ObservableComponent<TimeComponent>

    @State var selectedDate: Date = .now

    init(_ component: TimeComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            DatePicker(selection: $selectedDate,
                       displayedComponents: [.hourAndMinute]) {
                FieldLabelView(
                    label: state.component.label,
                    required: state.component.required
                )
                FieldMessageView(
                    helperText: state.component.helperText,
                    validateMessage: state.component.validateMessage
                )
            }.environment(\.locale, pickerLocale)
        }.onChange(of: selectedDate) { _, newValue in
            state.component.updateValue(
                value: TimeComponentView.dateFormatter.string(from: newValue)
            )
        }.onAppear {
            MappedBindingChangeSource.install(
                binding: $selectedDate,
                component: state.component,
                keyPath: \.value) {
                    TimeComponentView.dateFormatter.date(from: $0) ?? .now
                }
        }
    }

    private var pickerLocale: Locale {
        switch state.component.clockFormat == "24" {
            case true: Locale(identifier: "en_GB")
            case false: Locale(identifier: "en_US")
        }
    }

    private static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
        return formatter
    }()
}
