package com.pega.constellation.sdk.kmp.core


/**
 * Constellation SDK Engine that orchestrates Pega application logic.
 * It mediates between UI components and the DX API.
 */
interface ConstellationSdkEngine {
    /**
     * Configures the engine with the provided configuration and event handler.
     */
    fun configure(config: ConstellationSdkConfig, handler: EngineEventHandler)

    /**
     * Creates a case of the specified class name with the provided starting fields.
     */
    fun createCase(caseClassName: String, startingFields: Map<String, Any>)
}

/**
 * Functional interface for handling engine events.
 */
fun interface EngineEventHandler {
    fun handle(event: EngineEvent)
}

/**
 * Represents various events that can occur during the lifecycle of the Constellation SDK Engine.
 *
 * - Loading: Indicates that the engine is loading.
 * - Ready: Indicates that the engine is ready.
 * - Finished: Indicates that the engine has finished form processing.
 * - Error: Indicates that an error has occurred in the engine.
 * - Cancelled: Indicates that the form processing has been cancelled.
 */
sealed class EngineEvent {
    data object Loading : EngineEvent()
    data object Ready : EngineEvent()
    data class Finished(val successMessage: String?) : EngineEvent()
    data class Error(val error: EngineError) : EngineEvent()
    data object Cancelled : EngineEvent()
}


sealed class EngineError(open val message: String?) {
    class JsError(val type: String, message: String?) : EngineError(message)
    class InternalError(message: String?) : EngineError(message)
}
