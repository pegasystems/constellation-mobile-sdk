//
// Copyright (c) 2024 and Confidential to Pegasystems Inc. All rights reserved.
//

import Foundation

public class PMSDKNetwork {
    
    public static let shared = PMSDKNetwork()
    private init() {}
    public weak var requestDelegate: PMSDKNetworkRequestDelegate?
}

public protocol PMSDKNetworkRequestDelegate: AnyObject {
    func shouldHandle(request: URLRequest) -> Bool
    func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)
}

enum HTTPHandlerError: Error {
    case shouldNotBeHandled
}

extension PMSDKNetwork {

    private static func canHandle(_ request: URLRequest) throws {
        if !(PMSDKNetwork.shared.requestDelegate?.shouldHandle(request: request) ?? false) {
            throw HTTPHandlerError.shouldNotBeHandled
        }
    }

    static func send(_ request: URLRequest) async throws -> (Data, URLResponse) {
        // i would prefer to log error from here, but old SDK do it this way
        guard let requestDelegate = PMSDKNetwork.shared.requestDelegate else {
            fatalError("Invalid configuration. PMSDKNetwork without a delegate object.")
        }
        try canHandle(request)
        return try await requestDelegate.performRequest(request)
    }
}
