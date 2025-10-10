import Combine
import UIKit
import ConstellationSdk
import SwiftUI

class ViewController: UIViewController {
    private var stateObserver: Cancellable?

    @IBAction
    private func showNewPegaCase(_ sender: UIButton) {
        let engine = createEngine()
        let wrapper = SDKWrapper(sdk: createSDK(with: engine))

        let hostingController = UIHostingController(
            rootView: VStack(spacing: 0) {
                // put invisible webView to view hierarchy to prevent throttling
                EngineWebView(engine)
                    .frame(height: 1)
                    .opacity(0)
                StateView(wrapper: wrapper).onAppear {
                    wrapper.create(SDKConfiguration.caseClassName)
                }
            }
        )

        hostingController.modalPresentationStyle = .formSheet
        hostingController.modalTransitionStyle = .coverVertical

        stateObserver = wrapper.state.sink { [weak self, weak hostingController] state in
            switch state {
            case .finished(let message):
                hostingController?.dismiss(animated: true) {
                    self?.presentEphemeralAlert(title: "Case processing finished", message: message)
                }
            case .error(let message):
                hostingController?.dismiss(animated: true) {
                    self?.presentEphemeralAlert(title: "Case processing finished", message: message)
                }
            case .cancelled:
                hostingController?.dismiss(animated: true) {
                    self?.presentEphemeralAlert(title: "Case processing canceled", message: "canceled")
                }
            default: return //no-op
            }
        }

        present(hostingController, animated: true)
    }

    private func createEngine() -> WKWebViewBasedEngine {
        // Create authenticated resource provider and appropriate engine implementation
        let authProvider = AuthenticatedResourceProvider(
            authorization: Authorization(settings: SDKConfiguration.oauth2Configuration)
        )
        return WKWebViewBasedEngine(provider: authProvider)
    }

    private func createSDK(with engine: ConstellationSdkEngine) -> ConstellationSdk {
        // Create configuration which will be used in SDK
        let configuration = ConstellationSdkConfig(
            pegaUrl: SDKConfiguration.environmentURL.absoluteString,
            pegaVersion: SDKConfiguration.environmentVersion,
            componentManager: ComponentManagerCompanion().create(customDefinitions: []),
            debuggable: SDKConfiguration.debuggable
        )

        return ConstellationSdkCompanion().create(config: configuration, engine: engine)
    }

    private func presentEphemeralAlert(title: String, message: String?) {
        let alertController = UIAlertController(title: title,
                                                message: message,
                                                preferredStyle: .alert)
        present(alertController, animated: true)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            alertController.dismiss(animated: true)
        }
    }
}
