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
import com.pega.mobile.constellation.sample.components.CustomEmailComponent
import com.pega.mobile.constellation.sample.components.CustomSliderComponent
import com.pega.mobile.constellation.sample.http.AuthorizationInterceptor
import com.pega.mobile.constellation.sample.ui.screens.MainScreen
import com.pega.mobile.constellation.sample.ui.theme.SampleSdkTheme
import com.pega.mobile.constellation.sdk.ComponentDefinition
import com.pega.mobile.constellation.sdk.ConstellationMobileSDK
import com.pega.mobile.constellation.sdk.SDKConfig
import okhttp3.OkHttpClient

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        val config = buildConfig()
        val httpClient = buildOkHttpClient()
        val componentsOverrides = buildCustomComponentsMap()
        val sdk = ConstellationMobileSDK(this, config, httpClient, componentsOverrides)

        setContent {
            SampleSdkTheme {
                Scaffold(Modifier.fillMaxSize()) { innerPadding ->
                    Box(Modifier.padding(innerPadding)) {
                        MainScreen(sdk)
                    }
                }
            }
        }
    }

    private fun buildConfig() = SDKConfig(
        pegaUrl = AppConfig.Pega.URL,
        pegaVersion = "8.24.1",
        caseClassName = AppConfig.Pega.CASE_CLASS_NAME,
        startingFields = mapOf()
    )

    private fun buildOkHttpClient() = OkHttpClient.Builder()
        .addInterceptor(AuthorizationInterceptor(this))
        .addNetworkInterceptor {
            val request = it.request()
            Log.d("OkHttpClient", "request: $request")
            it.proceed(request).also {
                Log.d("OkHttpClient", "response: $it")
            }
        }.build()

    // @formatter:off
    private fun buildCustomComponentsMap() = mapOf(
        "Email" to ComponentDefinition("components_overrides/email.component.override.js") { CustomEmailComponent(it) },
        "MyCompany_MyLib_Slider" to ComponentDefinition("components_overrides/slider.component.override.js") { CustomSliderComponent(it) },
    ) // @formatter:on
}

