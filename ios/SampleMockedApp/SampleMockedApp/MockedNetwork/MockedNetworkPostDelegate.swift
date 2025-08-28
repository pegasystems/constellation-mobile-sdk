import Foundation
import ConstellationSDK

class MockedNetworkPostDelegate: PMSDKNetworkRequestDelegate {
    func shouldHandle(request: URLRequest) -> Bool {
        request.httpMethod == "POST"
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        let fileName = switch try caseTypeId(from: request.httpBody ?? Data()) {
        case "DIXL-MediaCo-Work-SDKTesting": "SDKTesting-POST"
        case "DIXL-MediaCo-Work-NewService": "NewService-POST"
        case "DIXL-MediaCo-Work-EmbeddedData": "EmbeddedData-POST"
        default: throw MockedNetworkError.cannotCreateResponse
        }
        return try MockedResponse(
            url: request.url!,
            fileName: fileName,
            fileExtension: "json"
        ).execute()
    }

    private func caseTypeId(from body: Data) throws -> String {
        let json = try JSONSerialization.jsonObject(with: body) as? [String: Any]
        if let caseTypeId = json?["caseTypeID"] as? String {
            return caseTypeId
        } else {
            throw MockedNetworkError.malformedRequest
        }
    }
}
