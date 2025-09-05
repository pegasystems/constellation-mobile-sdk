package com.pega.mobile.constellation.sdk.components.helpers

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.runtime.Composable

@Composable
fun WithVisibility(visible: Boolean, content: @Composable () -> Unit) {
    AnimatedVisibility(visible) { content.invoke() }
}