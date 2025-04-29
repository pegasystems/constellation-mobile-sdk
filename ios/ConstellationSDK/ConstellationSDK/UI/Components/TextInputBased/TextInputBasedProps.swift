import Combine
import Foundation
import SwiftUI

public class TextInputBasedProps : ObservableObject {
    public required init() {}
    
    @Published public var disabled = false
    @Published public var helperText: String?
    @Published public var hideLabel = false
    @Published public var label: String?
    @Published var onFocusChange: ([String: Any]) -> Void = { _ in }
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }
    @Published public var placeholder: String?
    @Published public var readOnly = false
    @Published public var required = false
    @Published public var validateMessage: String?
    @Published public var value: String = ""
    @Published public var visible: Bool = true
}

struct TextInputBasedPropsObservator: ViewModifier {
    @ObservedObject var properties: TextInputBasedProps
    @FocusState var isFocused: Bool
    
    func body(content: Content) -> some View {
        content
            .onChange(of: properties.value) {
                self.properties.onValueChange(["focus": isFocused, "value": self.properties.value])
            }
            .onChange(of: isFocused) {
                self.properties.onFocusChange(["focus": isFocused, "value": self.properties.value])
            }
    }
}

extension View {
    public func observe(properties: TextInputBasedProps, isFocused: FocusState<Bool>) -> some View {
        modifier(TextInputBasedPropsObservator(properties: properties, isFocused: isFocused))
    }
}
