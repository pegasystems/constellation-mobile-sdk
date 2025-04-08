package com.pega.mobile.constellation.sample.ui.screens.pega

import android.app.Application
import android.content.Context
import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider.AndroidViewModelFactory.Companion.APPLICATION_KEY
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.pega.mobile.constellation.sample.CustomComponents.CustomDefinitions
import com.pega.mobile.constellation.sample.MediaCoApplication.Companion.authManager
import com.pega.mobile.constellation.sample.PegaConfig
import com.pega.mobile.constellation.sample.auth.AuthManager
import com.pega.mobile.constellation.sample.auth.AuthManager.AuthResult.Failed
import com.pega.mobile.constellation.sample.auth.AuthManager.AuthResult.Success
import com.pega.mobile.constellation.sample.auth.AuthorizationInterceptor
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.AuthError
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.Authenticated
import com.pega.mobile.constellation.sample.ui.screens.pega.PegaViewModel.AuthState.Unauthenticated
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import okhttp3.Interceptor
import okhttp3.Response

class PegaViewModel(private val context: Application) : ViewModel() {
    private val config = buildConfig(context)
    private val sdk = ConstellationSdk.create(context, config)

    private val _authState = MutableStateFlow(context.authManager.state())
    val authState: StateFlow<AuthState> = _authState.asStateFlow()
    val sdkState: StateFlow<ConstellationSdk.State> = sdk.state

    fun createCase() {
        sdk.createCase(PegaConfig.CASE_CLASS_NAME)
    }

    fun authenticate() = viewModelScope.launch {
        _authState.value = AuthState.Authenticating
        delay(2000)
        _authState.value = when (val result = context.authManager.authorize()) {
            is Success -> Authenticated
            is Failed -> AuthError(result.exception.errorDescription)
        }
    }

    fun reset() {
        _authState.value = context.authManager.state()
    }

    private fun buildConfig(context: Context) = ConstellationSdkConfig(
        pegaUrl = PegaConfig.URL,
        pegaVersion = PegaConfig.VERSION,
        okHttpClient = buildOkHttpClient(context),
        componentManager = buildComponentManager(),
        debuggable = true
    )

    private fun buildOkHttpClient(context: Context) =
        ConstellationSdkConfig.defaultHttpClient().newBuilder()
            .addInterceptor(AuthorizationInterceptor(context))
            .addNetworkInterceptor(LoggingInterceptor())
            .build()

    private fun buildComponentManager() = ComponentManager.create(CustomDefinitions)

    private fun AuthManager.state() = if (isAuthenticated) Authenticated else Unauthenticated

    sealed class AuthState {
        data object Authenticating : AuthState()
        data object Authenticated : AuthState()
        data object Unauthenticated : AuthState()
        data class AuthError(val message: String?) : AuthState()
    }

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