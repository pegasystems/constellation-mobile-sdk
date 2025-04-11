package com.pega.mobile.constellation.sample.auth

import okhttp3.Interceptor
import okhttp3.Response

class AuthInterceptor(private val authManager: AuthManager) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        val token = authManager.accessToken
        request = request.newBuilder().apply { header("Authorization", "Bearer $token") }.build()
        val response = chain.proceed(request)
        if (response.code == 401) {
            authManager.onTokenExpired()
        }
        return response
    }
}
