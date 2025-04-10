package com.pega.mobile.constellation.sdk.components.fields

import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Dropdown

class DropdownComponent(context: ComponentContext) : SelectableComponent(context)

class DropdownRenderer : ComponentRenderer<SelectableViewModel> {
    @Composable
    override fun Render(viewModel: SelectableViewModel) {
        WithVisibility(viewModel) {
            Dropdown(
                value = value,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                options = options.map {
                    com.pega.mobile.dxcomponents.compose.controls.form.internal.SelectableOption(
                        it.key,
                        it.label
                    )
                },
                onValueChange = { value = it }
            )
        }
    }
}