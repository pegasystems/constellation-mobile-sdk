/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.ui.screens

import androidx.compose.material3.Slider
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.pega.mobile.dxcomponents.compose.containers.Column
import com.pega.mobile.dxcomponents.compose.controls.form.Label
import com.pega.mobile.constellation.sample.components.CustomSliderViewModel

@Composable
fun CustomSlider(viewModel: CustomSliderViewModel) {
    val state = viewModel.state.observeAsState()
    state.value?.run {
        Column {
            Label(
                label = label,
                required = required,
                disabled = disabled,
                readOnly = readOnly
            )
            Slider(
                value = value.toFloatOrNull() ?: 0f,
                onValueChange = { viewModel.setValue(it.toInt().toString()) },
                steps = 9,
                valueRange = 0f..100f
            )
        }
    }
}
