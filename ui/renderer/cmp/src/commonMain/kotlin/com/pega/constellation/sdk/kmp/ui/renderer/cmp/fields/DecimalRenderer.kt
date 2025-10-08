package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.DecimalComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Decimal
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer

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
