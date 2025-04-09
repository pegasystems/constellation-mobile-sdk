import Combine
import SwiftUI

protocol OneColumnPagePropsProtocol : ComponentProps {
    var children: [UIView] { get set }
}

public class OneColumnPageProps: ObservableObject, OneColumnPagePropsProtocol {
    public init() {} // in order to allow creating new instances from the host app context.

    @Published public var children: [UIView] = []
}
