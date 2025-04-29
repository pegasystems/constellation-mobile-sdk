import Foundation
import SwiftUI

public protocol PhoneNumberComponentProvider : ComponentProvider where T == PhoneNumberProps {}

class DefaultPhoneNumberComponentProvider: PhoneNumberComponentProvider {

    let hostingController: UIHostingController<AnyView>
    let properties: PhoneNumberProps

    init() {
        self.properties = PhoneNumberProps()
        let view = AnyView(PhoneNumberView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
