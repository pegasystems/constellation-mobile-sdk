import Foundation
import SwiftUI

public protocol DropdownComponentProvider : ComponentProvider where T == DropdownProps {}

class DefaultDropdownComponentProvider: DropdownComponentProvider {

    let hostingController: UIHostingController<AnyView>
    let properties: DropdownProps

    init() {
        self.properties = DropdownProps()
        let view = AnyView(DropdownView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
