package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.fields.DateComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Date
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import kotlinx.datetime.LocalDate

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
