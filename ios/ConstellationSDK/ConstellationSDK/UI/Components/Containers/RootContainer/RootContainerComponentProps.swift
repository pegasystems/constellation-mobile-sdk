import Combine
import SwiftUI

struct AlertInfo {
    var title: String = ""
    let message: String
    let type: AlertType
    var onClose: (() -> Void)? = nil
    var onConfirm: ((Bool) -> Void)? = nil
    
    enum AlertType {
        case alert
        case confirm
    }
}

class RootContainerComponentProps : ObservableObject, ComponentProps {
    @Published var viewContainer: ViewID? = nil
    @Published var alertInfo: AlertInfo? = nil
    @Published var invisibleWebView: AnyView? = nil
}

struct HTTPMessage: Decodable {
    let type: String
    let message: String
}

struct DecodableRootContainerComponentProps: Decodable {
    let viewContainer: String
    let httpMessages: [HTTPMessage]

    func apply(to observableProps: RootContainerComponentProps) {
        observableProps.viewContainer = ViewID(stringId: viewContainer)
        
        if (!httpMessages.isEmpty) {
            let alertInfo = AlertInfo(
                title: "Unexpected server response",
                message: httpMessages.map { "• \($0.message)" }.joined(separator: "\n"),
                type: .alert
            )
            observableProps.alertInfo = alertInfo
        } else {
            observableProps.alertInfo = nil
        }
    }
}
