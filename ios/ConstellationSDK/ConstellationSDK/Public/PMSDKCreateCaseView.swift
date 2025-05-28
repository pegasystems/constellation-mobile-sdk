import Foundation
import SwiftUI

public struct PMSDKCreateCaseView: View {
    @State private var rootView: AnyView? = nil
    private let engineConfiguration: WebViewEngine.Configuration
    private weak var delegate: PMSDKCreateCaseViewDelegate?

    public init(pegaURL: URL,
                pegaVersion: String,
                caseClass: String,
                startingFields: PMSDKCreateCaseStartingFields = .init(),
                delegate: PMSDKCreateCaseViewDelegate? = nil
    ) {
        engineConfiguration = .init(
            url: pegaURL,
            version: pegaVersion,
            caseClassName: caseClass,
            startingFields: startingFields)
        self.delegate = delegate
    }

    public var body: some View {
        let backgroundColor = UIColor(red: 5/255,
                                      green: 21/255,
                                      blue: 59/255,
                                      alpha: 1.0)
        VStack {
            if let rootView {
                rootView.background(Color(backgroundColor))
            }
        }.task {
            await startProcessing()
        }.background(Color.yellow)
    }

    private func startProcessing() async {
        do {
            let engine = try WebViewEngine(configuration: engineConfiguration)
            rootView = AnyView(engine.manager.view(for: "1"))
            switch await engine.startProcessing() {
            case .cancelled:
                delegate?.createCaseViewDidCancelProcessing(self)
            case .finished(let message):
                delegate?.createCaseView(self, didFinishProcessingWith: message)
            case .error(let message):
                delegate?.createCaseView(self, didFailProcessingWith: message)
            }
        } catch WebViewEngineError.incorrectBaseURL {
            delegate?.createCaseView(self, didFailProcessingWith: "Incorrect base URL.")
        } catch {
            delegate?.createCaseView(self, didFailProcessingWith: error.localizedDescription)
        }
    }
}

public protocol PMSDKCreateCaseViewDelegate: AnyObject {
    func createCaseView(_ view: PMSDKCreateCaseView, didFinishProcessingWith message: String?)
    func createCaseView(_ view: PMSDKCreateCaseView, didFailProcessingWith errorMessage: String)
    func createCaseViewDidCancelProcessing(_ view: PMSDKCreateCaseView)
}
