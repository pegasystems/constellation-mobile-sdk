import Combine
import SwiftUI


class FlowContainerComponentProvider: ContainerProvider {
    var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    lazy var view: AnyView = {
        AnyView(FlowContainerComponentView(properties: properties, manager: manager))
    }()
    
    let properties = FlowContainerComponentProps()
    
    private weak var manager: ComponentManager?
    
    required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }
    
    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }
    
    func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableFlowContainerComponentProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct FlowContainerComponentView: View {
    
    @ObservedObject var properties: FlowContainerComponentProps
    weak var manager: ComponentManager?
    
    init (properties: FlowContainerComponentProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }
    
    var body: some View {
        VStack {
            if let title = properties.title {
                Text(title)
                    .font(.title)
            }
            ForEach(properties.alertBanners) {
                manager?.view(for: $0.stringId)
                    .cornerRadius(10)
            }
            if let assignmentId = properties.assignment?.stringId {
                manager?.view(for: assignmentId)
                    .cornerRadius(10)
            } else {
                ProgressView()
            }
        }
    }
}
