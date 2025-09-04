import UIKit
import SwiftUI
import ConstellationSDK

class ViewController: UIViewController {

    var loadMobileSDKContent: UIButton!
    weak var controller: UIHostingController<PMSDKCreateCaseView>?
    let mockedNetwork = MockedNetwork.create()

    override func viewDidLoad() {
        super.viewDidLoad()

        let welcomeLabel: UILabel = {
            let label = UILabel()
            label.text = "Pega Mobile Constellation SDK"
            label.textColor = .black
            label.textAlignment = .center
            label.font = UIFont.systemFont(ofSize: 20)
            return label
        }()
        welcomeLabel.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(welcomeLabel)
        welcomeLabel.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        welcomeLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -120).isActive = true
        welcomeLabel.widthAnchor.constraint(equalToConstant: 300).isActive = true
        welcomeLabel.heightAnchor.constraint(equalToConstant: 100).isActive = true

        let button = createButton("Create a new Case")

        view.addSubview(button)
        button.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        button.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        button.widthAnchor.constraint(equalToConstant: 200).isActive = true
        button.heightAnchor.constraint(equalToConstant: 50).isActive = true
        button.addTarget(self, action: #selector(showNewSDKTesting), for: .touchUpInside)

        let embeddedDataButton = createButton("Create EmbeddedData Case")
        view.addSubview(embeddedDataButton)
        embeddedDataButton.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        embeddedDataButton.topAnchor.constraint(equalTo: button.bottomAnchor, constant: 20).isActive = true
        embeddedDataButton.widthAnchor.constraint(equalToConstant: 200).isActive = true
        embeddedDataButton.heightAnchor.constraint(equalToConstant: 50).isActive = true
        embeddedDataButton.addTarget(self, action: #selector(showNewEmbeddedDataCase), for: .touchUpInside)
    }

    private func createButton(_ title: String) -> UIButton {
        let button = UIButton(type: .system)
        button.setTitle(title, for: .normal)
        button.backgroundColor = UIColor.systemBlue
        button.setTitleColor(.white, for: .normal)
        button.layer.cornerRadius = 10
        button.clipsToBounds = true
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }

    @objc private func showNewSDKTesting(_ sender: UIButton) {
        createCase("DIXL-MediaCo-Work-SDKTesting")
    }

    @objc private func showNewEmbeddedDataCase(_ sender: UIButton) {
        createCase("DIXL-MediaCo-Work-EmbeddedData")
    }

    private func createCase(_ caseClass: String) {
        Task {
            let startingFields = PMSDKCreateCaseStartingFields()
            // Set proper starting fields as defined in casetype model:
            // startingFields.set(value: "Johnny", forKey: "FirstName")

            let hostingController = UIHostingController(
                rootView: PMSDKCreateCaseView(
                    pegaURL: SDKConfiguration.environmentURL,
                    pegaVersion: SDKConfiguration.environmentVersion,
                    caseClass: caseClass,
                    startingFields: startingFields,
                    createCaseDelegate: self,
                    networkDelegate: mockedNetwork
                )
            )
            hostingController.modalPresentationStyle = .formSheet
            hostingController.modalTransitionStyle = .coverVertical
            self.controller = hostingController
            present(hostingController, animated: true, completion: nil)
        }
    }
}

// 3. Reacting on CreateCaseController lifecycle events (finish/closure)

extension ViewController: PMSDKCreateCaseViewDelegate {
    func createCaseView(_ view: PMSDKCreateCaseView, didFinishProcessingWith message: String?) {
        controller?.dismiss(animated: true)
        presentEphemeralAlert(title: "Case processing finished", message: message)
    }

    func createCaseView(_ view: PMSDKCreateCaseView, didFailProcessingWith errorMessage: String) {
        controller?.dismiss(animated: true)
        presentEphemeralAlert(title: "Case processing failed", message: errorMessage)
    }

    func createCaseViewDidCancelProcessing(_ view: PMSDKCreateCaseView) {
        controller?.dismiss(animated: true)
        presentEphemeralAlert(title: "Case processing canceled", message: "canceled")
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
