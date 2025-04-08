/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.auth

import android.content.Context
import net.openid.appauth.AuthState
import okhttp3.Interceptor
import okhttp3.Response

class AuthorizationInterceptor(private val context: Context) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        val authStore = AuthStore(context)
        val token = authStore.read().accessToken
        request = request.newBuilder().apply { header("Authorization", "Bearer $token") }.build()
        val response = chain.proceed(request)
        if (response.code == 401) {
            authStore.write(AuthState())
//            logout() TODO
        }
        return response
    }
}
