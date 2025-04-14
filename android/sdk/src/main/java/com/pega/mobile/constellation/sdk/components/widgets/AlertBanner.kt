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
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerVariant.URGENT
import com.pega.mobile.dxcomponents.compose.controls.form.Banner
import com.pega.mobile.dxcomponents.compose.controls.form.BannerVariant
import org.json.JSONObject

class AlertBannerComponent(context: ComponentContext) : BaseComponent(context) {
    override val state = AlertBannerState()

    override fun onUpdate(props: JSONObject) {
        state.variant = AlertBannerVariant.valueOf(props.getString("variant").uppercase())
        val messagesJsonArray = props.getJSONArray("messages")
        val messages = messagesJsonArray.mapWithIndex { getString(it) }
        state.messages = messages
    }
}

class AlertBannerState : ComponentState {
    var variant: AlertBannerVariant by mutableStateOf(URGENT)
    var messages: List<String> by mutableStateOf(emptyList())
}

class AlertBannerRenderer : ComponentRenderer<AlertBannerComponent> {
    @Composable
    override fun Render(component: AlertBannerComponent) {
        Banner(
            variant = BannerVariant.valueOf(component.state.variant.name),
            messages = component.state.messages,
            modifier = Modifier.padding(top = 16.dp)
        )
    }
}

enum class AlertBannerVariant {
    URGENT, WARNING, SUCCESS, INFO
}