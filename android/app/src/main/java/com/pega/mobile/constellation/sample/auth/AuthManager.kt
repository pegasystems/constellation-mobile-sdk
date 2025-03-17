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
import com.pega.mobile.constellation.sample.AppConfig.Pega.Auth.CLIENT_ID
import com.pega.mobile.constellation.sample.AppConfig.Pega.Auth.REDIRECT_URI
import com.pega.mobile.constellation.sample.AppConfig.Pega.URL
import com.pega.mobile.constellation.sample.auth.AuthManager.AuthResult.Failed
import com.pega.mobile.constellation.sample.auth.AuthManager.AuthResult.Success
import kotlinx.coroutines.CancellableContinuation
import kotlinx.coroutines.asCoroutineDispatcher
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withContext
import net.openid.appauth.AuthState
import net.openid.appauth.AuthorizationException
import net.openid.appauth.AuthorizationException.AuthorizationRequestErrors.OTHER
import net.openid.appauth.AuthorizationRequest
import net.openid.appauth.AuthorizationResponse
import net.openid.appauth.AuthorizationService
import net.openid.appauth.AuthorizationServiceConfiguration
import net.openid.appauth.ResponseTypeValues
import java.util.concurrent.Executors
import kotlin.coroutines.resume

class AuthManager(private val context: Context) {
    private val dispatcher = Executors.newSingleThreadExecutor().asCoroutineDispatcher()
    private val store = AuthStore(context)
    private var service: AuthorizationService? = null
    private var launcher: ActivityResultLauncher<Intent>? = null
    private var continuation: CancellableContinuation<AuthResult>? = null

    private val authState: AuthState
        get() = store.read()

    val isAuthorized: Boolean
        get() = authState.isAuthorized

    fun register(activity: ComponentActivity) {
        launcher = activity.registerForActivityResult(StartActivityForResult()) { proceed(it.data) }
        initializeAuthService(activity)
    }

    suspend fun authorize(): AuthResult {
        val launcher = requireNotNull(launcher) { "Launcher not initialized" }
        val service = requireNotNull(service) { "AuthorizationService not initialized" }
        val config = AuthorizationServiceConfiguration(Uri.parse(AUTHORIZATION_ENDPOINT), Uri.parse(
            TOKEN_ENDPOINT
        ))
        val request = AuthorizationRequest.Builder(config, CLIENT_ID, ResponseTypeValues.CODE, Uri.parse(REDIRECT_URI))
            .build()

        val authIntent = service.getAuthorizationRequestIntent(request)
        return suspendCancellableCoroutine { cont ->
            continuation = cont
            cont.invokeOnCancellation { continuation = null }
            launcher.launch(authIntent)
        }
    }

    fun dispose() {
        service?.dispose()
    }

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
            authState.updateAndStore { update(response, exception) }

            if (response != null) {
                exchangeAuthorizationCode(response)
            } else {
                resume(Failed(requireNotNull(exception)))
            }
        } else {
            resume(Failed(OTHER))
        }
    }

    private fun exchangeAuthorizationCode(response: AuthorizationResponse) {
        val service = requireNotNull(service) { "AuthorizationService not initialized" }
        val tokenRequest = response.createTokenExchangeRequest()
        service.performTokenRequest(tokenRequest) { tokenResponse, exception ->
            authState.updateAndStore { update(tokenResponse, exception) }

            if (tokenResponse != null) {
                resume(Success)
            } else {
                resume(Failed(requireNotNull(exception)))
            }
        }
    }

    private fun AuthState.updateAndStore(update: AuthState.() -> Unit) {
        update()
        store.write(this)
    }

    private fun resume(result: AuthResult) {
        when (result) {
            is Success -> Log.i(TAG, "Authenticated successfully")
            is Failed -> Log.e(TAG, "Authentication error", result.exception)
        }
        continuation?.resume(result)
    }

    sealed class AuthResult {
        data object Success : AuthResult()
        class Failed(val exception: AuthorizationException) : AuthResult()
    }

    companion object {
        private const val TAG = "AuthManager"

        const val AUTHORIZATION_ENDPOINT = "$URL/PRRestService/oauth2/v1/authorize"
        const val TOKEN_ENDPOINT = "$URL/PRRestService/oauth2/v1/token"
    }
}
