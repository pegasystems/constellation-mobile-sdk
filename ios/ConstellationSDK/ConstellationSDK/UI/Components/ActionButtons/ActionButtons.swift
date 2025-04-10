import Combine
import SwiftUI

class ActionButtonsProvider: ComponentProvider {
    var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    var view: AnyView

    private let properties = ActionButtonsProps()

    required init() {
        let subject = PassthroughSubject<ComponentEvent, Never>()

        view = AnyView(
            ActionButtonsView(
                properties: properties,
                eventSubject: subject
            )
        )

        eventSubject = subject.eraseToAnyPublisher()
    }

    func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableActionButtonProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct ActionButtonsView: View {
    @ObservedObject var properties: ActionButtonsProps
    private var eventSubject = PassthroughSubject<ComponentEvent, Never>()

    init(
        properties: ActionButtonsProps,
        eventSubject: PassthroughSubject<ComponentEvent, Never>
    ) {
        self.properties = properties
        self.eventSubject = eventSubject
    }

    var body: some View {
        HStack {
            buildButtons(isPrimary: false)
            buildButtons(isPrimary: true)
        }
    }

    @ViewBuilder
    private func buildButtons(isPrimary: Bool) -> some View {
        HStack {
            ForEach(
                isPrimary ? properties.mainButtons : properties.secondaryButtons
            ) { buttonInfo in
                Button(action: {
                    eventSubject.send(buttonInfo.clickEvent)
                }) {
                    Text(buttonInfo.name)
                        .padding(8)
                        .frame(maxWidth: .infinity)
                        .foregroundColor(.white)
                        .background(isPrimary ? .blue : .gray)
                        .cornerRadius(10)
                }
            }
        }
    }
}
