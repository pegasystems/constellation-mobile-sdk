package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Request
import okhttp3.Response

class AuthInterceptor(private val authManager: AuthManager) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val response = chain.proceed(chain.request().withAuthHeader())
        if (response.code == 401) {
            authManager.onTokenExpired()
        }
        return response
    }

    private fun Request.withAuthHeader() = newBuilder().apply {
        val token = runBlocking { authManager.getAccessToken() }
        header("Authorization", "Bearer $token")
    }.build()

}

