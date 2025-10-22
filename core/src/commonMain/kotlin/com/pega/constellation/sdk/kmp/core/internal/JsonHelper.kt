package com.pega.constellation.sdk.kmp.core.internal

import com.pega.constellation.sdk.kmp.core.Log
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonElement
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

private const val TAG = "JsonHelper"

fun Any.toJsonElement(): JsonElement? = when (this) {
    is String -> JsonPrimitive(this)
    is Int -> JsonPrimitive(this)
    is Double -> JsonPrimitive(this)
    is Float -> JsonPrimitive(this)
    is Boolean -> JsonPrimitive(this)
    is List<*> -> {
        val jsonElements = this.mapNotNull {
            it?.toJsonElement() ?: run {
                val type = it?.let { it::class } ?: "null"
                Log.w(TAG, "Unsupported type $type, cannot convert to JsonElement.")
                null
            }
        }
        JsonArray(jsonElements)
    }
    is Map<*, *> -> {
        val map = this.entries.mapNotNull { (key, value) ->
            (key as? String)?.let { k ->
                value?.toJsonElement()?.let { v -> k to v }
            } ?: run {
                val keyType = key?.let { it::class } ?: "null"
                val valueType = value?.let { it::class } ?: "null"
                Log.w(TAG, "Unsupported key type <$keyType> or value type <$valueType>, cannot convert to JsonElement.")
                null
            }
        }.toMap()
        JsonObject(map)
    }
    else -> {
        Log.w(TAG, "Unsupported type ${this::class}, cannot convert to JsonElement.")
        null
    }

}
