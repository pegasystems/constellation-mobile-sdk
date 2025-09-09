package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils

import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.PressInteraction
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import kotlinx.coroutines.flow.filter

@Composable
internal fun interceptInteractionSource(
    disabled: Boolean,
    readOnly: Boolean,
    onRelease: () -> Unit
): MutableInteractionSource {
    val interactionSource = remember { MutableInteractionSource() }
    LaunchedEffect(interactionSource, disabled, readOnly) {
        if (!disabled && !readOnly) {
            interactionSource.interactions
                .filter { it is PressInteraction.Release }
                .collect { onRelease() }
        }
    }
    return interactionSource
}
