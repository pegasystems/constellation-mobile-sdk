import SwiftUI
import ConstellationSDK
import Combine

struct CustomActionButtonsView: View {
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

class CustomActionButtonsProvider: ActionButtonsProvider {
    required init() {
        super.init()
        let subject = PassthroughSubject<ComponentEvent, Never>()
        self.eventSubject = subject.eraseToAnyPublisher()
        view = AnyView(CustomActionButtonsView(properties: properties, eventSubject: subject))
    }
}
