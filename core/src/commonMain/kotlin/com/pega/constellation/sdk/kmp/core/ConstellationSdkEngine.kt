package com.pega.constellation.sdk.kmp.core


interface ConstellationSdkEngine {
    val nativeHandle: Any?
        get() = null

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
    fun build(config: ConstellationSdkConfig, handler: EngineEventHandler): ConstellationSdkEngine
    fun registerOnBuiltListener(listener: (ConstellationSdkEngine) -> Unit)
}

abstract class ConstellationSdkEngineBuilderBase : ConstellationSdkEngineBuilder {
    private val listeners = mutableListOf<(ConstellationSdkEngine) -> Unit>()

    override fun registerOnBuiltListener(listener: (ConstellationSdkEngine) -> Unit) {
        listeners += listener
    }

    protected fun notifyBuilt(engine: ConstellationSdkEngine) {
        listeners.forEach { it(engine) }
        listeners.clear()
    }
}

