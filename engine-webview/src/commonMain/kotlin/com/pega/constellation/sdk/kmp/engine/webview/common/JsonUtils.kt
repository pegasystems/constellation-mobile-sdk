package com.pega.constellation.sdk.kmp.engine.webview.common

import com.pega.constellation.sdk.kmp.core.EnvironmentInfo
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

internal fun JsonObject.toEnvironmentInfo() =
    EnvironmentInfo(getString("locale"), getString("timeZone"))