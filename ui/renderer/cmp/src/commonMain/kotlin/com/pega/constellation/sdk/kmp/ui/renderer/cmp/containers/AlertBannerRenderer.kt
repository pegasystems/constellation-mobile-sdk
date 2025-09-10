package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Banner
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer

class AlertBannerRenderer : ComponentRenderer<AlertBannerComponent> {
    @Composable
    override fun AlertBannerComponent.Render() {
        Banner(
//            variant = BannerVariant.valueOf(variant.name),
            messages = messages,
            modifier = Modifier.padding(top = 16.dp)
        )
    }
}