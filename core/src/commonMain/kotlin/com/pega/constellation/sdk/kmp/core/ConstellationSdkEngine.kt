package com.pega.constellation.sdk.kmp.core


interface ConstellationSdkEngine {
    fun load(caseClassName: String, startingFields: Map<String, Any>)
}

fun interface EngineEventHandler {
    fun handle(event: EngineEvent)
}

sealed class EngineEvent {
    data object Loading : EngineEvent()
    data object Ready : EngineEvent()
    data class Finished(val successMessage: String?) : EngineEvent()
    data class Error(val error: String?) : EngineEvent()
    data object Cancelled : EngineEvent()
}

interface ConstellationSdkEngineBuilder {
    fun buildConstellationSdkEngine(
        config: ConstellationSdkConfig,
        handler: EngineEventHandler
    ): ConstellationSdkEngine
}

