import ConstellationSdk
import SwiftUI

struct AlertBannerView: View {
    @ObservedObject var state: ObservableComponent<AlertBannerComponent>

    init(_ component: AlertBannerComponent) {
        self.state = ObservableComponent(component: component)
    }

    var body: some View {
        HStack(spacing: 0) {
            VStack {
                // Spacer()
                state.component.variant.style.icon
                    .foregroundColor(.white)
                    .font(.system(size: 24))
                    .padding(0)
                // Spacer()
            }
            .frame(width: 50)
            .frame(minHeight: 125)
            //.frame(maxHeight: .infinity)
            .background(state.component.variant.style.color)
            .padding(0)

            VStack(alignment: .leading, spacing: 4) {
                Text(state.component.variant.style.title)
                    .font(.headline)
                    .fontWeight(.bold)
                ForEach(state.component.messages, id: \.self) { message in
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

extension AlertBannerView {
    struct Style {
        let title: String
        let color: Color
        let icon: Image
    }
}

extension AlertBannerVariant {
    var style: AlertBannerView.Style {
        switch self {
        case .success:
                .init(
                    title: "Success",
                    color: .green,
                    icon: .init(systemName: "checkmark.circle.fill")
                )
        case .info:
                .init(
                    title: "Information",
                    color: .blue,
                    icon: .init(systemName: "info.circle.fill")
                )
        case .warning:
                .init(
                    title: "Warning",
                    color: .orange,
                    icon: .init(systemName: "flag.fill")
                )
        default:
                .init(
                    title: "Error",
                    color: .red,
                    icon: .init(systemName: "exclamationmark.triangle.fill")
                )
        }
    }
}
