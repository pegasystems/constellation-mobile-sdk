package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getInt
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class CurrencyComponent(context: ComponentContext) : FieldComponent(context) {
    var isoCode: String by mutableStateOf("")
        private set
    var showIsoCode: Boolean by mutableStateOf(false)
        private set
    var decimalPrecision: Int by mutableIntStateOf(2)
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        isoCode = props.getString("currencyISOCode")
        showIsoCode = props.getBoolean("showISOCode")
        decimalPrecision = props.getInt("decimalPrecision")
    }
}

