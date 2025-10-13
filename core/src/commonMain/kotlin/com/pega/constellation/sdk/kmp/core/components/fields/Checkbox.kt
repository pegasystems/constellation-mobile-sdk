package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

class CheckboxComponent(context: ComponentContext) : FieldComponent(context) {
    var caption: String by mutableStateOf("")
        private set
    var trueLabel: String by mutableStateOf("true")
        private set
    var falseLabel: String by mutableStateOf("false")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        caption = props.optString("caption")
        trueLabel = props.optString("trueLabel", default = "True")
        falseLabel = props.optString("falseLabel", default = "False")
    }
}
