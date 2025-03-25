//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import ConstellationSDK
import os

class MockedNetwork: PMSDKNetworkRequestDelegate {
    lazy var logger = Logger(subsystem: Bundle.main.bundleIdentifier ?? "SampleNativeMockedApp", category: "MockedNetwork")

    private func loadResponse(name: String, type: String) -> String {
        let path = Bundle.main.path(forResource: name, ofType: type)
        if let path = path {
            do {
                let content = try String(contentsOfFile: path, encoding: String.Encoding.utf8)
                return content
            } catch {}
        }
        fatalError("Cannot load response \(name) of type \(type)")
    }

    private func createResponse(url: URL, contentType: String) -> URLResponse {
        let headers = [
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=15",
            "Etag": "W/\"927172e94be5d264437adfde6870ba61\"",
            "Access-Control-Allow-Origin": "https://mocked.example"
        ]
        return HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: headers)!
    }

    func shouldHandle(request: URLRequest) -> Bool {
        if [
            "release.constellation.pega.io",
            "staging-cdn.constellation.pega.io",
            SDKConfiguration.environmentURL.host()
        ].contains(request.url?.host()) {
            return true
        }
        return false
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        guard let fileNameWithExt = request.url?.pathComponents.last else {
            fatalError("Cannot get path components for mocked response")
        }
        let splittedFileName = fileNameWithExt.split(separator: ".", maxSplits: 1)
        var (fileName, fileExt) = if splittedFileName.count == 2 {
            (String(splittedFileName[0]), String(splittedFileName[1]))
        } else {
            (String(splittedFileName[0]), "json")
        }
        // quick hack for constellation-core.ca97ba62.js
        if fileExt.contains(".js") {
            fileExt = "js"
        } else if fileName.contains("cases") {
            fileName = "SDKTesting"
        }
        let data = loadResponse(name: fileName, type: fileExt).data(using: .utf8)!
        let contentType = if (fileExt == "js") {
            "application/javascript"
        } else {
            "application/json"
        }
        let urlResponse = createResponse(url: request.url!, contentType: contentType)
        logger.log("Returning mocked data for \(fileNameWithExt)")
        return (data, urlResponse)
    }

    private func authorize(_ request: URLRequest) throws -> URLRequest {
        var mutableRequest = request
        return mutableRequest
    }

    private func modifiedData(_ data: Data) -> Data {
        return data
    }
}
