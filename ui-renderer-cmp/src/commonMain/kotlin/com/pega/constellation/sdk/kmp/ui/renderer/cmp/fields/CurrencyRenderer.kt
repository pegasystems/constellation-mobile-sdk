package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.CurrencyComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Currency
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.FieldValue
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.getCurrencySymbol
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class CurrencyRenderer : ComponentRenderer<CurrencyComponent> {
    @Composable
    override fun CurrencyComponent.Render() {
        WithFieldHelpers(
            displayOnly = {
                val prefix = if (showIsoCode) isoCode else getCurrencySymbol(isoCode)
                val displayValue = if (prefix.isNotEmpty()) "$prefix $value" else value
                FieldValue(label, displayValue)
            },
            editable = {
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
        )
    }
}
