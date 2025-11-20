package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.fleeksoft.ksoup.Ksoup
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.HideableComponent
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class GroupComponent(context: ComponentContext) : ContainerComponent(context), HideableComponent {
    override var visible: Boolean by mutableStateOf(true)
        private set
    var showHeading: Boolean by mutableStateOf(false)
        private set
    var heading: String by mutableStateOf("")
        private set
    var instructionsHtml: String by mutableStateOf("")
        private set
    var instructionsText: String by mutableStateOf("")
        private set
    var collapsible: Boolean by mutableStateOf(false)
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        with(props) {
            visible = getBoolean("visible")
            showHeading = getBoolean("showHeading")
            heading = getString("heading")
            instructionsHtml = getString("instructions")
            instructionsText = Ksoup.parse(getString("instructions")).wholeText()
            collapsible = getBoolean("collapsible")
        }
    }
}