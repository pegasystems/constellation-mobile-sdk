package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.LocalIsDarkTheme

private val LightColors = lightColorScheme(
    primary = Color(0xFF7C3AED),
    onPrimary = Color.White,
    primaryContainer = Color(0xFFEDE9FE),
    onPrimaryContainer = Color(0xFF2E1065),
    secondary = Color(0xFF6366F1),
    onSecondary = Color.White,
    secondaryContainer = Color(0xFFE0E7FF),
    onSecondaryContainer = Color(0xFF1E1B4B),
    tertiary = Color(0xFFEC4899),
    onTertiary = Color.White,
    tertiaryContainer = Color(0xFFFCE7F3),
    background = Color(0xFFFAF7FF),
    onBackground = Color(0xFF1E1B2E),
    surface = Color(0xFFFFFFFF),
    onSurface = Color(0xFF1E1B2E),
    surfaceVariant = Color(0xFFDFD9F3),
    onSurfaceVariant = Color(0xFF5B5470),
    outline = Color(0xFFA09BAF),
    outlineVariant = Color(0xFFE7E1F2),
    error = Color(0xFFB91C1C),
    onError = Color.White,
    secondaryFixed = Color(0xFFD5CCEA),
    onSecondaryFixed = Color.Black,
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFFA78BFA),
    onPrimary = Color(0xFF2E1065),
    primaryContainer = Color(0xFF4C1D95),
    onPrimaryContainer = Color(0xFFEDE9FE),
    secondary = Color(0xFF818CF8),
    secondaryContainer = Color(0xFF312E81),
    onSecondaryContainer = Color(0xFFE0E7FF),
    tertiary = Color(0xFFF472B6),
    background = Color(0xFF120E1F),
    onBackground = Color(0xFFE9E4F5),
    surface = Color(0xFF1B1530),
    onSurface = Color(0xFFE9E4F5),
    surfaceVariant = Color(0xFF302749),
    onSurfaceVariant = Color(0xFFE0D8F0),
    outline = Color(0xFF7C6FA8),
    outlineVariant = Color(0xFF3D3560),
    error = Color(0xFFF87171),
    onError = Color(0xFF7F1D1D),
)

/** Brand gradient (purple → indigo → pink) for hero surfaces and accents. */
val MediaCoBrandGradient: Brush = Brush.linearGradient(
    colors = listOf(
        Color(0xFF7C3AED),
        Color(0xFF6366F1),
        Color(0xFFEC4899)
    )
)

val MediaCoAuroraGradient: Brush = Brush.linearGradient(
    colors = listOf(
        Color(0x774338CA),
        Color(0x00312E81),
        Color(0x88A78BFA),
        Color(0x2AF472B6)
    )
)

private val MediaCoTypography = Typography(
    displaySmall = TextStyle(
        fontSize = 32.sp,
        lineHeight = 40.sp,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = (-0.5).sp
    ),
    headlineMedium = TextStyle(
        fontSize = 24.sp,
        lineHeight = 32.sp,
        fontWeight = FontWeight.SemiBold,
        letterSpacing = (-0.25).sp
    ),
    headlineSmall = TextStyle(
        fontSize = 20.sp,
        lineHeight = 28.sp,
        fontWeight = FontWeight.SemiBold
    ),
    titleLarge = TextStyle(fontSize = 18.sp, lineHeight = 24.sp, fontWeight = FontWeight.SemiBold),
    titleMedium = TextStyle(fontSize = 16.sp, lineHeight = 22.sp, fontWeight = FontWeight.Medium),
    bodyLarge = TextStyle(fontSize = 16.sp, lineHeight = 24.sp),
    bodyMedium = TextStyle(fontSize = 14.sp, lineHeight = 20.sp),
    bodySmall = TextStyle(fontSize = 12.sp, lineHeight = 16.sp),
    labelLarge = TextStyle(
        fontSize = 14.sp,
        lineHeight = 20.sp,
        fontWeight = FontWeight.Medium,
        letterSpacing = 0.1.sp
    ),
    labelSmall = TextStyle(
        fontSize = 11.sp,
        lineHeight = 16.sp,
        fontWeight = FontWeight.Medium,
        letterSpacing = 0.5.sp
    )
)

@Composable
fun MediaCoTheme(
    isDarkTheme: Boolean = true,
    content: @Composable () -> Unit
) {
    CompositionLocalProvider(
        LocalIsDarkTheme provides isDarkTheme
    ) {
        MaterialTheme(
            colorScheme = if (isDarkTheme) DarkColors else LightColors,
            typography = MediaCoTypography,
            content = content
        )
    }
}
