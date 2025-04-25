import Combine
import SwiftUI

public class FlowContainerComponentProps : ObservableObject, ComponentProps {
    @Published public var title: String? = nil
    @Published public var assignment: ViewID? = nil
    @Published public var alertBanners: [ViewID] = []
}

struct DecodableFlowContainerComponentProps: Decodable {
    let assignment: String
    let alertBanners: [String]
    let title: String?

    func apply(to observableProps: FlowContainerComponentProps) {
        observableProps.alertBanners = alertBanners.map {
            ViewID(stringId: $0)
        }
        observableProps.assignment = ViewID(stringId: assignment)
        observableProps.title = title
    }
}
