//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Combine
import Foundation
import SwiftUI

protocol DropdownPropsProtocol : ComponentProps {
    var disabled: Bool { get set }
    var helperText: String? { get set }
    var label: String? { get set }
    var onValueChange: ([String: Any]) -> Void { get set }
    var options: [[String : String]] { get set }
    var placeholder: String { get set }
    var readOnly: Bool { get set }
    var required: Bool { get set }
    var validateMessage: String? { get set }
    var value: String { get set }
}

public class DropdownProps : ObservableObject, DropdownPropsProtocol {
    public init() {} // in order to allow creating new instances from the host app context.
    
    @Published public var disabled = false
    @Published public var helperText: String?
    @Published public var label: String?
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }
    @Published public var options: [[String : String]] = []
    @Published public var placeholder: String = ""
    @Published public var readOnly = false
    @Published public var required = false
    @Published public var validateMessage: String?
    @Published public var value: String = ""
    
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

struct DropdownPropsObservator: ViewModifier {
    @ObservedObject var properties: DropdownProps
    
    func body(content: Content) -> some View {
        content
            .onChange(of: properties.options, perform: handleOptionsChange)
            .onChange(of: properties.value, perform: handleValueChange)
    }
    
    func handleOptionsChange(options: [[String : String]]) {
        if options.isEmpty {
            properties.selectedValue.wrappedValue = ""
        } else {
            properties.selectedValue.wrappedValue = options.first(where: { $0["value"] == properties.value })?["value"] ?? ""
        }
    }
    
    func handleValueChange(newValue: String) {
        let options = properties.options
        properties.selectedValue.wrappedValue = options.first(where: { $0["value"] == newValue })?["value"] ?? ""
    }
}

extension View {
    public func observe(properties: DropdownProps) -> some View {
        modifier(DropdownPropsObservator(properties: properties))
    }
}
