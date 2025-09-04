import Combine
import Foundation

protocol LabelPropsProtocol : ComponentProps {
    var text: String { get set }
}

public class LabelProps : ObservableObject, LabelPropsProtocol {
    public init() {} // in order to allow creating new instances from the host app context.

    @Published public var text: String = ""
}
