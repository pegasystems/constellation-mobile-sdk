package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.HideableComponent
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import kotlinx.serialization.json.JsonObject

class EmbeddedDataComponent(context: ComponentContext) : ContainerComponent(context), HideableComponent {
    override var visible: Boolean by mutableStateOf(true)
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        visible = props.optBoolean("visible", true)
    }
}
