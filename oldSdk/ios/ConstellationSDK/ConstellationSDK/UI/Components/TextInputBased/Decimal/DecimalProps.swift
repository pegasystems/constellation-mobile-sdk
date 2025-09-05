import Foundation
import Combine

public class DecimalProps : TextInputBasedProps {
    @Published public var decimalPrecision = 0
    @Published public var showGroupSeparators: Bool = true
}
