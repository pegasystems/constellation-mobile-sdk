class DeferedContinuation<T> {
    private var resultTask: Task<T, Never>?
    private var continuationHandler: ((sending T) -> Void)?

    deinit {
        resultTask?.cancel()
    }

    func proceed(_ result: T) {
        continuationHandler?(result)
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
