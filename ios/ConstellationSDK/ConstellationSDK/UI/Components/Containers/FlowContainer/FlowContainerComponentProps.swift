import Combine
import SwiftUI

class FlowContainerComponentProps : ObservableObject, ComponentProps {
    @Published var title: String? = nil
    @Published var assignment: ViewID? = nil
    @Published var alertBanners: [ViewID] = []
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
