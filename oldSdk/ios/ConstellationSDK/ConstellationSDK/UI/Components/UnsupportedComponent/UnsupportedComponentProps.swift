import Foundation
import Combine

public class UnsupportedComponentProps: ObservableObject {
    @Published public var type: String = "Unknown"
    @Published public var visible: Bool = true
}

struct DecodableUnsupportedComponentProps: Decodable {
    let type: String
    let visible: Bool

    func apply(to observableProps: UnsupportedComponentProps) {
        observableProps.type = type
        observableProps.visible = visible
    }
}
