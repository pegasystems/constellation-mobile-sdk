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
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Decimal
import kotlinx.serialization.json.JsonObject

class DecimalComponent(context: ComponentContext) : FieldComponent(context) {
    var decimalPrecision: Int by mutableIntStateOf(0)
        private set
    var showGroupSeparators: Boolean by mutableStateOf(false)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        decimalPrecision = props.getInt("decimalPrecision")
        showGroupSeparators = props.getBoolean("showGroupSeparators")
    }
}

class DecimalRenderer : ComponentRenderer<DecimalComponent> {
    @Composable
    override fun DecimalComponent.Render() {
        WithFieldHelpers {
            Decimal(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                decimalPrecision = decimalPrecision,
                showGroupSeparators = showGroupSeparators,
                onValueChange = { updateValue(it) },
                onFocusChange = { updateFocus(it) }
            )
        }
    }
}
