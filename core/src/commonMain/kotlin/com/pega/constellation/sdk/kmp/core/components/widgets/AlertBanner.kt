package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerVariant.URGENT
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Banner
import kotlinx.serialization.json.JsonObject

    var variant: AlertBannerVariant by mutableStateOf(URGENT)
    var variant: AlertBannerVariant by mutableStateOf(URGENT)
        private set
    var messages: List<String> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JsonObject) {
        variant = AlertBannerVariant.valueOf(props.getString("variant").uppercase())
        messages = props.getJSONArray("messages").mapWithIndex { getString(it) }
    }
}

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

enum class AlertBannerVariant {
    URGENT, WARNING, SUCCESS, INFO
}
