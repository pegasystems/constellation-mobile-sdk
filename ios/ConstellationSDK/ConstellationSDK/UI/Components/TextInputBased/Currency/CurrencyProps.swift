import Combine
import Foundation
import SwiftUI

public class CurrencyProps : TextInputBasedProps {
    @Published public var currencyISOCode = ""
    @Published public var showISOCode = false
    @Published public var decimalPrecision = 0
}
