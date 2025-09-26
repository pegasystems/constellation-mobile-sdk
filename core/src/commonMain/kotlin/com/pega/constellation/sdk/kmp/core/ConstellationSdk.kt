package com.pega.constellation.sdk.kmp.core

import androidx.annotation.MainThread
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.Companion.create
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.internal.ConstellationSdkImpl
import kotlinx.coroutines.flow.StateFlow

/**
 * Entry point of Pega Constellation Mobile SDK.
 * It allows to embed Pega form into existing application with the possibility of using customized UI.
 * SDK allows to add new components for not supported or custom components.
 *
 * Use [create] method from companion object to create an instance.
 */
interface ConstellationSdk {
    val state: StateFlow<State>

    /**
     * Creates a Pega case.
     *
     * @param caseClassName case type class to be created
     * @param startingFields additional data which can be passed into newly created case
     */
    fun createCase(caseClassName: String, startingFields: Map<String, Any> = emptyMap())

    companion object {
        /**
         * Allows to create [ConstellationSdk] object.
         *
         * @param context Android application context
         * @param config Constellation SDK configuration
         */
        @MainThread
        fun create(
            config: ConstellationSdkConfig,
            engine: ConstellationSdkEngine
        ): ConstellationSdk = ConstellationSdkImpl(config, engine)
    }

    /**
     * Represents all possible states of [ConstellationSdk]:
     * - Initial - initial state
     * - Loading - form is loading
     * - Ready - form ready to be displayed. Use ComponentRenderer and *Component.Render()* extension for built-in rendering.
     * - Error - form could not be loaded, e.g. due to configuration or network issues
     * - Finished - form processing finished
     * - Cancelled - form processing cancelled
     */
    sealed class State {
        data object Initial : State()
        data object Loading : State()
        data class Ready(val root: RootContainerComponent) : State()
        data class Error(val error: String?) : State()
        data class Finished(val successMessage: String?) : State()
        data object Cancelled : State()
    }
}
