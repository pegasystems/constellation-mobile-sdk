package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject

class DetailsComponent(context: ComponentContext) : ContainerComponent(context) {
    var showHighlightedFields: Boolean by mutableStateOf(false)
        private set
    var highlightedFields: List<HighlightedField> by mutableStateOf(emptyList())
        private set

    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        showHighlightedFields = props.getBoolean("showHighlightedFields")
        highlightedFields = props.getJSONArray("highlightedFields").map {
            val field = it.jsonObject
            HighlightedField(
                label = field.optString("label"),
                value = field.optString("value"),
                displayAsStatus = field.optBoolean("displayAsStatus", false),
            )
        }
    }

    data class HighlightedField(
        val label: String,
        val value: String,
        val displayAsStatus: Boolean,
    )
}
