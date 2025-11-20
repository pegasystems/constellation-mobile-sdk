package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.fleeksoft.ksoup.Ksoup
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getString
import kotlinx.serialization.json.JsonObject

class DefaultFormComponent(context: ComponentContext) : ContainerComponent(context) {
    var instructionsHtml: String by mutableStateOf("")
        private set
    var instructionsText: String by mutableStateOf("")
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        instructionsHtml = props.getString("instructions")
        instructionsText = Ksoup.parse(props.getString("instructions")).wholeText()
    }
}
