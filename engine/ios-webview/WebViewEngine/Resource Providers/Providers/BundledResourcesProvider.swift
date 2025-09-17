import Foundation
import UniformTypeIdentifiers

class BundledResourcesProvider: ResourceProvider {
    private let bundle = Bundle(for: BundledResourcesProvider.self)

    func shouldHandle(request: URLRequest) -> Bool {
        request.url?.path().contains("/constellation-mobile-sdk-assets/") ?? false
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        guard let url = request.url else {
            throw LocalProviderError.unexpectedURL
        }

        Log.debug("Local response for \(url)")

        let data = try data(from: extractResourcePath(from: url))
        let response = try createResponse(to: url)
        return (data, response)
    }

    private func extractResourcePath(from url: URL) throws -> String {
        let path = url
            .relativePath
            .range(of: "constellation-mobile-sdk-assets/")
            .map { url.relativePath[$0.upperBound...] }

        if let path, !path.contains("..") {
            return String(path)
        } else {
            throw LocalProviderError.unexpectedURL
        }
    }

    private func data(from path: String) throws -> Data {
        guard let bundleURL = bundle.resourceURL else {
            throw LocalProviderError.fileNotFound
        }

        return try Data(contentsOf: bundleURL.appending(path: path))
    }

    private func createResponse(to requestURL: URL) throws -> URLResponse{
        var headers: [String : String]? = nil

        UTType(filenameExtension: requestURL.pathExtension)?.preferredMIMEType.map {
            headers = ["Content-Type": $0]
        }

        if let response = HTTPURLResponse(
            url: requestURL,
            statusCode: 200,
            httpVersion: nil,
            headerFields: headers
        ) {
            return response
        } else {
            throw LocalProviderError.cannotCreateResponse
        }
    }
}
