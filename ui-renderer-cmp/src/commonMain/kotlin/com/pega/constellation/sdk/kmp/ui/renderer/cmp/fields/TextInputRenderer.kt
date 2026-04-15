package com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TextInput
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

class TextInputRenderer : ComponentRenderer<TextInputComponent> {

    private fun logAncestors(component: Component, depth: Int = 1) {
        val parent = component.context.parentId
            ?.let { component.context.componentManager.getComponent(it) }
            ?: return
        Log.e("TEST", "ancestor (depth=$depth): $parent")
        logAncestors(parent, depth + 1)
    }

    @Composable
    override fun TextInputComponent.Render() {
        logAncestors(this)
        WithFieldHelpers {
            TextInput(
                value = value,
                label = label,
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
