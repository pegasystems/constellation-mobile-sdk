package com.pega.constellation.sdk.kmp.samples.basecmpapp.auth

import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.AuthError
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticating
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

object AuthManager {
    private var authJob: Job? = null
    private val _authState = MutableStateFlow(initialState())
    val authState = _authState.asStateFlow()

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

    // TODO implement real authentication
    private fun authorize() = Result.failure<String>(Throwable("Authentication not implemented"))

    private fun initialState(): AuthState = AuthState.Unauthenticated

    private val Throwable.errorMessage
        get() = message ?: "Unknown error"
}

