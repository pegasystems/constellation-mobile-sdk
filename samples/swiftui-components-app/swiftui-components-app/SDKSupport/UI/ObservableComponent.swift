import SdkEngineWebViewKit
import SwiftUI

class ObservableComponent<C: Component>: ObservableObject, ComponentObserver {
    @Published var component: C

    init(component: C) {
        self.component = component
        component.addObserver(observer: self)
    }

    func onUpdated() {
        objectWillChange.send()
    }
}

class BindingChangeSource<C: Component, T: Equatable>: MappedBindingChangeSource<C, T, T> {
    init(binding: Binding<T>, component: C , keypath: KeyPath<C, T>) {
        super.init(binding: binding, component: component, keyPath: keypath) {
            $0
        }
    }

    static func install(binding: Binding<T>, component: C , keypath: KeyPath<C, T>) {
        component.addObserver(
            observer: BindingChangeSource(
                binding: binding,
                component: component,
                keypath: keypath
            )
        )
    }
}

class MappedBindingChangeSource <C: Component, T: Equatable, M:Equatable> : ComponentObserver {

    private let binding: Binding<M>
    private let keyPath: KeyPath<C, T>
    private let component: C
    private let mapper: (T) -> M

    init(binding: Binding<M>, component: C, keyPath: KeyPath<C, T>, mapper: @escaping (T) -> M) {
        self.binding = binding
        self.keyPath = keyPath
        self.component = component
        self.mapper = mapper
    }

    func onUpdated() {
        DispatchQueue.main.async { [self] in
            let newValue = mapper(component[keyPath: keyPath])
            if binding.wrappedValue != newValue {
                binding.wrappedValue = newValue
            }
        }
    }

    static func install(binding: Binding<M>, component: C, keyPath: KeyPath<C, T>, mapper: @escaping (T) -> M) {
        component.addObserver(
            observer: MappedBindingChangeSource(
                binding: binding,
                component: component,
                keyPath: keyPath,
                mapper: mapper
            )
        )
    }
}
