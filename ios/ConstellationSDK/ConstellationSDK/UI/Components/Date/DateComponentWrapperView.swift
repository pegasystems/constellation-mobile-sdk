//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import UIKit
import SwiftUI

@objcMembers public class DateComponentWrapperView: UIView, PMSDKWrapperView, DatePropsProtocol {
    
    let provider: any DateComponentProvider
    
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
    
    var disabled: Bool {
        get {
            provider.properties.disabled
        }
        set {
            provider.properties.disabled = newValue
        }
    }

    var helperText: String? {
        get {
            provider.properties.helperText
        }
        set {
            provider.properties.helperText = newValue
        }
    }

    var hideLabel: Bool {
        get {
            provider.properties.hideLabel
        }
        set {
            provider.properties.hideLabel = newValue
        }
    }

    var label: String? {
        get {
            provider.properties.label
        }
        set {
            provider.properties.label = newValue
        }
    }

    var onValueChange: ([String: Any]) -> Void {
        get {
            provider.properties.onValueChange
        }
        set {
            provider.properties.onValueChange = newValue
        }
    }

    var readOnly: Bool {
        get {
            provider.properties.readOnly
        }
        set {
            provider.properties.readOnly = newValue
        }
    }

    var required: Bool {
        get {
            provider.properties.required
        }
        set {
            provider.properties.required = newValue
        }
    }

    var value: String {
        get {
            provider.properties.value
        }
        set {
            provider.properties.value = newValue
        }
    }

    var validateMessage: String? {
        get {
            provider.properties.validateMessage
        }
        set {
            provider.properties.validateMessage = newValue
        }
    }
}
