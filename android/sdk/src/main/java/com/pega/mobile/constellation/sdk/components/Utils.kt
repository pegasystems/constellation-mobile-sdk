package com.pega.mobile.constellation.sdk.components

import org.json.JSONArray

internal fun <T> JSONArray.mapWithIndex(transform: JSONArray.(Int) -> T) =
    List(length()) { this.transform(it) }
