import Combine
import SwiftUI

open class ActionButtonsProvider: ComponentProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    open var view: AnyView
    public let properties = ActionButtonsProps()

    public required init() {
        let subject = PassthroughSubject<ComponentEvent, Never>()

        view = AnyView(
            ActionButtonsView(
                properties: properties,
                eventSubject: subject
            )
        )

        eventSubject = subject.eraseToAnyPublisher()
    }

    public func updateProperties(_ jsonInput: String) throws {
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
        }.padding(8)
    }

    @ViewBuilder
    private func buildButtons(isPrimary: Bool) -> some View {
        
        let primaryColor = Color(UIColor(red: 59/255,
                                         green: 130/255,
                                         blue: 247/255,
                                         alpha: 1.0))
        let secondaryColor = Color(UIColor(red: 93/255,
                                           green: 104/255,
                                           blue: 128/255,
                                           alpha: 1.0))
        HStack {
            ForEach(
                isPrimary ? properties.mainButtons : properties.secondaryButtons
            ) { buttonInfo in
                Button(action: {
                    eventSubject.send(buttonInfo.clickEvent)
                }) {
                    Text(buttonInfo.name)
                        .padding(12)
                        .frame(maxWidth: .infinity)
                        .foregroundColor(.white)
                        .background(isPrimary ? .blue : secondaryColor)
                        .cornerRadius(15)
                }
            }
        }
    }
}
