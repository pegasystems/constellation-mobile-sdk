import Combine
import SwiftUI

class AlertBannerComponentProps : ObservableObject, ComponentProps {
    @Published var variant: String! = nil
    @Published var messages: [String] = []
}

struct DecodableAlertBannerComponentProps: Decodable {
    let variant: String
    let messages: [String]

    func apply(to observableProps: AlertBannerComponentProps) {
        observableProps.variant = variant
        observableProps.messages = messages
    }
}
