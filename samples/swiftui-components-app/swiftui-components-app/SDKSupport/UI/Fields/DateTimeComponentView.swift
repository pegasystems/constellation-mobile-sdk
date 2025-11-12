import ConstellationSdk
import SwiftUI

struct DateTimeComponentView: View {
    @ObservedObject var state: ObservableComponent<DateTimeComponent>

    @State var selectedDate: Date = .now

    private static let gmtFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter
    }()

    init(_ component: DateTimeComponent) {
        state = ObservableComponent(component: component)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            DatePicker(selection: $selectedDate,
                       displayedComponents: [.date, .hourAndMinute])
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
            .environment(\.locale, pickerLocale)
        }
        .onChange(of: selectedDate) { _, newValue in
            state.component.updateValue(
                value: DateTimeComponentView.gmtFormatter.string(from: newValue)
            )
        }.onAppear {
            MappedBindingChangeSource.install(
                binding: $selectedDate,
                component: state.component,
                keyPath: \.value) {
                    DateTimeComponentView.gmtFormatter.date(from: $0) ?? .now
                }
        }
    }

    private var pickerLocale: Locale {
        switch state.component.clockFormat == "24" {
            case true: Locale(identifier: "en_GB")
            case false: Locale(identifier: "en_US")
        }
    }
}
