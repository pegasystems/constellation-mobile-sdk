package com.pega.mobile.constellation.sdk.components.widgets

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentViewModel
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerVariant.URGENT
import com.pega.mobile.dxcomponents.compose.controls.form.Banner
import com.pega.mobile.dxcomponents.compose.controls.form.BannerVariant

import org.json.JSONObject

class AlertBannerComponent(context: ComponentContext) : BaseComponent(context) {
    override val viewModel = AlertBannerViewModel()

    override fun onUpdate(props: JSONObject) {
        viewModel.variant = AlertBannerVariant.valueOf(props.getString("variant").uppercase())
        val messagesJsonArray = props.getJSONArray("messages")
        val messages = messagesJsonArray.mapWithIndex { getString(it) }
        viewModel.messages = messages
    }
}

class AlertBannerViewModel : ComponentViewModel {
    var variant: AlertBannerVariant by mutableStateOf(URGENT)
    var messages: List<String> by mutableStateOf(emptyList())
}

class AlertBannerRenderer : ComponentRenderer<AlertBannerViewModel> {
    @Composable
    override fun Render(viewModel: AlertBannerViewModel) {
        Banner(
            variant = BannerVariant.valueOf(viewModel.variant.name),
            messages = viewModel.messages
        )
    }
}

enum class AlertBannerVariant {
    URGENT, WARNING, SUCCESS, INFO
}