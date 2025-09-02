import Combine
import SwiftUI

public class FieldGroupTemplateProps: ObservableObject, ComponentProps {
    @Published public var items: [FieldGroupTemplateItemProps] = []
}

public class FieldGroupTemplateItemProps: ObservableObject, Identifiable {
    public let id: Int
    @Published public var heading: String
    @Published public var componentId: ViewID

    init(id: Int, heading: String, componentId: ViewID) {
        self.id = id
        self.heading = heading
        self.componentId = componentId
    }
}

struct DecodableFieldGroupTemplateProps: Decodable {
    let items: [DecodableFieldGroupTemplateItemProps]

    func apply(to observableProps: FieldGroupTemplateProps) {
        observableProps.items = items.map {
            .init(
                id: $0.id,
                heading: $0.heading,
                componentId: .init(stringId: $0.componentId)
            )
        }
    }
}

struct DecodableFieldGroupTemplateItemProps: Decodable {
    let id: Int
    let heading: String
    let componentId: String
}
