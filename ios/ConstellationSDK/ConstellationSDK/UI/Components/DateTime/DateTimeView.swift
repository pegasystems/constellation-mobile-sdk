import SwiftUI

struct DateTimeView: View {

    @ObservedObject var properties: DateTimeProps

    init(properties: DateTimeProps) {
        self.properties = properties
    }

    private let utcTimeZone = TimeZone(abbreviation: "UTC")!

    var body: some View {
        VStack {
            if properties.visible {
                contentView
            }
        }
        .animation(.easeInOut, value: properties.visible)
    }

    private var contentView: some View {
        VStack(alignment: .leading, spacing: 5) {

            let timeZone = TimeZone(identifier: properties.timeZone ?? "") ?? utcTimeZone

            DatePicker(selection: $properties.selectedDate,
                       displayedComponents: [.date, .hourAndMinute]) {
                HStack {
                    if let label = properties.label {
                        Text(label).foregroundStyle(Color.black).font(.system(size: 12, weight: .light, design: .rounded))
                    }
                    if properties.required {
                        Text("*").foregroundColor(.red).fontWeight(.semibold)
                    }
                }
                if let message = properties.validateMessage ?? properties.helperText {
                    Text(message)
                        .font(.system(size: 12, weight: .light, design: .rounded))
                        .foregroundColor(properties.validateMessage != nil ? .red : .gray)
                        .padding(.leading, 4)
                        .padding(.bottom, 4)
                }
            }
                       .environment(\.locale, pickerLocale)
                       .environment(\.timeZone, timeZone)
        }
        .observe(properties: properties)
    }

    private var pickerLocale: Locale {
        switch properties.is24Hour {
            case true: Locale(identifier: "en_GB")
            case false: Locale(identifier: "en_US")
            default: Locale.current
        }
    }
}
