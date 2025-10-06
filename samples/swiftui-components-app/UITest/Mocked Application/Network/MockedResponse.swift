import Foundation
import ConstellationSdk

struct MockedResponse {
    private let response: HTTPURLResponse
    private let responseUrl: URL

    init(
        url: URL,
        statusCode: Int,
        contentType: String,
        responseUrl: URL
    ) throws {
        let headers = [
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=15",
            "Etag": "W/\"927172e94be5d264437adfde6870ba61\"",
            "Access-Control-Allow-Origin": "https://url.example"
        ]
        let httpResponse = HTTPURLResponse(
            url: url,
            statusCode: statusCode,
            httpVersion: "HTTP/1.1", headerFields: headers
        )

        self.responseUrl = responseUrl
        if let httpResponse {
            self.response = httpResponse
        } else {
            throw MockedNetworkError.cannotCreateResponse
        }
    }

    init(url:URL, fileName: String, fileExtension: String) throws {
        guard let responseUrl = Bundle.main.url(
            forResource: fileName,
            withExtension: fileExtension
        ) else {
            throw MockedNetworkError.fileNotFound("\(fileName)")
        }
        try self.init(
            url: url,
            statusCode: 200,
            contentType: Self.contentType(forExt: fileExtension),
            responseUrl: responseUrl
        )
    }

    func execute() throws -> KotlinPair<NSData, URLResponse> {
        KotlinPair(first: NSData(contentsOf: responseUrl), second: response)
    }

    private static func contentType(forExt fileExt: String) -> String {
        switch fileExt.lowercased() {
        case "js":
            "application/javascript"
        default:
            "application/json"
        }
    }
}
