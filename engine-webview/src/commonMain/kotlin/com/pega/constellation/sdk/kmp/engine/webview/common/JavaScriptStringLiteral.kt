package com.pega.constellation.sdk.kmp.engine.webview.common

import kotlinx.serialization.json.JsonPrimitive

internal fun String.asJavaScriptStringLiteral(): String =
    JsonPrimitive(this).toString()
        .replace("\u2028", "\\u2028")
        .replace("\u2029", "\\u2029")
