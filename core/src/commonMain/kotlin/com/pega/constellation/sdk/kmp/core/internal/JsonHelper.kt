package com.pega.constellation.sdk.kmp.core.internal

import com.pega.constellation.sdk.kmp.core.Log
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

private const val TAG = "JsonHelper"

internal fun Any.toJsonElement(): JsonElement? = when (this) {
    is String -> JsonPrimitive(this)
    is Int -> JsonPrimitive(this)
    is Double -> JsonPrimitive(this)
    is Float -> JsonPrimitive(this)
    is Boolean -> JsonPrimitive(this)
    is List<*> -> {
        val jsonElements = this.mapNotNull {
            it?.toJsonElement()
        }
        JsonArray(jsonElements)
    }
    is Map<*, *> -> {
        val map = this.entries.mapNotNull { (key, value) ->
            if (key is String) {
                return@mapNotNull value?.toJsonElement()?.let { v -> key to v }
            } else {
                Log.w(TAG, "Map key <$key> is not a String, cannot convert to JsonObject.")
                return@mapNotNull null
            }
        }.toMap()
        JsonObject(map)
    }
    else -> {
        Log.w(TAG, "Unsupported type ${this::class}, cannot convert to JsonElement.")
        null
    }
}
