import SwiftUI

@objcMembers public class OneColumnPageComponentWrapperView: UIView, PMSDKWrapperView, OneColumnPagePropsProtocol  {

    let provider: any OneColumnPageComponentProvider

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

    private var pageSubviews: [UIView] = []

    @objc public func didUpdateSubviews(subchildren: Array<UIView>) {
        self.provider.properties.children = subchildren
    }

    @objc public func insertChild(child: UIView, atIndex: Int) {
        self.pageSubviews.insert(child, at: atIndex)
    }

    @objc public func removeChild(child: UIView) {
        self.pageSubviews.removeAll { someView in
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
}
