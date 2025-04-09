import Foundation
import UIKit
import SwiftUI

@objcMembers public class DropdownComponentWrapperView: UIView, PMSDKWrapperView, DropdownPropsProtocol {
    
    public var swiftUIView: AnyView {
        self.provider.hostingController.rootView
    }
    
    let provider: any DropdownComponentProvider
    
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

    var options: [[String : String]] {
        get {
            provider.properties.options
        }
        set {
            provider.properties.options = newValue
        }
    }

    var placeholder: String {
        set {
            provider.properties.placeholder = newValue
        }
        get {
            provider.properties.placeholder
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

    var validateMessage: String? {
        get {
            provider.properties.validateMessage
        }
        set {
            provider.properties.validateMessage = newValue
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
}
