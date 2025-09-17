import Combine
import Foundation
import WebKit

struct ComponentEvent {
    let id: Int
    let eventContent:String
}

class FormHandler: NSObject, WKScriptMessageHandler {
    private let eventHandler: EngineEventHandler
    private let passthroughSubject: PassthroughSubject<ComponentEvent, Never>
    let eventStream: AnyPublisher<ComponentEvent, Never>

    init(eventHandler: EngineEventHandler) {
        self.eventHandler = eventHandler
        self.passthroughSubject = .init()
        self.eventStream = self.passthroughSubject.eraseToAnyPublisher()
        super.init()
    }

    func userContentController(
        _ userContentController: WKUserContentController,
        didReceive message: WKScriptMessage
    ) {
        guard 
            let array = message.body as? [Any],
            let type = array[0] as? String
        else {
            Log.error("Can not decode message")
            return
        }
        Log.debug("Received \(type)")
        switch type {
        case "updateComponent": handleUpdateComponent(array)
        case "addComponent": handleAddComponent(array)
        case "removeComponent": handleRemoveComponent(array)
        case "ready": eventHandler.handleEvent(.ready)
        case "finished": eventHandler.handleEvent(.finished(array[1] as? String))
        case "cancelled": eventHandler.handleEvent(.cancelled)
        case "error": eventHandler.handleEvent(.error(array[1] as? String))
        default:
            Log.error("Unexpected message type: \(type)")
        }
    }

    func handleLoading() {
        eventHandler.handleEvent(.loading)
    }

    private func handleUpdateComponent(_ input: [Any]) {
        if
            let cId = input.componentId,
            let props = input[2] as? String {
            eventHandler.handleEvent(.updateComponent(.init(id: cId, data: props)))
        } else {
            Log.error("Unexpected parameters types in updateComponent")
        }
    }

    private func handleAddComponent(_ input: [Any]) {
        guard
            let cId = input.componentId,
            let cType = input[2] as? String
        else {
            Log.error("Unexpected input for addComponent.")
            return
        }
        let context = Engine.Event.ComponentContext(
            id: cId,
            type: cType
        ) { [weak passthroughSubject] in
            passthroughSubject?.send(
                .init(
                    id: cId,
                    eventContent: $0
                )
            )
        }
        eventHandler.handleEvent(.addComponent(context))
    }

    private func handleRemoveComponent(_ input: [Any]) {
        guard let cId = input.componentId else {
            Log.error("Unexpected input for removeComponent.")
            return
        }
        eventHandler.handleEvent(.removeComponent(cId))
    }
}

extension Array where Element == Any {
    fileprivate var componentId: Int? {
        if let intId = self[1] as? Int {
            intId
        } else if let stringId = self[1] as? String {
            Int(stringId)
        } else {
            nil
        }
    }
}
