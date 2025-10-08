package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import kotlinx.serialization.json.JsonObject

class PhoneComponent(context: ComponentContext) : FieldComponent(context) {
    var showCountryCode: Boolean by mutableStateOf(true)
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        showCountryCode = props.getBoolean("showCountryCode")
    }
}
