import Combine
import SwiftUI

open class ViewComponentProvider: ContainerProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    public lazy var view: AnyView = {
        AnyView(ViewComponentView(properties: properties, manager: manager))
    }()

    public let properties = ViewComponentProps()

    private weak var manager: ComponentManager?

    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }

    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableViewComponentProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct ViewComponentView: View {
    @ObservedObject var properties: ViewComponentProps
    weak var manager: ComponentManager?
    init (properties: ViewComponentProps, manager: ComponentManager?) {
        self.manager = manager
        self.properties = properties
    }
    
    private var contentView: some View {
        VStack {
            if let title = properties.title {
                Text(title)
                    .font(.title)
            }
            if properties.showLabel {
                Text(properties.label)
                    .font(.title2)
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(.top, 20)
            }
            if let instructions = properties.instructions?.stripHTML {
                Text(instructions)
            }
            ZStack {
                VStack(spacing: 15) {
                    ForEach(properties.children) {
                        manager?.view(for: $0.stringId)
                    }
                    .blur(radius: properties.loading ? 3 : 0)
                }
                
                if properties.loading {
                    VStack {
                        ProgressView()
                    }
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(Color.white.opacity(0.2))
                }
            }
        }
    }

    var body: some View {
        VStack {
            if properties.visible {
                contentView
            }
        }
        .animation(.easeInOut, value: properties.visible)
    }
}

extension String {
    fileprivate var stripHTML: String? {
        (try? NSAttributedString(
            data: Data(self.utf8),
            options: [
                .documentType: NSAttributedString.DocumentType.html,
                .characterEncoding: String.Encoding.utf8.rawValue
            ],
            documentAttributes: nil
        ))?.string
    }
}
