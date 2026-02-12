package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.fields.RichTextComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.RichText
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.RichTextFieldValue
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class RichTextRenderer : ComponentRenderer<RichTextComponent> {
    @Composable
    override fun RichTextComponent.Render() {
        WithFieldHelpers(
            displayOnly = {
                RichTextFieldValue(label, value)
            },
            editable = {
                RichText(
                    value = value,
                    label = label,
                    helperText = helperText,
                    validateMessage = validateMessage,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly
                )
            }
        )
    }
}
