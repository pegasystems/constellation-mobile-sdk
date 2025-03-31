package com.pega.mobile.constellation.sdk

import android.content.Context
import androidx.annotation.MainThread
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.internal.ConstellationSdkImpl
import kotlinx.coroutines.flow.StateFlow

interface ConstellationSdk {
    val state: StateFlow<State>

    fun createCase(caseClassName: String, startingFields: Map<String, Any> = emptyMap())

    companion object {
        @MainThread
        fun create(context: Context, config: ConstellationSdkConfig): ConstellationSdk =
            ConstellationSdkImpl(context, config)
    }

    sealed class State {
        data object Loading : State()
        data class Ready(val root: RootContainerComponent) : State()
        data class Error(val error: String?) : State()
        data class Finished(val successMessage: String?) : State()
        data object Cancelled : State()
    }
}
