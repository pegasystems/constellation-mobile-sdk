package com.pega.mobile.constellation.sdk.components.widgets

import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerVariant.URGENT
import com.pega.mobile.dxcomponents.compose.controls.form.Banner
import com.pega.mobile.dxcomponents.compose.controls.form.BannerVariant
import org.json.JSONObject

class AlertBannerComponent(context: ComponentContext) : BaseComponent(context) {
    var variant: AlertBannerVariant by mutableStateOf(URGENT)
        private set
    var messages: List<String> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JSONObject) {
        variant = AlertBannerVariant.valueOf(props.getString("variant").uppercase())
        messages = props.getJSONArray("messages").mapWithIndex { getString(it) }
    }
}

class AlertBannerRenderer : ComponentRenderer<AlertBannerComponent> {
    @Composable
    override fun AlertBannerComponent.Render() {
        Banner(
            variant = BannerVariant.valueOf(variant.name),
            messages = messages,
            modifier = Modifier.padding(top = 16.dp)
        )
    }
}

enum class AlertBannerVariant {
    URGENT, WARNING, SUCCESS, INFO
}