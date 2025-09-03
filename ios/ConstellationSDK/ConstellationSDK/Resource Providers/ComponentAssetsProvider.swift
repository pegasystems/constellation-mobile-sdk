import Foundation
import UniformTypeIdentifiers

class ComponentAssetsProvider: PMSDKNetworkRequestDelegate {
    func shouldHandle(request: URLRequest) -> Bool {
        request.url?.path().contains("/constellation-mobile-sdk-assets/components/") ?? false
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        guard let url = request.url else {
            throw LocalProviderError.unexpectedURL
        }

        let data = try PMSDKComponentManager
            .shared
            .componentFileContents(url.lastPathComponent)

        guard let response = HTTPURLResponse(
            url: url,
            statusCode: 200,
            httpVersion: nil,
            headerFields: ["Content-Type": "text/javascript"]
        ) else {
            throw LocalProviderError.cannotCreateResponse
        }

        return (data, response)
    }

}
