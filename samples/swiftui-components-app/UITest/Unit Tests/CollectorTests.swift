import XCTest
@testable import UITest

final class CollectorTests: XCTestCase {

    func testSimpleMapping() async throws {
        let collector = Collector {
            $0 as? String
        }

        var result: [String] = []
        let cancellable = collector.publisher.sink(receiveValue: { result.append($0) })
        try await collector.emit(value: 0)
        try await collector.emit(value: "abc")
        try await collector.emit(value: "def")
        try await collector.emit(value: ["some array"])
        try await collector.emit(value: "123")
        cancellable.cancel()

        XCTAssertEqual(["abc", "def", "123"], result)
    }
}
