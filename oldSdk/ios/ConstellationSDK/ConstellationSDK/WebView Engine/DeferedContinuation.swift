class DeferedContinuation<T> {
    private var resultTask: Task<T, Never>?
    private var continuationHandler: ((sending T) -> Void)?

    deinit {
        resultTask?.cancel()
    }

    func proceed(_ result: T) {
        if continuationHandler == nil {
            Log.error("Tried to proceed a DeferedContinuation more than once")
        }
        continuationHandler?(result)
        continuationHandler = nil
    }

    func result() async -> T {
        if let resultTask {
            return await resultTask.value
        }

        let task = Task {
            await withCheckedContinuation { continuation in
                continuationHandler = continuation.resume
            }
        }

        resultTask = task
        return await task.value
    }
}
