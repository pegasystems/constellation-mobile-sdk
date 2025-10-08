package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.PhoneComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Phone
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class PhoneRenderer : ComponentRenderer<PhoneComponent> {
    @Composable
    override fun PhoneComponent.Render() {
        WithFieldHelpers {
            Phone(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                showCountryFlag = showCountryCode,
                onValueChange = { updateValue(it) },
                onFocusChange = { updateFocus(it) }
            )
        }
    }
}
