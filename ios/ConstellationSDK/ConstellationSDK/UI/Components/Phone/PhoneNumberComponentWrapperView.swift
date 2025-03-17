//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import UIKit
import SwiftUI

@objcMembers public class PhoneNumberComponentWrapperView: UIView, PMSDKWrapperView, PhoneNumberPropsProtocol {
    
    let provider: any PhoneNumberComponentProvider
    
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
    
    var value: String {
        get {
            provider.properties.value
        }
        set {
            provider.properties.value = newValue
        }
    }
}
