package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

class TextAreaComponent(context: ComponentContext) : FieldComponent(context) {
    var maxLength: Int by mutableIntStateOf(0)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        maxLength = props.optString("maxLength").ifEmpty { "100" }.toInt()
    }
}
