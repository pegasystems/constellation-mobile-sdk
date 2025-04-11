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
import com.pega.mobile.constellation.sample.CustomComponents.CustomDefinitions
import com.pega.mobile.constellation.sample.MediaCoApplication.Companion.authManager
import com.pega.mobile.constellation.sample.PegaConfig
import com.pega.mobile.constellation.sample.auth.AuthInterceptor
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import kotlinx.coroutines.flow.StateFlow
import okhttp3.Interceptor
import okhttp3.Response
import com.pega.mobile.constellation.sdk.ConstellationSdk.State as SdkState

class PegaViewModel(context: Application) : ViewModel() {
    private val authManager = context.authManager
    private val config = buildConfig()
    private val sdk = ConstellationSdk.create(context, config)

    var dismissed by mutableStateOf(false)
    val sdkState: StateFlow<SdkState> = sdk.state

    fun createCase(caseClassName: String, onFailure: (String) -> Unit) {
        dismissed = false
        authenticate(
            onSuccess = { sdk.createCase(caseClassName) },
            onFailure = { onFailure(it) }
        )
    }

    private fun authenticate(onSuccess: () -> Unit, onFailure: (String) -> Unit) =
        authManager.authenticate(viewModelScope, onSuccess, onFailure)

    private fun buildConfig() = ConstellationSdkConfig(
        pegaUrl = PegaConfig.URL,
        pegaVersion = PegaConfig.VERSION,
        okHttpClient = buildOkHttpClient(),
        componentManager = buildComponentManager(),
        debuggable = true
    )

    private fun buildOkHttpClient() =
        ConstellationSdkConfig.defaultHttpClient().newBuilder()
            .addInterceptor(AuthInterceptor(authManager))
            .addNetworkInterceptor(LoggingInterceptor())
            .build()

    private fun buildComponentManager() = ComponentManager.create(CustomDefinitions)


    companion object {
        val Factory = viewModelFactory {
            initializer {
                val application = checkNotNull(this[APPLICATION_KEY])
                PegaViewModel(application)
            }
        }

        private class LoggingInterceptor : Interceptor {
            override fun intercept(chain: Interceptor.Chain): Response {
                val request = chain.request().also {
                    Log.d("MediaCo", "request: [${it.method}] ${it.url}")
                }
                return chain.proceed(request).also {
                    Log.d("MediaCo", "response: [${it.code}] ${it.request.url}")
                }
            }
        }
    }
}
