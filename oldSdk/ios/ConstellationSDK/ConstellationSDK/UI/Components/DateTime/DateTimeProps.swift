import Foundation
import SwiftUI
import Combine

public class DateTimeProps : ObservableObject {

    private static let gmtFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter
    }()

    @Published public var disabled = false
    @Published public var helperText: String?
    @Published public var label: String?
    @Published public var placeholder: String?
    @Published public var readOnly = false
    @Published public var required = false
    @Published public var validateMessage: String?
    @Published public var visible: Bool = true
    @Published public var selectedDate: Date = .now
    @Published public var is24Hour: Bool? = nil
    @Published public var timeZone: String?
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }

    public var value: String {
        get {
            return DateTimeProps.gmtFormatter.string(from: self.selectedDate)
        }
        set {
            if let parsedDate = DateTimeProps.gmtFormatter.date(from: newValue) {
                self.selectedDate = parsedDate
            } else {
                Log.warning("Cannot parse dateTime value: <\(newValue)>. Falling back to current timestamp.")
                self.selectedDate = .now
            }
        }
    }
}

struct DateTimePropsObservator: ViewModifier {
    @ObservedObject var properties: DateTimeProps

    func body(content: Content) -> some View {
        content
            .onChange(of: properties.selectedDate) {
                self.properties.onValueChange(["value": self.properties.value])
            }
    }
}

extension View {
    public func observe(properties: DateTimeProps) -> some View {
        modifier(DateTimePropsObservator(properties: properties))
    }
}
