import SwiftUI
import ConstellationSDK

// not yet migrated
struct CustomButtonView: View {

    @ObservedObject var properties: ButtonProps

    init(properties: ButtonProps) {
        self.properties = properties
    }

    var body: some View {
        Button(action: {
            properties.onButtonPress()
        }) {
            Text(properties.title)
                .font(.system(size: 12, weight: .bold, design: .rounded))
                .foregroundColor(.white)
                .padding()
                .frame(maxWidth: .infinity)
                .background(Color.blue)
                .cornerRadius(10)
        }
        .padding()
    }
}

class CustomButtonComponentProvider: ButtonComponentProvider {

    let properties = ButtonProps()
    let hostingController: UIHostingController<AnyView>

    init() {
        let view = AnyView(CustomButtonView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
