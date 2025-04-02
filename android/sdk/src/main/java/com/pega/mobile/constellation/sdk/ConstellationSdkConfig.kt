/*
 * Copyright © 2025 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sdk

import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import okhttp3.OkHttpClient
import java.util.concurrent.TimeUnit

data class ConstellationSdkConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val okHttpClient: OkHttpClient = defaultHttpClient(),
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
) {
    companion object {
        fun defaultHttpClient() = OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .readTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .build()
    }
}

