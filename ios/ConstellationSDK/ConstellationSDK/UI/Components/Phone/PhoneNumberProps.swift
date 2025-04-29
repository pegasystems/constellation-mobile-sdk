import Combine
import Foundation

protocol PhoneNumberPropsProtocol : ComponentProps {
    var value: String { get set }
}

public class PhoneNumberProps : ObservableObject, PhoneNumberPropsProtocol {
    public init() {} // in order to allow creating new instances from the host app context.
    
    @Published public var value: String = ""
}
