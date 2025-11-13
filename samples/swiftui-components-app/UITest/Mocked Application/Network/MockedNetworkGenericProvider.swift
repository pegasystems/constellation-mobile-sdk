import Foundation
import ConstellationSdk
import os

class MockedNetworkGenericProvider: ResourceProvider {
    private func getFileNameAndExt(fromComponent fileNameWithExt: String) -> (String, String) {
        if fileNameWithExt.contains("D_pxBootstrapConfig") {
            return (fileNameWithExt, "json")
        }

        let splittedFileName = fileNameWithExt.split(separator: ".")

        if splittedFileName.count >= 2 {
            return (String(splittedFileName.first!), String(splittedFileName.last!))
        }

        return (String(splittedFileName[0]), "json")
    }

    func performRequest(request: URLRequest) async throws -> KotlinPair<NSData, URLResponse> {
        guard let fileNameWithExt = request.url?.pathComponents.last else {
            throw MockedNetworkError.malformedRequest
        }
        let (fileName, fileExt) = getFileNameAndExt(fromComponent: fileNameWithExt)
        return try MockedResponse(
            url: request.url!,
            fileName: fileName,
            fileExtension: fileExt
        ).execute()
    }

    func shouldHandle(request: URLRequest) -> Bool {
        true
    }
}
