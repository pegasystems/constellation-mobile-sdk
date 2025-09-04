import Combine
import Foundation
import SwiftUI

public class PhoneNumberProps : ObservableObject {
    public required init() {}

    @Published public var value: String = ""
    @Published public var country: CountryData = .default
    @Published public var domesticNumber: String = ""

    @Published public var label: String = ""
    @Published public var visible: Bool = true
    @Published public var required: Bool = false
    @Published public var disabled: Bool = false
    @Published public var readOnly: Bool = false
    @Published public var helperText: String? = nil
    @Published public var placeholder: String? = nil
    @Published public var showCountryCode: Bool = true
    @Published public var validateMessage: String? = nil

    @Published public var isFocused: Bool = false
}
