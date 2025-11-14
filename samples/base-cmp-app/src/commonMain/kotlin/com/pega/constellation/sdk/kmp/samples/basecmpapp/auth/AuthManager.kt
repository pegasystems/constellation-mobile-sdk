package com.pega.constellation.sdk.kmp.samples.basecmpapp.auth

import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.samples.basecmpapp.SDKConfig
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.AuthError
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticated
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Authenticating
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.TokenExpired
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthState.Unauthenticated
import io.ktor.client.HttpClient
import io.ktor.client.plugins.auth.Auth
import io.ktor.client.plugins.auth.providers.BearerTokens
import io.ktor.client.plugins.auth.providers.bearer
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.OpenIdConnectClient
import org.publicvalue.multiplatform.oidc.appsupport.CodeAuthFlowFactory
import org.publicvalue.multiplatform.oidc.tokenstore.TokenStore
import org.publicvalue.multiplatform.oidc.tokenstore.removeTokens
import org.publicvalue.multiplatform.oidc.tokenstore.saveTokens
import org.publicvalue.multiplatform.oidc.types.CodeChallengeMethod

@OptIn(ExperimentalOpenIdConnect::class)
class AuthManager(
    private val scope: CoroutineScope,
    private val authFlowFactory: CodeAuthFlowFactory,
    private val tokenStore: TokenStore,
    private val config: AuthConfig = AuthConfig()
) {
    data class AuthConfig(
        val pegaUrl: String = SDKConfig.PEGA_URL,
        val clientId: String = SDKConfig.AUTH_CLIENT_ID,
        val redirectUri: String = SDKConfig.AUTH_REDIRECT_URI
    )

    private var authJob: Job? = null
    private val _authState = MutableStateFlow<AuthState>(Unauthenticated)
    val authState = _authState.asStateFlow()

    val httpClient = createHttpClient()

    init {
        runBlocking {
            if (tokenStore.getAccessToken() != null) {
                _authState.value = Authenticated
            }
        }
    }

    suspend fun getAccessToken() = tokenStore.getAccessToken()

    /**
     * Authenticates the user using OAuth 2.0.
     */
    fun authenticate() {
        if (authState.value !is Authenticated) {
            authJob?.cancel()
            authJob = scope.launch {
                _authState.value = Authenticating
                delay(1000)
                runAuthFlow()
                    .onSuccess { _authState.value = Authenticated }
                    .onFailure {
                        Log.e("AuthManager", "Authentication failed", it)
                        val msg = it.message ?: "Unknown error"
                        _authState.value = AuthError(msg)
                    }
            }
        }
    }

    private suspend fun runAuthFlow() = runCatching {
        val flow = authFlowFactory.createAuthFlow(client = createOidcClient())
        val tokens = flow.getAccessToken()
        tokenStore.saveTokens(tokens)
    }

    private fun createOidcClient() =
        OpenIdConnectClient {
            endpoints {
                tokenEndpoint = "${config.pegaUrl}/PRRestService/oauth2/v1/token"
                authorizationEndpoint = "${config.pegaUrl}/PRRestService/oauth2/v1/authorize"
            }

            clientId = config.clientId
            codeChallengeMethod = CodeChallengeMethod.S256
            redirectUri = config.redirectUri
            disableNonce = true
        }

    fun onTokenExpired() {
        scope.launch {
            tokenStore.removeTokens()
            _authState.value = TokenExpired
        }
    }

    private fun createHttpClient() = HttpClient {
        install(Auth) {
            bearer {
                loadTokens {
                    val token = getAccessToken()
                    if (token != null) {
                        BearerTokens(token, refreshToken = null)
                    } else {
                        Log.e("HttpClient", "Access token is not available")
                        null
                    }
                }
                refreshTokens {
                    Log.i("HttpClient", "Token has expired")
                    onTokenExpired()
                    null
                }
            }
        }
    }
}
