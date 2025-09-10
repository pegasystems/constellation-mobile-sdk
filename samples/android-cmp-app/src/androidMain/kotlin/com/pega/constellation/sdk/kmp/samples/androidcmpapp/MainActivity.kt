package com.pega.constellation.sdk.kmp.samples.androidcmpapp

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.engine.androidwebview.buildAndroidConstellationSdkEngine
import com.pega.constellation.sdk.kmp.engine.androidwebview.defaultHttpClient
import okhttp3.OkHttpClient

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        val okHttpClient = defaultHttpClient().newBuilder()
            .addInterceptor { chain ->
                chain.request().newBuilder()
                    .addHeader("Authorization", AUTH_HEADER)
                    .build()
                    .let { chain.proceed(it) }
            }
            .build()
        setContent {
            App(ConstellationSdkEngineBuilderImpl(this, okHttpClient))
        }
    }
}

class ConstellationSdkEngineBuilderImpl(private val context: Context, private val okHttpClient: OkHttpClient) :
    ConstellationSdkEngineBuilder {
    override fun build(
        config: ConstellationSdkConfig,
        handler: EngineEventHandler
    ): ConstellationSdkEngine {
        return buildAndroidConstellationSdkEngine(context, config, handler, okHttpClient)
    }
}
