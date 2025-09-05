package com.pega.mobile.constellation.sample.auth

sealed class AuthState {
    data object Unauthenticated : AuthState()
    data object Authenticating : AuthState()
    data object Authenticated : AuthState()
    data object TokenExpired : AuthState()
    data class AuthError(val message: String) : AuthState()
}