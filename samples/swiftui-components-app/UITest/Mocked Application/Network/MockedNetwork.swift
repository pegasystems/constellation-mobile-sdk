import Foundation
import ConstellationSdk

final class MockedNetwork {
    private init() {} // factory

    static func create() -> ResourceProvider {
        let provider = ComposedNetworkResourceProvider()

        provider.addProvider(MockedNetworkPostProvider())
        provider.addProvider(MockedNetworkPatchProvider())
        provider.addProvider(MockedNetworkGenericProvider())

        return provider
    }
}
