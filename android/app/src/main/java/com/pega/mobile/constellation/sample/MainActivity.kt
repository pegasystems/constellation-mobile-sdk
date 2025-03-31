/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample

import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.pega.mobile.constellation.sample.CustomComponents.CustomDefinitions
import com.pega.mobile.constellation.sample.http.AuthorizationInterceptor
import com.pega.mobile.constellation.sample.ui.screens.MainScreen
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme
import com.pega.mobile.constellation.sdk.ConstellationSdk
import com.pega.mobile.constellation.sdk.ConstellationSdkConfig
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import okhttp3.OkHttpClient

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val config = buildConfig()
        val sdk = ConstellationSdk.create(this, config)

        setContent {
            SampleSdkTheme {
                Scaffold(Modifier.fillMaxSize()) { innerPadding ->
                    Box(Modifier.padding(innerPadding)) {
                        MainScreen(sdk, PegaConfig.CASE_CLASS_NAME)
                    }
                }
            }
        }
    }

    private fun buildConfig() = ConstellationSdkConfig(
        pegaUrl = PegaConfig.URL,
        pegaVersion = PegaConfig.VERSION,
        okHttpClient = buildOkHttpClient(),
        componentManager = buildComponentManager(),
        debuggable = true
    )

    private fun buildOkHttpClient() = OkHttpClient.Builder()
        .addInterceptor(AuthorizationInterceptor(this))
        .addNetworkInterceptor { chain ->
            val request = chain.request().also {
                Log.d("OkHttpClient", "request: [${it.method}] ${it.url}")
            }
            chain.proceed(request).also {
                Log.d("OkHttpClient", "response: [${it.code}] ${it.request.url}")
            }
        }.build()

    private fun buildComponentManager() = ComponentManager.create(CustomDefinitions)
}
