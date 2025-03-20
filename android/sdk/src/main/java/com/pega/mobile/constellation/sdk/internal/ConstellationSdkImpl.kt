package com.pega.mobile.constellation.sdk.internal

import android.content.Context
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdk.SdkState
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.internal.webview.SdkWebViewEngine
import com.pega.mobile.constellation.sdk.internal.webview.SdkWebViewEngine.EngineEvent
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

internal class ConstellationSdkImpl(
    context: Context,
    config: ConstellationSdkConfig
) : ConstellationSdk {
    private val engine = SdkWebViewEngine(context, config, ::onEngineEvent)
    private val componentManager = config.componentManager

    private val _state = MutableStateFlow<SdkState>(SdkState.Loading)
    override val state = _state.asStateFlow()

    override fun createCase(caseClassName: String, startingFields: Map<String, Any>) {
        engine.load(caseClassName, startingFields)
    }

    private fun onEngineEvent(event: EngineEvent) {
        _state.value = when (event) {
            is EngineEvent.Loading -> SdkState.Loading
            is EngineEvent.Ready -> SdkState.Ready(findRootComponent())
            is EngineEvent.Finished -> SdkState.Finished(event.successMessage)
            is EngineEvent.Cancelled -> SdkState.Cancelled
            is EngineEvent.Error -> SdkState.Error(event.error)
        }
    }

    private fun findRootComponent() =
        componentManager.getComponent(ComponentId(1)) as RootContainerComponent
}
