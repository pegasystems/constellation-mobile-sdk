package com.pega.constellation.sdk.kmp.test.mock.handlers

import com.pega.constellation.sdk.kmp.test.mock.MockRequest
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

internal fun MockRequest.getPageInstructions() = body?.let {
    Json.parseToJsonElement(it).jsonObject["pageInstructions"]?.jsonArray
}

internal fun MockRequest.getContentPageKey(page: String, key: String) = body?.let {
    Json.parseToJsonElement(it).jsonObject
        .getValue("content").jsonObject
        .getValue(page).jsonObject
        .getValue(key).jsonPrimitive
        .int
}
