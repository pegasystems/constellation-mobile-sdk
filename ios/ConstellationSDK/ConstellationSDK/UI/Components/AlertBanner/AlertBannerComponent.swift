import Combine
import SwiftUI


open class AlertBannerComponentProvider: ContainerProvider {
    public var eventSubject: AnyPublisher<ComponentEvent, Never>
    
    public lazy var view: AnyView = {
        AnyView(AlertBannerComponentView(properties: properties))
    }()

    public let properties = AlertBannerComponentProps()
    private weak var manager: ComponentManager?

    public required init() {
        eventSubject = PassthroughSubject().eraseToAnyPublisher()
    }

    func useManager(_ manager: ComponentManager) {
        self.manager = manager
    }

    public func updateProperties(_ jsonInput: String) throws {
        try JSONDecoder()
            .decode(DecodableAlertBannerComponentProps.self, from: Data(jsonInput.utf8))
            .apply(to: properties)
    }
}

struct AlertBannerComponentView: View {

    @ObservedObject var properties: AlertBannerComponentProps

    init (properties: AlertBannerComponentProps) {
        self.properties = properties
    }

    var body: some View {

        if !properties.messages.isEmpty {
            BannerView(variant: BannerType.fromString(properties.variant).variant,
                       messages: properties.messages)
        }
    }
}

private struct BannerView: View {
    let variant: BannerVariant
    let messages: [String]
    
    var body: some View {
        HStack(spacing: 0) {
            VStack {
                // Spacer()
                Image(systemName: variant.iconName)
                    .foregroundColor(.white)
                    .font(.system(size: 24))
                    .padding(0)
                // Spacer()
            }
            .frame(width: 50)
            .frame(minHeight: 125)
            //.frame(maxHeight: .infinity)
            .background(variant.color)
            .padding(0)

            VStack(alignment: .leading, spacing: 4) {
                Text(variant.title)
                    .font(.headline)
                    .fontWeight(.bold)
                ForEach(messages, id: \.self) { message in
                    HStack(alignment: .top) {
                        Text("•")
                        Text(message)
                            .font(.body)
                            .fixedSize(horizontal:false, vertical:true)
                    }
                }
            }
            .padding()
            Spacer()
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 2)
        .overlay(
            RoundedRectangle(cornerRadius: 10)
                .stroke(Color.black, lineWidth: 1))
    }
    
}

struct BannerVariant {
    let title: String
    let color: Color
    let iconName: String
}

private enum BannerType {
    case urgent, warning, info, success
    
    static func fromString(_ rawValue: String) -> BannerType {
        switch rawValue {
        case "urgent":
            return .urgent
        case "warning":
            return .warning
        case "info":
            return .info
        case "success":
            return .success
        default:
            return .urgent
        }
    }
    
    var variant: BannerVariant {
        switch self {
        case .urgent:
            return BannerVariant(title: "Error",
                                 color: .red,
                                 iconName: "exclamationmark.triangle.fill")
        case .warning:
            return BannerVariant(title: "Warning",
                                 color: .orange,
                                 iconName: "flag.fill")
        case .info:
            return BannerVariant(title: "Information",
                                 color: .blue,
                                 iconName: "info.circle.fill")
        case .success:
            return BannerVariant(title: "Success",
                                 color: .green,
                                 iconName: "checkmark.circle.fill")
        }
    }
}

struct ContentView: View {
    var body: some View {
        VStack {
            BannerView(
                variant: BannerType.urgent.variant,
                messages: ["Alert!", "Next error which is very very long and 1234567124345", "Some error occurred.", "Alert!", "Next error which is very very long and 1234567124345", "Some error occurred.", "Alert!", "Next error which is very very long and 1234567124345", "Some error occurred."]
            )
            
            BannerView(
                variant: BannerType.warning.variant,
                messages: ["Warning message"]
            )
            
            BannerView(
                variant: BannerType.info.variant,
                messages: ["Information content"]
            )
            
            BannerView(
                variant: BannerType.success.variant,
                messages: ["Success!"]
            )
            BannerView(
                variant: BannerType.success.variant,
                messages: ["Success!"]
            )
            BannerView(
                variant: BannerType.success.variant,
                messages: ["Success!"]
            )
            BannerView(
                variant: BannerType.success.variant,
                messages: ["Success!"]
            )
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
