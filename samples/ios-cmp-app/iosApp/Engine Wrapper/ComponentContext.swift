import BaseCmpApp
import WebViewEngine

class ContextWrapper: CoreComponentContext {
    private let context: Engine.Event.ComponentContext
    private let manager: CoreComponentManager

    init(context: Engine.Event.ComponentContext, manager: CoreComponentManager) {
        self.context = context
        self.manager = manager
    }

    func sendComponentEvent(event: CoreComponentEvent) {
        context.updateHandler(event.encodeToJsonString())
    }

    var componentManager: any CoreComponentManager {
        manager
    }

    var id: Int32 {
        Int32(context.id)
    }

    var type: Any {
        context.type
    }
}
