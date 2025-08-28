import Foundation
import ConstellationSDK
import os

class MockedNetworkGenericDelegate: PMSDKNetworkRequestDelegate {
    private func getFileNameAndExt(fromComponent fileNameWithExt: String) -> (String, String) {
        let splittedFileName = fileNameWithExt.split(separator: ".")
        let (fileName, fileExt) = if splittedFileName.count >= 2 {
            (String(splittedFileName.first!), String(splittedFileName.last!))
        } else {
            (String(splittedFileName[0]), "json")
        }
        return (fileName, fileExt)
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
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
