import Foundation
import SwiftUI

public struct PMSDKCreateCaseView: View {
    let engine = WebViewEngine()
    private let engineConfiguration: WebViewEngine.Configuration
    private weak var delegate: PMSDKCreateCaseViewDelegate?

    public init(pegaURL: URL,
                caseClass: String,
                startingFields: PMSDKCreateCaseStartingFields = .init(),
                delegate: PMSDKCreateCaseViewDelegate? = nil
    ) {
        engineConfiguration = .init(
            url: pegaURL,
            version: "8.24.1",
            caseClassName: caseClass,
            startingFields: startingFields)
        self.delegate = delegate
    }

    public var body: some View {
        VStack {
            engine.manager.view(for: "1")?.padding()
        }.task {
            engine.start(engineConfiguration) {
                switch $0 {
                case .cancelled:
                    delegate?.createCaseViewDidCancelProcessing(self)
                case .finished(let message):
                    delegate?.createCaseView(self, didFinishProcessingWith: message)
                case .error(let message):
                    delegate?.createCaseView(self, didFailProcessingWith: message)
                }
            }
        }
    }
}

public protocol PMSDKCreateCaseViewDelegate: AnyObject {
    func createCaseView(_ view: PMSDKCreateCaseView, didFinishProcessingWith message: String?)
    func createCaseView(_ view: PMSDKCreateCaseView, didFailProcessingWith errorMessage: String)
    func createCaseViewDidCancelProcessing(_ view: PMSDKCreateCaseView)
}
