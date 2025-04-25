import Combine
import SwiftUI


open class FlowContainerComponentProvider: ContainerProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    open lazy var view: AnyView = {
        AnyView(FlowContainerComponentView(properties: properties, manager: manager))
    }()
    
    public let properties = FlowContainerComponentProps()
    
    public weak var manager: ComponentManager?
    
    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }
    
    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }
    
    public func updateProperties(_ jsonInput: String) throws {
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
