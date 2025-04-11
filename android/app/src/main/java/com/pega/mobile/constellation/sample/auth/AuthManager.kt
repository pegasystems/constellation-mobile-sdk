/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.auth

import android.content.Context
import android.content.Intent
import android.net.Uri
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts.StartActivityForResult
import androidx.lifecycle.lifecycleScope
import com.pega.mobile.constellation.sample.PegaConfig.Auth.CLIENT_ID
import com.pega.mobile.constellation.sample.PegaConfig.Auth.REDIRECT_URI
import com.pega.mobile.constellation.sample.PegaConfig.URL
import com.pega.mobile.constellation.sample.auth.AuthState.AuthError
import com.pega.mobile.constellation.sample.auth.AuthState.Authenticated
import com.pega.mobile.constellation.sample.auth.AuthState.Authenticating
import com.pega.mobile.constellation.sample.auth.AuthState.TokenExpired
import com.pega.mobile.constellation.sample.auth.AuthState.Unauthenticated
import kotlinx.coroutines.CancellableContinuation
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.asCoroutineDispatcher
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationException.AuthorizationRequestErrors.OTHER
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationService
import net.openid.appauth.AuthorizationServiceConfiguration
import net.openid.appauth.ResponseTypeValues
import java.util.concurrent.Executors
import kotlin.coroutines.resume
import net.openid.appauth.AuthState as OpenIdState

class AuthManager(private val context: Context) {
    private val dispatcher = Executors.newSingleThreadExecutor().asCoroutineDispatcher()
    private val store = AuthStore(context)
    private var service: AuthorizationService? = null
    private var launcher: ActivityResultLauncher<Intent>? = null
    private var continuation: CancellableContinuation<Result<String>>? = null
    private var authJob: Job? = null

    private val openIdState: OpenIdState get() = store.read()

    private val _authState = MutableStateFlow(initialState())
    val authState = _authState.asStateFlow()

    val accessToken: String?
        get() = openIdState.accessToken

    /**
     * Registers activity result launcher for authentication purposes.
     */
    fun register(activity: ComponentActivity) {
        launcher = activity.registerForActivityResult(StartActivityForResult()) { proceed(it.data) }
        initializeAuthService(activity)
    }

    /**
     * Authenticates the user using OAuth 2.0.
     */
    fun authenticate(scope: CoroutineScope, onSuccess: () -> Unit, onFailure: (String) -> Unit) {
        if (authState.value != Authenticated) {
            authJob?.cancel()
            authJob = scope.launch {
                _authState.value = Authenticating
                delay(500)
                authenticate()
                    .onSuccess { onSuccess() }
                    .onFailure { onFailure(it.errorMessage) }
            }
        } else {
            onSuccess()
        }
    }

    private suspend fun authenticate(): Result<String> {
        _authState.value = Authenticating
        delay(1000)
        return authorize()
            .onSuccess { _authState.value = Authenticated }
            .onFailure { _authState.value = AuthError(it.errorMessage) }
    }

    private suspend fun authorize(): Result<String> {
        val launcher = requireNotNull(launcher) { "Launcher not initialized" }
        val service = requireNotNull(service) { "AuthorizationService not initialized" }
        val config = AuthorizationServiceConfiguration(
            Uri.parse(AUTHORIZATION_ENDPOINT),
            Uri.parse(TOKEN_ENDPOINT)
        )
        val request = AuthorizationRequest
            .Builder(config, CLIENT_ID, ResponseTypeValues.CODE, Uri.parse(REDIRECT_URI))
            .build()

        val authIntent = service.getAuthorizationRequestIntent(request)
        return suspendCancellableCoroutine { cont ->
            continuation = cont
            cont.invokeOnCancellation { continuation = null }
            launcher.launch(authIntent)
        }
    }

    fun onTokenExpired() {
        OpenIdState().store()
        _authState.value = TokenExpired
    }

    fun dispose() {
        service?.dispose()
    }

    internal fun authenticateForTesting() {
        _authState.value = Authenticated
    }

    private fun initialState() = if (openIdState.isAuthorized) Authenticated else Unauthenticated

    private fun initializeAuthService(activity: ComponentActivity) {
        activity.lifecycleScope.launch {
            withContext(dispatcher) {
                service = AuthorizationService(context)
            }
        }
    }

    private fun proceed(data: Intent?) {
        if (data != null) {
            val response = AuthorizationResponse.fromIntent(data)
            val exception = AuthorizationException.fromIntent(data)
            openIdState.apply { update(response, exception) }.store()

            if (response != null) {
                exchangeAuthorizationCode(response)
            } else {
                resume(Result.failure(exception!!))
            }
        } else {
            resume(Result.failure(OTHER))
        }
    }

    private fun exchangeAuthorizationCode(response: AuthorizationResponse) {
        val service = requireNotNull(service) { "AuthorizationService not initialized" }
        val tokenRequest = response.createTokenExchangeRequest()
        service.performTokenRequest(tokenRequest) { tokenResponse, exception ->
            openIdState.apply { update(tokenResponse, exception) }.store()

            if (tokenResponse != null) {
                resume(Result.success("Auth code exchanged"))
            } else {
                resume(Result.failure(exception!!))
            }
        }
    }

    private fun OpenIdState.store() {
        store.write(this)
    }

    private fun resume(result: Result<String>) {
        with(result) {
            onSuccess { Log.i(TAG, "Authenticated successfully") }
            onFailure { Log.e(TAG, "Authentication error", it) }
        }
        continuation?.resume(result)
    }

    private val Throwable.errorMessage
        get() = message ?: "Unknown error"

    companion object {
        private const val TAG = "AuthManager"

        const val AUTHORIZATION_ENDPOINT = "$URL/PRRestService/oauth2/v1/authorize"
        const val TOKEN_ENDPOINT = "$URL/PRRestService/oauth2/v1/token"
    }
}

