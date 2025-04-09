import SwiftUI

@objcMembers public class FlexComponentWrapperView: UIView, PMSDKWrapperView, FlexPropsProtocol  {

    let provider: any FlexComponentProvider

    override init(frame: CGRect) {
        self.provider = PMSDKComponentManager.shared.createComponent()
        super.init(frame: frame)
        self.setupHostingController(self.provider.hostingController)
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    public var swiftUIView: AnyView {
        self.provider.hostingController.rootView
    }

    private var flexSubviews: [UIView] = []

    @objc public func didUpdateSubviews(subchildren: Array<UIView>) { 
        self.provider.properties.children = subchildren
    }

    @objc public func insertChild(child: UIView, atIndex: Int) {
        self.flexSubviews.insert(child, at: atIndex)
    }

    @objc public func removeChild(child: UIView) {
        self.flexSubviews.removeAll { someView in
            someView == child
        }
    }

    @objc public var children: [UIView] {
        get {
            provider.properties.children
        }
        set {
            provider.properties.children = newValue
        }
    }
    
    var direction: String {
        get {
            provider.properties.direction
        }
        set {
            provider.properties.direction = newValue
        }
    }
}
