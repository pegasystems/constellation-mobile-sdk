import Combine
import Foundation
import SwiftUI

// TODO: Rename/reorganize
public class ComponentManager {
    var componentEventCallback: ((String, String) -> Void)?
    var formSubmitCallback: (() -> Void)?

    private var providers = [String: any ComponentProvider]()
    private var context = [String: AnyCancellable]()
    
    var rootComponent: RootContainerComponentProvider {
        return providers["1"] as! RootContainerComponentProvider
    }

    init () {
        addComponent("1", type: "RootContainer")
    }

    public func view(for id: String) -> AnyView? {
        providers[id]?.view
    }

    func updateComponent(_ id: String, _ propsJson: String) {
        Log.info("Received properties, id=\(id), props=\(propsJson)")
        do {
            try providers[id]?.updateProperties(propsJson)
        } catch {
            Log.error("Unable to update props for component with ID \(id): \(error)")
        }
    }

    func addComponent(_ id: String, type: String) {
        guard providers[id] == nil else {
            Log.debug("Provider with id \(id) already exists.")
            return
        }
        var componentProvider = try? PMSDKComponentManager.shared.create(type)
        if componentProvider == nil {
            Log.warning("Cannot create component provider for \(type), falling back to `UnsupportedComponent`.")
            let unsupported = UnsupportedComponentProvider()
            unsupported.properties.type = type
            componentProvider = unsupported
        }

        guard let provider = componentProvider else {
            Log.error("Unexpected error during component creation.")
            return
        }

        providers[id] = provider
        (provider as? ContainerProvider)?.useManager(self)

        let coder = JSONEncoder()
        context[id] = provider.eventSubject
            .debounce(for: .milliseconds(200), scheduler: RunLoop.main)
            .tryMap({ try coder.encode($0) })
            .map({ String(decoding: $0, as: UTF8.self) })
            .sink(receiveCompletion: { completion in
                if case let .failure (err) = completion {
                    Log.error("can not emit event \(err.localizedDescription)")
                }
            }, receiveValue: { [weak self] encodedEvent in
                self?.componentEventCallback?(id, encodedEvent)
            })
    }

    func removeComponent(_ id: String) {
        Log.debug( "Removing component \(id)")
        providers.removeValue(forKey: id)
        context.removeValue(forKey: id)
    }

    func reset() {
        providers.removeAll()
        context.removeAll()
        componentEventCallback = nil
        formSubmitCallback = nil
    }
}
