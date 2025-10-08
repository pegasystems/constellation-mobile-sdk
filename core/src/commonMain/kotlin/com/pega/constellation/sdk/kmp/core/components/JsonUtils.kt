package com.pega.constellation.sdk.kmp.core.components

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.booleanOrNull
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun JsonArray.getJsonObject(index: Int) = get(index).jsonObject
fun JsonArray.getString(index: Int) = get(index).jsonPrimitive.content

fun JsonObject.getJSONArray(key: String) = getValue(key).jsonArray
fun JsonObject.getString(key: String) = getValue(key).jsonPrimitive.content
fun JsonObject.optString(key: String) = get(key)?.jsonPrimitive?.content.orEmpty()
fun JsonObject.getBoolean(key: String) = getValue(key).jsonPrimitive.boolean
fun JsonObject.optBoolean(key: String, default: Boolean) =
    get(key)?.jsonPrimitive?.booleanOrNull ?: default

fun JsonObject.getInt(key: String) = getValue(key).jsonPrimitive.int
