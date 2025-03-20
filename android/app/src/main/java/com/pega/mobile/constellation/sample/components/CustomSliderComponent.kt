/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.components

import androidx.compose.material3.Slider
import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.fields.FieldComponent
import com.pega.mobile.constellation.sdk.components.fields.FieldViewModel
import com.pega.mobile.dxcomponents.compose.containers.Column
import com.pega.mobile.dxcomponents.compose.controls.form.Label

class CustomSliderComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = SliderViewModel()
}

class SliderViewModel : FieldViewModel()

class CustomSliderRenderer : ComponentRenderer<SliderViewModel> {
    @Composable
    override fun Render(viewModel: SliderViewModel) {
        with(viewModel) {
            Column {
                Label(
                    label = label,
                    required = required,
                    disabled = disabled,
                    readOnly = readOnly
                )
                Slider(
                    value = value.toFloatOrNull() ?: 0f,
                    onValueChange = { value = it.toInt().toString() },
                    steps = 9,
                    valueRange = 0f..100f
                )
            }
        }
    }
}
