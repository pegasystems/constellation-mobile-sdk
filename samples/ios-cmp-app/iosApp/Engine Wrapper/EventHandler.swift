import BaseCmpApp
import WebViewEngine

class EventHandlerWrapper: EngineEventHandler {
    let eventHandler: any CoreEngineEventHandler
    let componentManager: CoreComponentManager

    init(
        eventHandler: any CoreEngineEventHandler,
        componentManager: CoreComponentManager
    ) {
        self.eventHandler = eventHandler
        self.componentManager = componentManager
    }

    func handleEvent(_ event: WebViewEngine.Engine.Event) {
        switch(event) {
        // engine state
        case .loading: eventHandler.handle(event: CoreEngineEvent.Loading())
        case .ready: eventHandler.handle(event: CoreEngineEvent.Ready())
        case .finished(let messgae): eventHandler.handle(event: CoreEngineEvent.Finished(successMessage: messgae))
        case .error(let message): eventHandler.handle(event: CoreEngineEvent.Error(error: message))
        case .cancelled: eventHandler.handle(event: CoreEngineEvent.Cancelled())

        // components state
        case .addComponent(let context): emitComponent(context: context)
        case .updateComponent(let data): componentManager.updateComponent(
            id: Int32(data.id),
            props: JsonUtilsKt.serialize(input: data.data)
        )
        case .removeComponent(let id): componentManager.removeComponent(id: Int32(id))

        default: fatalError()
        }
    }

    private func emitComponent(context: Engine.Event.ComponentContext) {
        componentManager.addComponent(
            context: ContextWrapper(
                context: context,
                manager: componentManager
            )
        )
    }
}
