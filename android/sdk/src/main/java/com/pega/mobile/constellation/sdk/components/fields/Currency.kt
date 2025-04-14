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
    override val state = CurrencyState(context)

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        state.placeholder = props.getString("placeholder")
        state.isoCode = props.getString("currencyISOCode")
        state.showIsoCode = props.getBoolean("showISOCode")
        state.decimalPrecision = props.getInt("decimalPrecision")
    }
}

class CurrencyState(context: ComponentContext) : FieldState(context) {
    var placeholder: String by mutableStateOf("")
    var isoCode: String by mutableStateOf("")
    var showIsoCode: Boolean by mutableStateOf(false)
    var decimalPrecision: Int by mutableIntStateOf(2)
}

class CurrencyRenderer : ComponentRenderer<CurrencyComponent> {
    @Composable
    override fun Render(component: CurrencyComponent) {
        WithVisibility(component.state) {
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
                onValueChange = { value = it },
                onFocusChange = { focused = it }
            )
        }
    }
}