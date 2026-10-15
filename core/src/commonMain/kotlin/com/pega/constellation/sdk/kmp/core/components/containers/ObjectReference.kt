package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.HideableComponent
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

class ObjectReferenceComponent(context: ComponentContext) : ContainerComponent(context), HideableComponent {
    override var visible: Boolean by mutableStateOf(true)
        private set
    var isDisplayOnly: Boolean by mutableStateOf(false)
        private set
    var label: String by mutableStateOf("")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        visible = props.optBoolean("visible", true)
        isDisplayOnly = props.optBoolean("isDisplayOnly", false)
        label = props.optString("label")
    }
}
