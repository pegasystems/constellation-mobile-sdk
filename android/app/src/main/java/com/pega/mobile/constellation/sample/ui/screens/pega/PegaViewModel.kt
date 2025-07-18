package com.pega.mobile.constellation.sample.ui.screens.pega

import android.app.Application
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.mobile.constellation.sample.ui.components.CustomComponents.CustomDefinitions
import com.pega.mobile.constellation.sample.MediaCoApplication.Companion.authManager
import com.pega.mobile.constellation.sample.SDKConfig
import com.pega.mobile.constellation.sample.auth.AuthInterceptor
import com.pega.mobile.constellation.sample.auth.AuthManager
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.HttpConfig
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import kotlinx.coroutines.flow.StateFlow
import okhttp3.Interceptor
import okhttp3.Response
import com.pega.mobile.constellation.sdk.ConstellationSdk.State as SdkState

class PegaViewModel(
    context: Application,
    private val sdk: ConstellationSdk,
    private val caseClassName: String,
) : ViewModel() {
    private val authManager = context.authManager

    var dismissed by mutableStateOf(false)
    val sdkState: StateFlow<SdkState> = sdk.state

    fun createCase(onFailure: (String) -> Unit) {
        dismissed = false
        authManager.authenticate(
            scope = viewModelScope,
            onSuccess = { sdk.createCase(caseClassName) },
            onFailure = onFailure
        )
    }

    companion object {
        val Factory = viewModelFactory {
            initializer {
                val application = checkNotNull(this[APPLICATION_KEY])
                val authManager = application.authManager
                val sdk = ConstellationSdk.create(application, buildConfig(authManager))
                PegaViewModel(application, sdk, SDKConfig.PEGA_CASE_CLASS_NAME)
            }
        }

        private fun buildConfig(authManager: AuthManager) = ConstellationSdkConfig(
            pegaUrl = SDKConfig.PEGA_URL,
            pegaVersion = SDKConfig.PEGA_VERSION,
            httpConfig = HttpConfig(pegaOkHttpClient = buildOkHttpClient(authManager)),
            componentManager = buildComponentManager(),
            debuggable = true
        )

        private fun buildOkHttpClient(authManager: AuthManager) =
            ConstellationSdkConfig.defaultHttpClient().newBuilder()
                .addInterceptor(AuthInterceptor(authManager))
                .addNetworkInterceptor(LoggingInterceptor())
                .build()

        private fun buildComponentManager() = ComponentManager.create(CustomDefinitions)

        private class LoggingInterceptor : Interceptor {
            override fun intercept(chain: Interceptor.Chain): Response {
                val request = chain.request().also {
                    Log.d("MediaCo HTTP Interceptor", "request: [${it.method}] ${it.url}")
                }
                return chain.proceed(request).also {
                    Log.d("MediaCo HTTP Interceptor", "response: [${it.code}] ${it.request.url}")
                }
            }
        }
    }
}
