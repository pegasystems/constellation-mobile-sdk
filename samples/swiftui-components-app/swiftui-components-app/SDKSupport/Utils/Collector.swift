import ConstellationSdk
import Combine
import Foundation

class Collector<T: Any>: Kotlinx_coroutines_coreFlowCollector {

    let publisher: AnyPublisher<T, Never>
    private let subject: PassthroughSubject<T, Never>
    private let mapper: (Any?) -> T?

    init(mapper: @escaping (Any?) -> T?) {
        self.subject = PassthroughSubject<T, Never>()
        self.publisher = subject.eraseToAnyPublisher()
        self.mapper = mapper
    }

    func emit(value: Any?) async throws {
        if let newValue = mapper(value) {
            subject.send(newValue)
        }
    }
}
