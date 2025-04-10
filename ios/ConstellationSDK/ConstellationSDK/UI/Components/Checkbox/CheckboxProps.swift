import Combine
import Foundation
import SwiftUI

public class CheckboxProps : ObservableObject, ComponentProps {
    public init() {} // in order to allow creating new instances from the host app context.
    
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
    @Published public var value: Bool = false
    @Published public var caption: String = ""
    @Published public var visible: Bool = true
}

struct CheckboxPropsObservator: ViewModifier {
    @ObservedObject var properties: CheckboxProps
    @FocusState var isFocused: Bool
    
    func body(content: Content) -> some View {
        content
            .onChange(of: properties.value) {
                self.properties.onValueChange(["value": self.properties.value])
            }
            .onChange(of: isFocused) {
                self.properties.onFocusChange(["focus": isFocused])
            }
    }
}

extension View {
    public func observe(properties:CheckboxProps, isFocused: FocusState<Bool>) -> some View {
        modifier(CheckboxPropsObservator(properties: properties, isFocused: isFocused))
    }
}
