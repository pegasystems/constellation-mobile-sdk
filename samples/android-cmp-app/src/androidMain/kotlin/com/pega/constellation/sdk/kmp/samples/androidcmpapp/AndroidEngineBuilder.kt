package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import android.content.Context
import android.util.Log
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilderBase
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.buildAndroidConstellationSdkEngine
import com.pega.constellation.sdk.kmp.engine.androidwebview.defaultHttpClient
import com.pega.constellation.sdk.kmp.samples.basecmpapp.auth.AuthManager
import okhttp3.Interceptor
import okhttp3.Response

class AndroidEngineBuilder(
    val context: Context,
    val authManager: AuthManager
) : ConstellationSdkEngineBuilderBase() {

    override fun build(config: ConstellationSdkConfig, handler: EngineEventHandler) =
        buildAndroidConstellationSdkEngine(
            context = context,
            config = config,
            handler = handler,
            okHttpClient = buildHttpClient(authManager)
        ).also { notifyBuilt(it)}

    private fun buildHttpClient(authManager: AuthManager) =
        defaultHttpClient().newBuilder()
            .addInterceptor(AuthInterceptor(authManager))
            .addNetworkInterceptor(LoggingInterceptor())
            .build()

    private inner class LoggingInterceptor : Interceptor {
        override fun intercept(chain: Interceptor.Chain): Response {
            val request = chain.request().also {
                Log.d("MediaCo", "request: [${it.method}] ${it.url}")
            }
            return chain.proceed(request).also {
                Log.d("MediaCo", "response: [${it.code}] ${it.request.url}")
            }
        }
    }
}