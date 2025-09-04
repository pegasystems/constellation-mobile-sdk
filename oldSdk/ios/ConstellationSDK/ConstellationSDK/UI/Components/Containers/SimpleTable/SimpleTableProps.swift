import Combine
import SwiftUI

public class SimpleTableProps: ObservableObject, ComponentProps {
    @Published public var child: ViewID?
}

struct DecodableSimpleTableProps: Decodable {
    let child: String

    func apply(to observableProps: SimpleTableProps) {
        observableProps.child = .init(stringId: child)
    }
}
