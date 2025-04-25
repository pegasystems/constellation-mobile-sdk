import Combine
import SwiftUI

public struct AlertInfo {
    public var title: String = ""
    public let message: String
    public let type: AlertType
    public var onClose: (() -> Void)? = nil
    public var onConfirm: ((Bool) -> Void)? = nil
    
    public enum AlertType {
        case alert
        case confirm
    }
}

public class RootContainerComponentProps : ObservableObject, ComponentProps {
    @Published public var viewContainer: ViewID? = nil
    @Published public var alertInfo: AlertInfo? = nil
    @Published public var invisibleWebView: AnyView? = nil
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
