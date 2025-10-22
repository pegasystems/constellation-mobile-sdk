import XCTest
@testable import UITest
import ConstellationSdk

final class SDKWrapperTests: XCTestCase {
    func testThatItEmitsOnlyKnownStates() async throws {
        let sdk = MockedSDK()
        let wrapper = SDKWrapper(sdk: sdk)

        var emittedStates: [SDKState] = []

        let cancellable = wrapper.state.sink {
            emittedStates.append($0)
        }

        try await sdk.emitState(ConstellationSdkState.Loading())
        try await sdk.emitState(ConstellationSdkState.Initial())
        try await sdk.emitState(ConstellationSdkState.Error(error: InternalError(message: "errorString")))
        try await sdk.emitState(ConstellationSdkState.Finished(successMessage: "successMessage"))
        try await sdk.emitState("not a state")
        try await sdk.emitState(ConstellationSdkState.Cancelled())

        let expectedStates: [SDKState] = [
            .loading,
            .initial,
            .error("errorString"),
            .finished("successMessage"),
            .cancelled
        ]

        XCTAssertEqual(
            String(describing: expectedStates),
            String(describing: emittedStates)
        )
        cancellable.cancel()
    }
}

private class MockedSDK: ConstellationSdk {
    func openAssignment(assignmentId: String) {
        XCTFail("not implemented")
    }

    func createCase(caseClassName: String, startingFields: [String : Any]) {
        XCTFail("not implemented")
    }

    var state: any Kotlinx_coroutines_coreStateFlow = MockedStateFlow()

    func emitState(_ newState: Any) async throws {
        try await (state as? MockedStateFlow)?.emit(newState)
    }
}

private class MockedStateFlow: Kotlinx_coroutines_coreStateFlow {
    var value: Any? = nil

    var replayCache: [Any] = []

    private var collectors: [any Kotlinx_coroutines_coreFlowCollector] = []

    func emit(_ value: Any) async throws {
        self.value = value
        replayCache.append(value)
        for collector in collectors {
            try await collector.emit(value: value)
        }
    }

    func collect(collector: any Kotlinx_coroutines_coreFlowCollector) async throws {
        collectors.append(collector)
    }
}
