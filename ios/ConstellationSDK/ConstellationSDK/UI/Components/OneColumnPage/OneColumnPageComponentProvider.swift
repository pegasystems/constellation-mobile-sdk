import Foundation
import SwiftUI

public protocol OneColumnPageComponentProvider : ComponentProvider where T == OneColumnPageProps {}

class DefaultOneColumnPageComponentProvider: OneColumnPageComponentProvider {

    let hostingController: UIHostingController<AnyView>
    let properties: OneColumnPageProps

    init() {
        self.properties = OneColumnPageProps()
        let view = AnyView(OneColumnPage(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
