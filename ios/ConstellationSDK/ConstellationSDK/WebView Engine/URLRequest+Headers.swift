import Foundation

extension URLRequest {
    private static let disallowedHeaders = [
        "Referer",
        "Origin",
        "X-Requested-With",
        "User-Agent",
        "sec-ch-ua*",
        "Sec-Fetch*"
    ].map { $0.lowercased() }

    func removingUnwantedHeaders() -> URLRequest {
        var mutableRequest = self

        allHTTPHeaderFields?
            .filter { header in
                isUndefinedAuthHeader(header) || isDisallowedHeader(header)
            }
            .forEach { (headerField, _) in
                mutableRequest.setValue(nil, forHTTPHeaderField: headerField)
            }

        return mutableRequest
    }

    private func isUndefinedAuthHeader(_ header: (key: String, value: String)) -> Bool {
        header.key.lowercased() == "authorization" && header.value.lowercased() == "undefined"
    }

    private func isDisallowedHeader(_ header: (key: String, _: String)) -> Bool {
        URLRequest.disallowedHeaders.contains { disallowedHeader in
            if disallowedHeader.hasSuffix("*") {
                header.key.lowercased().hasPrefix(disallowedHeader.dropLast())
            } else {
                header.key.lowercased() == disallowedHeader
            }
        }
    }
}
