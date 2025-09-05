import Combine
import SwiftUI

open class SimpleTableProvider: ContainerProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>

    public lazy var view: AnyView = {
        AnyView(SimpleTableView(properties: properties, manager: manager))
    }()

    public let properties = SimpleTableProps()

    private weak var manager: ComponentManager?

    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }

    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableSimpleTableProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct SimpleTableView: View {
    @ObservedObject var properties: SimpleTableProps
    weak var manager: ComponentManager?
    init (properties: SimpleTableProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }

    var body: some View {
        if let childId = properties.child?.stringId {
            manager?.view(for: childId)
        }
    }
}
