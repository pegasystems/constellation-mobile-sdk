import Foundation

enum MockedNetworkError: Error {
    case cannotCreateResponse
    case malformedRequest
    case fileNotFound(String)
}
