package com.pega.constellation.sdk.kmp.core.internal

import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

internal class ConstellationSdkImpl(
    config: ConstellationSdkConfig,
    engineBuilder: ConstellationSdkEngineBuilder
) : ConstellationSdk {
    private val engine = engineBuilder.build(config, ::onEngineEvent)
    private val componentManager = config.componentManager

    private val _state = MutableStateFlow<State>(State.Initial)
    override val state = _state.asStateFlow()

    override fun createCase(caseClassName: String, startingFields: Map<String, Any>) {
        engine.load(caseClassName, startingFields)
    }

    private fun onEngineEvent(event: EngineEvent) {
        _state.value = when (event) {
            is EngineEvent.Loading -> State.Loading
            is EngineEvent.Ready -> State.Ready(findRootComponent())
            is EngineEvent.Finished -> State.Finished(event.successMessage)
            is EngineEvent.Cancelled -> State.Cancelled
            is EngineEvent.Error -> State.Error(event.error)
        }
    }

    private fun findRootComponent() =
        componentManager.getComponent(ComponentId(1)) as RootContainerComponent
}
