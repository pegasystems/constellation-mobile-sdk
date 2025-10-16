package com.pega.constellation.sdk.kmp.core.internal

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.EngineError
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

internal class ConstellationSdkImpl(
    config: ConstellationSdkConfig,
    private val engine: ConstellationSdkEngine
) : ConstellationSdk {
    private val componentManager = config.componentManager

    private val _state = MutableStateFlow<State>(State.Initial)
    override val state = _state.asStateFlow()

    init {
        engine.configure(config, ::onEngineEvent)
    }

    override fun createCase(caseClassName: String, startingFields: Map<String, Any>) {
        engine.createCase(caseClassName, startingFields)
    }

    private fun onEngineEvent(event: EngineEvent) {
        _state.value = when (event) {
            is EngineEvent.Loading -> State.Loading
            is EngineEvent.Ready -> State.Ready(componentManager.rootContainerComponent as RootContainerComponent)
            is EngineEvent.Finished -> State.Finished(event.successMessage)
            is EngineEvent.Cancelled -> State.Cancelled
            is EngineEvent.Error -> event.error.toSdkError()
        }
    }

    private fun EngineError.toSdkError() =
        when (this) {
            is EngineError.JsError ->
                State.Error(ConstellationSdk.SdkError.JsError(type, message))

            is EngineError.InternalError ->
                State.Error(ConstellationSdk.SdkError.InternalError(message))
        }
}
