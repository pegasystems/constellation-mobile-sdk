//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import SwiftUI

@objcMembers public class LabelComponentWrapperView: UIView, PMSDKWrapperView, LabelPropsProtocol {

    let provider: any LabelComponentProvider

    public var swiftUIView: AnyView {
        self.provider.hostingController.rootView
    }

    override init(frame: CGRect) {
        self.provider = PMSDKComponentManager.shared.createComponent()
        super.init(frame: frame)
        self.setupHostingController(self.provider.hostingController)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    var text: String {
        get {
            provider.properties.text
        }
        set {
            provider.properties.text = newValue
        }
    }
}
