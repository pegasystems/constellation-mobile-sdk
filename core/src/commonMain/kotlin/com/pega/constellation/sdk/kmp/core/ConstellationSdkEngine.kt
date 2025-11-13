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
     * Performs the specified action using the Constellation SDK.
     */
    fun performAction(action: ConstellationSdkAction)
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
    data class Ready(val environmentInfo: EnvironmentInfo) : EngineEvent()
    data class Finished(val successMessage: String?) : EngineEvent()
    data class Error(val error: EngineError) : EngineEvent()
    data object Cancelled : EngineEvent()
}


interface EngineError {
    val message: String
}
