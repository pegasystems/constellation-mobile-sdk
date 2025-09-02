import Foundation

public protocol PMSDKNetworkRequestDelegate: AnyObject {
    func shouldHandle(request: URLRequest) -> Bool
    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)
}
