import WebviewKit
import Combine
import Foundation
import SwiftUI

enum SDKState {
    case initial
    case loading
    case ready(RootContainerComponent)
    case error(String?)
    case finished(String?)
    case cancelled
}

/*
 * Translates kotlin multiplatform states to convenient Swift native enum-based states.
 */
class SDKWrapper {

    private let sdk: ConstellationSdk
    let state: AnyPublisher<SDKState, Never>

    init(sdk: ConstellationSdk) {
        let collector = Collector<SDKState> { kotlinState in
            switch kotlinState {
            case is ConstellationSdkState.Loading: .loading
            case is ConstellationSdkState.Initial: .initial
            case let readyState as ConstellationSdkState.Ready: .ready(readyState.root)
            case let errorState as ConstellationSdkState.Error: .error(errorState.error)
            case let finishedState as ConstellationSdkState.Finished: .finished(finishedState.successMessage)
            case is ConstellationSdkState.Cancelled: .cancelled
            default: nil
            }
        }

        self.state = collector.publisher.receive(on: DispatchQueue.main).eraseToAnyPublisher()
        self.sdk = sdk
        self.sdk.state.collect(collector: collector, completionHandler: {_ in })
    }

    func create(_ caseClassName: String) {
        sdk.createCase(caseClassName: caseClassName, startingFields: [:])
    }
}
