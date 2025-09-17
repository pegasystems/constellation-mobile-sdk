import BaseCmpApp
import WebViewEngine

class BuilderWrapper: CoreConstellationSdkEngineBuilder {
    private let customResourceProvider: ResourceProvider?

    init(customResourceProvider: ResourceProvider?) {
        self.customResourceProvider = customResourceProvider
    }

    func build(
        config: CoreConstellationSdkConfig,
        handler: any CoreEngineEventHandler
    ) -> any CoreConstellationSdkEngine {
        guard let pegaUrl = URL(string: config.pegaUrl) else {
            fatalError()
        }
        let configuration = Engine.Configuration(
            url: pegaUrl,
            version: config.pegaVersion,
            debuggable: config.debuggable
        )

        let eventHandler = EventHandlerWrapper(
            eventHandler: handler,
            componentManager: config.componentManager
        )

        return EngineWrapper(
            engine: .init(
                config: configuration,
                handler: eventHandler,
                provider: customResourceProvider
            )
        )
    }
}
