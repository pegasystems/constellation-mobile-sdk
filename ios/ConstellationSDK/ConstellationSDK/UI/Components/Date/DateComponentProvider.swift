//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI

public protocol DateComponentProvider : ComponentProvider where T == DateProps {
    var properties: DateProps { get }
}

class DefaultDateComponentProvider: DateComponentProvider {

    let hostingController: UIHostingController<AnyView>
    let properties: DateProps

    init() {
        self.properties = DateProps()
        let view = AnyView(DateView(properties: properties))
        self.hostingController = UIHostingController(rootView: view)
    }
}
