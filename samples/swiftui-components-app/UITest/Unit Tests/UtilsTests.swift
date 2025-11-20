import XCTest
@testable import UITest

final class UtilsTests: XCTestCase {}

// MARK: - String Utils
extension UtilsTests {

    func testNilIfEmpty() {
        XCTAssertNil("".nilIfEmpty)
        XCTAssertEqual("notempty", "notempty".nilIfEmpty)
    }

    func testDecimalFormatter() {
        let expectations: [(String, String, Int)] = [
            // expected, input, decimalPlaces
            ("12345", "12345.12345", 0),

            ("123.0", "123.0", 1),
            ("123.0", "123.01", 1),
            ("123.0", "123,01", 1),
            ("123.0", "abc123,01", 1),
            ("123.0", "a1b2c3d,e0f1", 1),

            ("0.123", "0,12345", 3),
            ("12345.123", "12345.12345", 3),

            // allows big numbers
            (
                String(repeating: "1", count: 100) + ".123",
                String(repeating: "1", count: 100) + ".12345",
                3
            ),
        ]

        for (expect, input, decimal) in expectations {
            XCTAssertEqual(expect, input.formattedToDecimalPlaces(decimal))
        }
    }
}

// MARK: - Bundle Utils
extension UtilsTests {
    typealias ThrowingBlock = () throws -> Void
    private var bundle: Bundle {
        Bundle(for: Self.self)
    }

    func testThatItThrowsWhenFileNotFound() {
        let block: ThrowingBlock = {
            let _: String = try self.bundle.decode(jsonResource: "notafile")
        }
        XCTAssertThrowsError(try block()) {
            XCTAssertEqual(CocoaError.Code.fileNoSuchFile.rawValue, ($0 as NSError).code)
        }
    }

    func testThatItThrowsWhenInvalidJSON() {
        let block: ThrowingBlock = {
            let _: [String] = try self.bundle.decode(jsonResource: "malformed.json")
        }
        XCTAssertThrowsError(try block()) { error in
            if case let .dataCorrupted(context) = error as? DecodingError {
                XCTAssertEqual(0, context.codingPath.count)
                XCTAssertNotNil(context.underlyingError)
            } else {
                XCTFail()
            }
        }
    }

    func testThatItDecodesProperly() throws {
        let result: [String: Bool] = try self.bundle.decode(jsonResource: "booleans.json")
        XCTAssertEqual(2, result.count)
        XCTAssertEqual(true, result["yes"])
        XCTAssertEqual(false, result["no"])
    }
}
