//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation
import ConstellationSDK
import os

class MockedNetwork: PMSDKNetworkRequestDelegate {
    lazy var logger = Logger(subsystem: Bundle.main.bundleIdentifier ?? "SampleMockedApp", category: "MockedNetwork")

    private func loadResponseData(name: String, type: String, method: String) -> Data {
        let path = if name == "SDKTesting" || name == "NewService" {
            Bundle.main.path(forResource: "\(name)-\(method)", ofType: type)
        } else {
            Bundle.main.path(forResource: "\(name)", ofType: type)
        }
        if let path = path {
            do {
                return try Data(contentsOf: URL(fileURLWithPath: path))
            } catch {
                fatalError("Incorrect data in response \(name) of type \(type) for \(method)")
            }
        }
        fatalError("Cannot load response \(name) of type \(type) for \(method)")
    }

    private func createResponse(url: URL, contentType: String) -> URLResponse {
        let headers = [
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=15",
            "Etag": "W/\"927172e94be5d264437adfde6870ba61\"",
            "Access-Control-Allow-Origin": "https://url.example"
        ]
        return HTTPURLResponse(url: url, statusCode: 200, httpVersion: "HTTP/1.1", headerFields: headers)!
    }

    private func getFileNameAndExt(fromComponent fileNameWithExt: String) -> (String, String) {
        let splittedFileName = fileNameWithExt.split(separator: ".")
        var (fileName, fileExt) = if splittedFileName.count >= 2 {
            (String(splittedFileName.first!), String(splittedFileName.last!))
        } else {
            (String(splittedFileName[0]), "json")
        }
        if fileName.contains("cases") {
            fileName = "SDKTesting"
        }
        return (fileName, fileExt)
    }

    private func getContentType(forExt fileExt: String) -> String {
        return switch fileExt.lowercased() {
            case "js":
                "application/javascript"
            default:
                "application/json"
        }
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        if let fileNameWithExt = request.url?.pathComponents.last {
            let method = request.httpMethod ?? "GET"
            let (fileName, fileExt) = getFileNameAndExt(fromComponent: fileNameWithExt)
            let data = loadResponseData(name: fileName, type: fileExt, method: method)
            let urlResponse = createResponse(url: request.url!, contentType: getContentType(forExt: fileExt))
            logger.log("Returning mocked data for \(fileNameWithExt)")
            return (data, urlResponse)
        }
        fatalError("Cannot get path components for mocked response")
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
}
