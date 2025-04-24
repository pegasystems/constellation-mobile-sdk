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

    @IBAction
    private func showNewPegaCase(_ sender: UIButton) {
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
                    pegaVersion: SDKConfiguration.environmentVersion,
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
