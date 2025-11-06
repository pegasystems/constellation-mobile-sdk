package com.pega.constellation.sdk.kmp.samples.basecmpapp.auth

sealed class AuthState {
    data object Unauthenticated : AuthState()
    data object Authenticating : AuthState()
    data class Authenticated(val accessToken: String) : AuthState()
    data object TokenExpired : AuthState()
    data class AuthError(val message: String) : AuthState()
}
