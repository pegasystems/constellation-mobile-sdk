package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.fake

import kotlinx.coroutines.flow.flowOf
import org.publicvalue.multiplatform.oidc.ExperimentalOpenIdConnect
import org.publicvalue.multiplatform.oidc.tokenstore.TokenStore

@OptIn(ExperimentalOpenIdConnect::class)
class FakeTokenStore(val token: String) : TokenStore() {
    override val accessTokenFlow = flowOf(token)
    override val refreshTokenFlow = flowOf(null)
    override val idTokenFlow = flowOf(null)

    override suspend fun getAccessToken() = token
    override suspend fun getRefreshToken() = null
    override suspend fun getIdToken() = null
    override suspend fun removeAccessToken() {}
    override suspend fun removeRefreshToken() {}
    override suspend fun removeIdToken() {}
    override suspend fun saveTokens(accessToken: String, refreshToken: String?, idToken: String?) {}
}
