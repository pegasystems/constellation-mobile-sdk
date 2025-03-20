package com.pega.mobile.constellation.sdk

import android.content.Context
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.internal.ConstellationSdkImpl
import kotlinx.coroutines.flow.StateFlow

interface ConstellationSdk {
    val state: StateFlow<SdkState>

    fun createCase(caseClassName: String, startingFields: Map<String, Any> = emptyMap())

    companion object {
        fun create(context: Context, config: ConstellationSdkConfig): ConstellationSdk =
            ConstellationSdkImpl(context, config)
    }

    sealed class SdkState {
        data object Loading : SdkState()
        data class Ready(val root: RootContainerComponent) : SdkState()
        data class Error(val error: String?) : SdkState()
        data class Finished(val successMessage: String?) : SdkState()
        data object Cancelled : SdkState()
    }
}
