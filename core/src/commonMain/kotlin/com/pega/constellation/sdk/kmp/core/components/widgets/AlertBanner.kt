package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerVariant.URGENT
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject

class AlertBannerComponent(context: ComponentContext) : BaseComponent(context) {
    data class Message(val message: String, val isFieldMessage: Boolean)

    var variant: AlertBannerVariant by mutableStateOf(URGENT)
        private set
    var messages: List<Message> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        variant = AlertBannerVariant.valueOf(props.getString("variant").uppercase())
        messages = props.getJSONArray("messages").map {
            val message = it.jsonObject
            Message(message.getString("message"), message.getBoolean("isFieldMessage"))
        }
    }
}

enum class AlertBannerVariant {
    URGENT, WARNING, SUCCESS, INFO
}