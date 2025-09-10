package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerVariant.URGENT
import kotlinx.serialization.json.JsonObject

class AlertBannerComponent(context: ComponentContext) : BaseComponent(context) {
    var variant: AlertBannerVariant by mutableStateOf(URGENT)
        private set
    var messages: List<String> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JsonObject) {
        variant = AlertBannerVariant.valueOf(props.getString("variant").uppercase())
        messages = props.getJSONArray("messages").mapWithIndex { getString(it) }
    }
}

enum class AlertBannerVariant {
    URGENT, WARNING, SUCCESS, INFO
}