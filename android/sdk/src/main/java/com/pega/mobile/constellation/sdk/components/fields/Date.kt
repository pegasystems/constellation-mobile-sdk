package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Date
import java.time.LocalDate

class DateComponent(context: ComponentContext) : FieldComponent(context)

class DateRenderer : ComponentRenderer<DateComponent> {
    @Composable
    override fun DateComponent.Render() {
        WithFieldHelpers {
            Date(
                value = value.asLocalDateOrNull(),
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                onValueChange = { updateValue(it.toString()) },
                onFocusChange = { updateFocus(it) }
            )
        }
    }

    private fun String.asLocalDateOrNull() = takeIf { isNotEmpty() }
        ?.runCatching { LocalDate.parse(this) }
        ?.onFailure { Log.e(TAG, "Unable to parse value as date", it) }
        ?.getOrNull()

    companion object {
        private const val TAG = "DateRenderer"
    }
}