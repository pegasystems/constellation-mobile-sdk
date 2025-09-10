package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class TimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        clockFormat = props.getString("clockFormat")
    }
}
