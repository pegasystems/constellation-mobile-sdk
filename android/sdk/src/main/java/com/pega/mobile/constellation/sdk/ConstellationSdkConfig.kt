/*
 * Copyright © 2025 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sdk

import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import okhttp3.OkHttpClient

data class ConstellationSdkConfig(
    val pegaUrl: String,
    val pegaVersion: String,
    val okHttpClient: OkHttpClient = OkHttpClient(),
    val componentManager: ComponentManager = ComponentManager.create(),
    val debuggable: Boolean = false
)
