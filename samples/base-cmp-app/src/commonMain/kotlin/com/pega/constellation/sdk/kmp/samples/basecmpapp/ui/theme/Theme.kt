package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

@Composable
fun MediaCoTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = lightColorScheme(
            primary = Color(0xFF3B82F6),
            secondary = Color(0xFF625b71),
            tertiary = Color(0xFF7D5260),
            background = Color(0xFFEFF6FF),
            secondaryContainer = Color(0xFFDBEAFE)
        ),
        content = content
    )
}
