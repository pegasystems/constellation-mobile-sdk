import Foundation
import ConstellationSDK

final class MockedNetwork {
    private init() {} // factory

    static func create() -> PMSDKNetworkRequestDelegate {
        let delegate = ComposedNetworkDelegate()

        delegate.addDelegate(MockedNetworkPostDelegate())
        delegate.addDelegate(MockedNetworkPatchDelegate())
        delegate.addDelegate(MockedNetworkGenericDelegate())

        return delegate
    }
}
