//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

class ActionButtonsProps: ObservableObject, ComponentProps {
    class ButtonProps: ObservableObject, Identifiable {
        @Published var type: String = ""
        @Published var name: String = ""
        @Published var jsAction: String = ""

        var clickEvent: ComponentEvent {
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
    @Published var mainButtons: [ButtonProps] = []
    @Published var secondaryButtons: [ButtonProps] = []
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
