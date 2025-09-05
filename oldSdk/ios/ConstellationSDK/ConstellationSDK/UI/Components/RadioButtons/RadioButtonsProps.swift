import Combine
import Foundation
import SwiftUI

public class RadioButtonsProps : ObservableObject {
    public required init() {}
    
    @Published public var disabled = false
    @Published public var helperText: String?
    @Published public var label: String?
    @Published public var placeholder: String?
    @Published public var readOnly = false
    @Published public var required = false
    @Published public var validateMessage: String?
    @Published public var value: String = ""
    @Published public var options: [[String : String]] = []
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }
    @Published public var visible: Bool = true
    
    public var selectedValue: Binding<String> {
        Binding<String>(
            get: {
                self.value
            },
            set: { newSelectedOption in
                self.value = newSelectedOption
                self.onValueChange(["value": self.value])
            }
        )
    }
}

struct RadioButtonsPropsObservator: ViewModifier {
    @ObservedObject var properties: RadioButtonsProps
    
    func body(content: Content) -> some View {
        content
            .onChange(of: properties.value) {
                self.properties.onValueChange(["value": self.properties.value])
            }
    }
}

extension View {
    public func observe(properties: RadioButtonsProps) -> some View {
        modifier(RadioButtonsPropsObservator(properties: properties))
    }
}
