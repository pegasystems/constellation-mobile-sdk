package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import kotlinx.coroutines.flow.Flow
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.tokenstore.TokenStore

@OptIn(ExperimentalOpenIdConnect::class)
class TokenStoreMock : TokenStore() {
    override val accessTokenFlow: Flow<String?>
        get() = TODO("Not yet implemented")
    override val refreshTokenFlow: Flow<String?>
        get() = TODO("Not yet implemented")
    override val idTokenFlow: Flow<String?>
        get() = TODO("Not yet implemented")

    override suspend fun getAccessToken(): String? {
        return "TOKEN"
    }

    override suspend fun getRefreshToken(): String? {
        TODO("Not yet implemented")
    }

    override suspend fun getIdToken(): String? {
        TODO("Not yet implemented")
    }

    override suspend fun removeAccessToken() {
        TODO("Not yet implemented")
    }

    override suspend fun removeRefreshToken() {
        TODO("Not yet implemented")
    }

    override suspend fun removeIdToken() {
        TODO("Not yet implemented")
    }

    override suspend fun saveTokens(
        accessToken: String,
        refreshToken: String?,
        idToken: String?
    ) {
        TODO("Not yet implemented")
    }

}