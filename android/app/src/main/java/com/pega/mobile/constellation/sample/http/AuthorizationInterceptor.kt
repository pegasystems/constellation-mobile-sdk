package com.pega.mobile.constellation.sample.http

import android.app.Activity
import android.content.Intent
import com.pega.mobile.constellation.sample.LoginActivity
import com.pega.mobile.constellation.sample.auth.AuthStore
import net.openid.appauth.AuthState
import okhttp3.Interceptor
import okhttp3.Response

class AuthorizationInterceptor(private val activity: Activity) : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        var request = chain.request()
        val authStore = AuthStore(activity)
        val token = authStore.read().accessToken
        request = request.newBuilder().apply { header("Authorization", "Bearer $token") }.build()
        val response = chain.proceed(request)
        if (response.code == 401) {
            authStore.write(AuthState())
            logout()
        }
        return response
    }

    private fun logout() {
        activity.startActivity(Intent(activity, LoginActivity::class.java))
        activity.finish()
    }
}
