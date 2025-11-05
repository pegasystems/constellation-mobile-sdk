package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class DateTimeComponent(context: ComponentContext) : FieldComponent(context) {
    var clockFormat: String by mutableStateOf("")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        clockFormat = props.getString("clockFormat")
    }
}
