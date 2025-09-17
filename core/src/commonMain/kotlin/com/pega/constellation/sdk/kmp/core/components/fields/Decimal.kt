package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getInt
import kotlinx.serialization.json.JsonObject

class DecimalComponent(context: ComponentContext) : FieldComponent(context) {
    var decimalPrecision: Int by mutableIntStateOf(0)
        private set
    var showGroupSeparators: Boolean by mutableStateOf(false)
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        decimalPrecision = props.getInt("decimalPrecision")
        showGroupSeparators = props.getBoolean("showGroupSeparators")
    }
}
