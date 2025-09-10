package com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.screens.pega

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.constellation.sdk.kmp.core.ConstellationSdk
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.components.core.ComponentManager
import com.pega.constellation.sdk.kmp.engine.androidwebview.buildAndroidConstellationSdkEngine
import com.pega.constellation.sdk.kmp.engine.androidwebview.defaultHttpClient
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.components.CustomComponents.CustomDefinitions
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.MediaCoApplication.Companion.authManager
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.SDKConfig
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.auth.AuthInterceptor
import com.pega.constellation.sdk.kmp.samples.androidcomposeapp.auth.AuthManager
import kotlinx.coroutines.flow.StateFlow
import okhttp3.Interceptor
import okhttp3.OkHttpClient
import okhttp3.Response
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State as SdkState

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
                val sdk = ConstellationSdk.create(
                    config = buildConfig(),
                    engine = ConstellationSdkEngineBuilderImpl(application, buildOkHttpClient(authManager))
                )
                PegaViewModel(application, sdk, SDKConfig.PEGA_CASE_CLASS_NAME)
            }
        }

        private fun buildConfig() = ConstellationSdkConfig(
            pegaUrl = SDKConfig.PEGA_URL,
            pegaVersion = SDKConfig.PEGA_VERSION,
            componentManager = buildComponentManager(),
            debuggable = true
        )

        private fun buildOkHttpClient(authManager: AuthManager) =
            defaultHttpClient().newBuilder()
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

        class ConstellationSdkEngineBuilderImpl(private val context: Context, private val okHttpClient: OkHttpClient) :
            ConstellationSdkEngineBuilder {
            override fun build(
                config: ConstellationSdkConfig,
                handler: EngineEventHandler
            ): ConstellationSdkEngine {
                return buildAndroidConstellationSdkEngine(context, config, handler, okHttpClient)
            }
        }
    }
}
