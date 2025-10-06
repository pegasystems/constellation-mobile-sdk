package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import kotlinx.coroutines.flow.Flow
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.tokenstore.TokenStore

@OptIn(ExperimentalOpenIdConnect::class)
class TokenStoreMock : TokenStore() {
    override val accessTokenFlow: Flow<String?>
        get() = TODO("Not implemented in mock")
    override val refreshTokenFlow: Flow<String?>
        get() = TODO("Not implemented in mock")
    override val idTokenFlow: Flow<String?>
        get() = TODO("Not implemented in mock")

    override suspend fun getAccessToken(): String? {
        return "TOKEN"
    }

    override suspend fun getRefreshToken(): String? {
        TODO("Not implemented in mock")
    }

    override suspend fun getIdToken(): String? {
        TODO("Not implemented in mock")
    }

    override suspend fun removeAccessToken() {
        TODO("Not implemented in mock")
    }

    override suspend fun removeRefreshToken() {
        TODO("Not implemented in mock")
    }

    override suspend fun removeIdToken() {
        TODO("Not implemented in mock")
    }

    override suspend fun saveTokens(
        accessToken: String,
        refreshToken: String?,
        idToken: String?
    ) {
        TODO("Not implemented in mock")
    }
}