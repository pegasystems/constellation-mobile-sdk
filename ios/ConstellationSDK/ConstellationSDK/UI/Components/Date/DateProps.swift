//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

public class DateProps : ObservableObject {
        
    private static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
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
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }
    
    public var value: String {
        get {
            DateProps.dateFormatter.string(from: self.selectedDate)
        }
        set {
            if let date = DateProps.dateFormatter.date(from: newValue) {
                self.selectedDate = date
            } else {
                self.selectedDate = .now
            }
        }
    }
}

struct DatePropsObservator: ViewModifier {
    @ObservedObject var properties: DateProps
    
    func body(content: Content) -> some View {
        content
            .onChange(of: properties.selectedDate) {
                self.properties.onValueChange(["value": self.properties.value])
            }
    }
}

extension View {
    public func observe(properties: DateProps) -> some View {
        modifier(DatePropsObservator(properties: properties))
    }
}
