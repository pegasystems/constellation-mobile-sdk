package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Currency
import org.json.JSONObject

class CurrencyComponent(context: ComponentContext) : FieldComponent(context) {
    var placeholder: String by mutableStateOf("")
        private set
    var isoCode: String by mutableStateOf("")
        private set
    var showIsoCode: Boolean by mutableStateOf(false)
        private set
    var decimalPrecision: Int by mutableIntStateOf(2)
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        placeholder = props.getString("placeholder")
        isoCode = props.getString("currencyISOCode")
        showIsoCode = props.getBoolean("showISOCode")
        decimalPrecision = props.getInt("decimalPrecision")
    }
}

class CurrencyRenderer : ComponentRenderer<CurrencyComponent> {
    @Composable
    override fun CurrencyComponent.Render() {
        WithVisibility {
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