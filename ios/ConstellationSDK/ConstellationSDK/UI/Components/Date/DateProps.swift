//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI
import Combine

protocol DatePropsProtocol : ComponentProps {
    var disabled: Bool { get set }
    var helperText: String? { get set }
    var hideLabel: Bool { get set }
	var label: String? { get set }
    var onValueChange: ([String: Any]) -> Void { get set }
    var readOnly: Bool { get set }
	var required: Bool { get set }
	var validateMessage: String? { get set }
    var value: String { get set }
}

public class DateProps : ObservableObject, DatePropsProtocol {
    private let dateFormatter: DateFormatter

    public init() {
        dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
    }

    @Published public var disabled = false
    @Published public var helperText: String?
    @Published public var hideLabel = false
    @Published public var label: String?
    @Published var onValueChange: ([String: Any]) -> Void = { _ in }
    @Published public var readOnly = false
    @Published public var required = false
    @Published public var validateMessage: String?
	@Published public var value: String = ""
    
    public var date: Binding<Date> {
        Binding<Date>(
            get: {
                self.dateFormatter.date(from: self.value) ?? Date()
            },
            set: { newDate in
                self.value = self.dateFormatter.string(from: newDate)
                self.onValueChange(["value": self.value])
            }
        )
    }
}
