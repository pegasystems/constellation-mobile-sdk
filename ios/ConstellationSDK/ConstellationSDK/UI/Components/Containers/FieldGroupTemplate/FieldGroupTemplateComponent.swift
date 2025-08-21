import Combine
import SwiftUI

open class FieldGroupTemplateProvider: ContainerProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>

    public lazy var view: AnyView = {
        AnyView(FieldGroupTemplateView(properties: properties, manager: manager))
    }()

    public let properties = FieldGroupTemplateProps()

    private weak var manager: ComponentManager?

    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }

    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableFieldGroupTemplateProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct FieldGroupTemplateView: View {
    @ObservedObject var properties: FieldGroupTemplateProps
    weak var manager: ComponentManager?
    init (properties: FieldGroupTemplateProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }

    var body: some View {
        VStack {
            ForEach(properties.items) { item in
                Text(item.heading).font(.title2)
                if let view = manager?.view(for: item.componentId.stringId) {
                    view
                } else {
                    Text("Unsupported")
                }
            }
        }
    }
}
