package com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.components

import androidx.compose.foundation.layout.Column
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.EmailRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
import com.pega.constellation.sdk.kmp.core.components.fields.WithFieldHelpers
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Email

class CustomEmailComponent(context: ComponentContext) : FieldComponent(context)

class CustomEmailRenderer : ComponentRenderer<CustomEmailComponent> {
    @Composable
    override fun CustomEmailComponent.Render() {
        val existingRenderer = EmailRenderer()

        WithFieldHelpers {
            Column {
                Email(
                    value = value,
                    label = "Custom $label",
                    helperText = helperText,
                    validateMessage = validateMessage,
                    placeholder = placeholder,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly,
                    onValueChange = { updateValue(it) },
                    onFocusChange = { updateFocus(it) }
                )
            }
        }
    }
}




