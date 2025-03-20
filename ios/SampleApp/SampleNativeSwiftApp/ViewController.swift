//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import UIKit
import SwiftUI
import ConstellationSDK
import OAuth2

class ViewController: UIViewController {
    
    var loadMobileSDKContent: UIButton!
    var oauth: OAuth2?
    weak var controller: UIHostingController<PMSDKCreateCaseView>?

    override func viewDidLoad() {
        super.viewDidLoad()

        configurePegaSDK()

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
        
        let button: UIButton = {
            let button = UIButton(type: .system)
            button.setTitle("Create a new Case", for: .normal)
            button.backgroundColor = UIColor.systemBlue
            button.setTitleColor(.white, for: .normal)
            button.layer.cornerRadius = 10
            button.clipsToBounds = true
            return button
        }()
        button.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(button)
        button.centerXAnchor.constraint(equalTo: view.centerXAnchor).isActive = true
        button.centerYAnchor.constraint(equalTo: view.centerYAnchor).isActive = true
        button.widthAnchor.constraint(equalToConstant: 200).isActive = true
        button.heightAnchor.constraint(equalToConstant: 50).isActive = true
        button.addTarget(self, action: #selector(showNewPegaCase), for: .touchUpInside)
    }
    
    private func configurePegaSDK() {

        // 1. Registering HTTP interceptor
        PMSDKNetwork.shared.requestDelegate = self
        
        // 2. Registering custom SwiftUI controls
        PMSDKComponentManager.shared.register("TextArea") {
            CustomTextAreaComponentProvider()
        }
        PMSDKComponentManager.shared.register("TextInput") {
            CustomTextInputComponentProvider()
        }
        try? PMSDKComponentManager.shared.register(
            "MyCompany_MyLib_Slider",
            jsFile: Bundle.main.url(forResource: "slider.component", withExtension: "js")!
        ) {
            CustomSliderProvider()
        }
    }

    @objc private func showNewPegaCase(_ sender: UIButton) {
        Task {
            let authorization = Authorization(settings: SDKConfiguration.oauth2Configuration)
            oauth = try await authorization.prepareOAuthClient()

            // 3. Create case form creation
            let startingFields = PMSDKCreateCaseStartingFields()
            // Set proper starting fields as defined in casetype model:
            // startingFields.set(value: "Johnny", forKey: "FirstName")

            let hostingController = UIHostingController(
                rootView: PMSDKCreateCaseView(
                    pegaURL: SDKConfiguration.environmentURL,
                    caseClass: SDKConfiguration.caseClassName,
                    startingFields: startingFields,
                    delegate: self
                )
            )
            hostingController.modalPresentationStyle = .formSheet
            hostingController.modalTransitionStyle = .coverVertical
            self.controller = hostingController
            present(hostingController, animated: true, completion: nil)
        }
    }
}

// 4. Reacting on CreateCaseController lifecycle events (finish/closure)

extension ViewController: PMSDKCreateCaseViewDelegate {
    func createCaseView(_ view: PMSDKCreateCaseView, didFinishProcessingWith message: String?) {
        controller?.dismiss(animated: true)
        let alertController = UIAlertController(title: "Case processing finished",
                                                message: message,
                                                preferredStyle: .alert)
        present(alertController, animated: true)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            alertController.dismiss(animated: true)
        }
    }
    
    func createCaseViewDidCancelProcessing(_ view: PMSDKCreateCaseView) {
        controller?.dismiss(animated: true)
        let alertController = UIAlertController(title: "Case processing canceled",
                                                message: "canceled",
                                                preferredStyle: .alert)
        present(alertController, animated: true)
        DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
            alertController.dismiss(animated: true)
        }
    }
}

// 1.1 - Intercepting HTTP request/response
extension ViewController: PMSDKNetworkRequestDelegate {
    
    func shouldHandle(request: URLRequest) -> Bool {
        if [
            "release.constellation.pega.io",
            "staging-cdn.constellation.pega.io",
            SDKConfiguration.environmentURL.host()
        ].contains(request.url?.host()) {
            return true
        }
        return false
    }
    
    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        var authorizedRequest = try authorize(request)
        if (authorizedRequest.httpMethod == "GET") {
            authorizedRequest.httpBody = nil;
        }
        let (data, response) = try await URLSession.shared.data(for: authorizedRequest)
        
        let modifiedData = modifiedData(data)
        return (modifiedData, response)
    }
    
    private func authorize(_ request: URLRequest) throws -> URLRequest {
        guard let accessToken = oauth?.accessToken else {
            throw OAuth2Error.noAccessToken
        }

        var mutableRequest = request
        mutableRequest.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        return mutableRequest
    }
    
    private func modifiedData(_ data: Data) -> Data {
        guard var responseBody = String(data: data, encoding: .utf8) else {
            return data
        }
        if responseBody.contains("\"FirstName\":\"\"") {
            responseBody = responseBody.replacingOccurrences(of: "\"FirstName\":\"\"", with: "\"FirstName\":\"Thomas\"")
            let modifiedData = responseBody.data(using: .utf8)!
            return modifiedData
        }
        return data
    }
}
