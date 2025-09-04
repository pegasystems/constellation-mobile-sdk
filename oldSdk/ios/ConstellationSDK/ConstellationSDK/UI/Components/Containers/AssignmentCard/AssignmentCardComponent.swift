import Combine
import SwiftUI

open class AssignmentCardComponentProvider: ContainerProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    open lazy var view: AnyView = {
        AnyView(AssignmentCardComponentView(properties: properties, manager: manager))
    }()

    public let properties = AssignmentCardComponentProps()

    public weak var manager: ComponentManager?

    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }

    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableAssignmentCardComponentProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct AssignmentCardComponentView: View {
    @ObservedObject var properties: AssignmentCardComponentProps
    weak var manager: ComponentManager?
    init (properties: AssignmentCardComponentProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }

    var body: some View {
        VStack {
            ScrollView {
                VStack(spacing: 20) {
                    VStack {
                        if properties.loading {
                            ProgressView()
                        } else {
                            ForEach(properties.children) {
                                manager?.view(for: $0.stringId)
                            }
                        }
                    }
                }
                // Style taken from OneColumnPage
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(20)
                .background(Color(red: 0.8, green: 0.85, blue: 0.9))
                .cornerRadius(10)
            }
            if let buttons = properties.actionButtons {
                manager?.view(for: buttons.stringId)
            }
        }
    }
}
