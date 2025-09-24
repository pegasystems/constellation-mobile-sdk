package com.pega.constellation.sdk.kmp.core.engine

import platform.Foundation.*

fun NSMutableURLRequest.removeUnwantedHeaders(): NSURLRequest {
    val headers = this.allHTTPHeaderFields ?: return this
    headers.entries.forEach { entry ->
        val key = entry.key as? String ?: return@forEach
        val value = entry.value as? String ?: return@forEach
        if (isUndefinedAuthHeader(key, value) || isDisallowedHeader(key)) {
            this.setValue(null, forHTTPHeaderField = key)
        }
    }
    return this
}
private val disallowedHeaders = listOf(
    "referer",
    "origin",
    "x-requested-with",
    "user-agent",
    "sec-ch-ua*",
    "sec-fetch*"
)
private fun isUndefinedAuthHeader(key: String, value: String): Boolean =
    key.equals("authorization", ignoreCase = true) && value.equals("undefined", ignoreCase = true)

private fun isDisallowedHeader(key: String): Boolean {
    val lowerKey = key.lowercase()
    return disallowedHeaders.any { disallowedHeader ->
        if (disallowedHeader.endsWith("*")) {
            lowerKey.startsWith(disallowedHeader.removeSuffix("*"))
        } else {
            lowerKey == disallowedHeader
        }
    }
}