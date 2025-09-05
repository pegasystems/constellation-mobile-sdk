import Foundation
import SwiftUI

public protocol LabelComponentProvider : ComponentProvider where T == LabelProps {}

class DefaultLabelComponentProvider: LabelComponentProvider {

    let hostingController: UIHostingController<AnyView>
    let properties: LabelProps

    init() {
        self.properties = LabelProps()
        let view = AnyView(LabelView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
