import ConstellationSdk
import SwiftUI
import WebKit

struct ContentView: View {
    @State private var path = NavigationPath()
    @State private var selectedItem: String?

    var body: some View {
        NavigationStack(path: $path) {
            VStack {
                Text("Pega Mobile Constellation SDK")
                Button("Create SDKTesting Case") {
                    path.append("DIXL-MediaCo-Work-SDKTesting")
                }
                Button("Create EmbeddedData Case") {
                    path.append("DIXL-MediaCo-Work-EmbeddedData")
                }
            }
            .navigationDestination(for: String.self) { className in
                let engine = WKWebViewBasedEngine(provider: MockedNetwork.create())
                let wrapper = createSDK(with: engine)

                VStack(spacing: 0) {
                    EngineWebView(engine)
                        .frame(height: 1)
                        .opacity(0)
                    StateView(wrapper: wrapper)
                        .task {
                            wrapper.create(className)
                        }.onReceive(wrapper.state) { state in
                            switch state {
                            case .cancelled, .error, .finished:
                                path.removeLast()
                            default: break
                            }
                        }
                }
            }
        }
    }

    private func createSDK(with engine: WKWebViewBasedEngine) -> SDKWrapper {
        let configuration = ConstellationSdkConfig(
            // Note: CDN URL is used instead of the typical Pega instance URL (e.g. ending with /prweb)
            // to ensure that requests to static resources are intercepted by the mock resource handler during testing.
            // In WKWebView-based Engine, multiple resource handlers are queried in order, and the network handler takes precedence
            // over custom handler unless the base URL matches. By setting the base URL to the CDN,
            // we guarantee that CDN requests are routed through the mock instead of the network.
            pegaUrl: "https://release.constellation.pega.io",
            pegaVersion: "24.1.0",
            componentManager: ComponentManagerCompanion().create(customDefinitions: []),
            debuggable: true
        )

        let sdk = ConstellationSdkCompanion().create(config: configuration, engine: engine)
        return SDKWrapper(sdk: sdk)
    }
}
