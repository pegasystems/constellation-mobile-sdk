package com.pega.mobile.constellation.sample.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

private val LightColorScheme = lightColorScheme(
    primary = Color(0xFF3B82F6),
    secondary = PurpleGrey40,
    tertiary = Pink40,
    background = Color(0xFFEFF6FF),
    secondaryContainer = Color(0xFFDBEAFE)
)

@Composable
fun MediaCoTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = LightColorScheme,
        typography = Typography,
        content = content
    )
}