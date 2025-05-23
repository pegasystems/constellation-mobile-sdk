import Combine
import Foundation
import SwiftUI

public class ActionButtonsProps: ObservableObject, ComponentProps {
    public class ButtonProps: ObservableObject, Identifiable {
        @Published public var type: String = ""
        @Published public var name: String = ""
        @Published public var jsAction: String = ""

        public var clickEvent: ComponentEvent {
            .init(
                type: .actionButtonClick,
                componentData: .init(
                    buttonType: type,
                    jsAction: jsAction
                ),
                eventData: nil
            )
        }
    }
    @Published public var mainButtons: [ButtonProps] = []
    @Published public var secondaryButtons: [ButtonProps] = []
}

struct DecodableActionButtonProps: Decodable {
    struct Button: Decodable {
        let type: String
        let name: String
        let jsAction: String

        func apply(to observableProps: ActionButtonsProps.ButtonProps) {
            observableProps.type = type
            observableProps.name = name
            observableProps.jsAction = jsAction
        }

        func asObservable() -> ActionButtonsProps.ButtonProps {
            let result = ActionButtonsProps.ButtonProps()
            apply(to: result)
            return result
        }
    }

    let mainButtons: [Button]
    let secondaryButtons: [Button]

    func apply(to observableProps: ActionButtonsProps) {
        observableProps.mainButtons = mainButtons.map { $0.asObservable() }
        observableProps.secondaryButtons = secondaryButtons.map { $0.asObservable() }
    }
}
