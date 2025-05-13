package com.pega.mobile.constellation.sample.ui.components

import androidx.compose.material3.Slider
import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.fields.FieldComponent
import com.pega.mobile.constellation.sdk.components.fields.WithFieldHelpers
import com.pega.mobile.dxcomponents.compose.containers.Column
import com.pega.mobile.dxcomponents.compose.controls.form.Label

class CustomSliderComponent(context: ComponentContext) : FieldComponent(context)

class CustomSliderRenderer : ComponentRenderer<CustomSliderComponent> {
    @Composable
    override fun CustomSliderComponent.Render() {
        WithFieldHelpers {
            Column {
                Label(
                    label = label,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly
                )
                Slider(
                    value = value.toFloatOrNull() ?: 0f,
                    onValueChange = { updateValue(value) },
                    steps = 9,
                    valueRange = 0f..100f
                )
            }
        }
    }
}
