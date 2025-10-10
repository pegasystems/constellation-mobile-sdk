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
            pegaUrl: "https://url.example",
            pegaVersion: "24.1.0",
            componentManager: ComponentManagerCompanion().create(customDefinitions: []),
            debuggable: true
        )

        let sdk = ConstellationSdkCompanion().create(config: configuration, engine: engine)
        return SDKWrapper(sdk: sdk)
    }
}
