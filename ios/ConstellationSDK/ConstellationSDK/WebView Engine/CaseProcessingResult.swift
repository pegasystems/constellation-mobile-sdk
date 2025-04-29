typealias CaseProcessingResultHandler = (CaseProcessingResult) -> Void

enum CaseProcessingResult {
    case finished(String?)
    case error(String)
    case cancelled
}
