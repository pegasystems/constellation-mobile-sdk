import Foundation
import SwiftUI
import Combine

public class TimeProps : ObservableObject {

    private static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "HH:mm"
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
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }
    
    public var value: String {
        get {
            TimeProps.dateFormatter.string(from: self.selectedDate)
        }
        set {
            if let date = TimeProps.dateFormatter.date(from: newValue) {
                self.selectedDate = date
            } else {
                self.selectedDate = .now
            }
        }
    }
}

struct TimePropsObservator: ViewModifier {
    @ObservedObject var properties: TimeProps
    
    func body(content: Content) -> some View {
        content
            .onChange(of: properties.selectedDate) {
                self.properties.onValueChange(["value": self.properties.value])
            }
    }
}

extension View {
    public func observe(properties: TimeProps) -> some View {
        modifier(TimePropsObservator(properties: properties))
    }
}
