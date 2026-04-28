package com.pega.constellation.sdk.kmp.core.components.fields

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.HideableComponent
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import kotlinx.serialization.json.JsonObject

class SemanticLinkComponent(context: ComponentContext) : BaseComponent(context), HideableComponent {
    var value: String by mutableStateOf("")
        private set
    var label: String by mutableStateOf("")
        private set
    override var visible: Boolean by mutableStateOf(false)
        private set

    override fun applyProps(props: JsonObject) {
        with(props) {
            value = getString("value")
            label = getString("label")
            visible = optBoolean("visible", true)
        }
    }
}