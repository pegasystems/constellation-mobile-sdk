package com.pega.mobile.constellation.sdk.internal

import android.content.Context
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdk.State
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.internal.webview.SdkWebViewEngine
import com.pega.mobile.constellation.sdk.internal.webview.SdkWebViewEngine.EngineEvent
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import okhttp3.OkHttpClient

internal class ConstellationSdkImpl(
    context: Context,
    config: ConstellationSdkConfig,
    nonDxOkHttpClient: OkHttpClient
) : ConstellationSdk {
    private val engine = SdkWebViewEngine(context, config, ::onEngineEvent, nonDxOkHttpClient)
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
