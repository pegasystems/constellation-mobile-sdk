package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.screens.pega

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.Injector
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKConfig
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.components.CustomComponents.CustomDefinitions
import kotlinx.coroutines.flow.StateFlow
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State as SdkState

class PegaViewModel(
    private val authManager: AuthManager,
    private val sdk: ConstellationSdk,
    private val caseClassName: String,
) : ViewModel() {

    var dismissed by mutableStateOf(false)
    val sdkState: StateFlow<SdkState> = sdk.state

    fun createCase(onFailure: (String) -> Unit) {
        dismissed = false
        authManager.authenticate(
            onSuccess = { sdk.createCase(caseClassName) },
            onFailure = onFailure
        )
    }

    companion object {
        val Factory = viewModelFactory {
            initializer {
                PegaViewModel(
                    authManager = Injector.authManager,
                    sdk = ConstellationSdk.create(buildConfig(), Injector.engine),
                    caseClassName = SDKConfig.PEGA_CASE_CLASS_NAME
                )
            }
        }

        private fun buildConfig() = ConstellationSdkConfig(
            pegaUrl = SDKConfig.PEGA_URL,
            pegaVersion = SDKConfig.PEGA_VERSION,
            componentManager = ComponentManager.create(CustomDefinitions),
            debuggable = true
        )

    }
}
