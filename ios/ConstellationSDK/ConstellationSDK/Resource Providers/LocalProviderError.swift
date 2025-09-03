import Foundation

enum LocalProviderError: Error {
    case fileNotFound
    case unexpectedURL
    case cannotCreateResponse
}
