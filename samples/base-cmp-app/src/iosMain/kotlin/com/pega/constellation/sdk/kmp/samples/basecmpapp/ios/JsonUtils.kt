package com.pega.constellation.sdk.kmp.samples.basecmpapp.ios

import kotlinx.serialization.json.Json
import kotlinx.serialization.json.jsonObject

@Suppress("unused")
fun serialize(input: String) = Json.parseToJsonElement(input).jsonObject