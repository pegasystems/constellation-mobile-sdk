import ConstellationSdk
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
            case is ConstellationSdkState.Loading: return .loading
            case is ConstellationSdkState.Initial: return .initial
            case let readyState as ConstellationSdkState.Ready:
                EnvironmentInfo.shared.locale = readyState.environmentInfo.locale
                EnvironmentInfo.shared.timeZone = readyState.environmentInfo.timeZone
                return .ready(readyState.root)
            case let errorState as ConstellationSdkState.Error: return .error(errorState.error.message)
            case let finishedState as ConstellationSdkState.Finished: return .finished(finishedState.successMessage)
            case is ConstellationSdkState.Cancelled: return .cancelled
            default: return nil
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

class EnvironmentInfo {
    static let shared = EnvironmentInfo()
    private init() {}
    var locale = "en-US"
    var timeZone = "New York"
}
