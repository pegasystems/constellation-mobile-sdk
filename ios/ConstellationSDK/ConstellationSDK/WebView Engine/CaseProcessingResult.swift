//
// Copyright (c) 2025 and Confidential to Pegasystems Inc. All rights reserved.
//

typealias CaseProcessingResultHandler = (CaseProcessingResult) -> Void

enum CaseProcessingResult {
    case finished(String?)
    case error(String)
    case cancelled
}
