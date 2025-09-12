package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.components

import androidx.compose.material3.Slider
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Label
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithFieldHelpers

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
