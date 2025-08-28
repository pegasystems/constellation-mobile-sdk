import Foundation
import ConstellationSDK

//TODO: it should handle all PATCH requests
class MockedNetworkPatchDelegate: PMSDKNetworkRequestDelegate {
    func shouldHandle(request: URLRequest) -> Bool {
        request.httpMethod == "PATCH"
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        let path = request.url?.path() ?? ""
        let fileName = switch true {
        case path.contains("E-6026"): "EmbeddedData-1-Create"
        case path.contains("S-1709"): "SDKTesting-PATCH"
        default: throw MockedNetworkError.cannotCreateResponse
        }
        return try MockedResponse(
            url: request.url!,
            fileName: fileName,
            fileExtension: "json"
        ).execute()
    }
}
