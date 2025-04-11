import Foundation
import SwiftUI

public protocol FlexComponentProvider : ComponentProvider where T == FlexProps {
    var properties: FlexProps { get }
}

class DefaultFlexComponentProvider: FlexComponentProvider {

    let hostingController: UIHostingController<AnyView>
    let properties: FlexProps

    init() {
        self.properties = FlexProps()
        let view = AnyView(FlexView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
