import Foundation

class DefaultProvider: PMSDKNetworkRequestDelegate {
    func shouldHandle(request: URLRequest) -> Bool {
        true
    }

    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse) {
        Log.debug(
            "Sending request to \(request.url?.absoluteString ?? "nil") using built-in mechanism."
        )
        return try await URLSession.shared.data(for: request)
    }
}
