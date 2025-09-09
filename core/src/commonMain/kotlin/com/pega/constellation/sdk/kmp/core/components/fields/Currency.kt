package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getInt
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Currency
import kotlinx.serialization.json.JsonObject

class CurrencyComponent(context: ComponentContext) : FieldComponent(context) {
    var isoCode: String by mutableStateOf("")
        private set
    var showIsoCode: Boolean by mutableStateOf(false)
        private set
    var decimalPrecision: Int by mutableIntStateOf(2)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        isoCode = props.getString("currencyISOCode")
        showIsoCode = props.getBoolean("showISOCode")
        decimalPrecision = props.getInt("decimalPrecision")
    }
}

class CurrencyRenderer : ComponentRenderer<CurrencyComponent> {
    @Composable
    override fun CurrencyComponent.Render() {
        WithFieldHelpers {
            Currency(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                isoCode = isoCode,
                showIsoCode = showIsoCode,
                decimalPrecision = decimalPrecision,
                onValueChange = { updateValue(it) },
                onFocusChange = { updateFocus(it) }
            )
        }
    }
}
