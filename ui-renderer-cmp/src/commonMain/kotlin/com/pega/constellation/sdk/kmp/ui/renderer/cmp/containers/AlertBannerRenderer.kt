package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Banner
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.BannerTheme
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.BannerVariant
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.LocalIsDarkTheme

val BannerThemeLight = BannerTheme(
    warningBackground = Color(0xFFFD6000),
    infoBackground = Color(0xFF8397AB),
    successBackground = Color(0xFF20AA50),
    urgentBackground = Color(0xFFB3261E),
    warningContent = Color.White,
    infoContent = Color.White,
    successContent = Color.White,
    urgentContent = Color.White,
)
val BannerThemeDark = BannerTheme(
    warningBackground = Color(0xFFFFB77A),
    infoBackground = Color(0xFFB0C4D8),
    successBackground = Color(0xFF5DD98A),
    urgentBackground = Color(0xFFF2B8B5),
    warningContent = Color(0xFF4A1800),
    infoContent = Color(0xFF1A2733),
    successContent = Color(0xFF003916),
    urgentContent = Color(0xFF690005),
)

class AlertBannerRenderer : ComponentRenderer<AlertBannerComponent> {
    @Composable
    override fun AlertBannerComponent.Render() {
        val bannerTheme = if (LocalIsDarkTheme.current) BannerThemeDark else BannerThemeLight
        Banner(
            variant = BannerVariant.valueOf(variant.name),
            messages = messages,
            bannerTheme = bannerTheme,
            modifier = Modifier.padding(top = 16.dp)
        )
    }
}