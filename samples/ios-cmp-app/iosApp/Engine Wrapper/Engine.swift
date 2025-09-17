import BaseCmpApp
import WebViewEngine

class EngineWrapper: CoreConstellationSdkEngine {
    private let engine: Engine

    init(engine: Engine) {
        self.engine = engine
    }

    func load(caseClassName: String, startingFields: [String : Any]) {
        engine.load(caseClassName: caseClassName, startingFields: startingFields)
    }
}
