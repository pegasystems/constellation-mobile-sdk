package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column
import kotlinx.serialization.json.JsonObject

class DefaultFormComponent(context: ComponentContext) : ContainerComponent(context) {
    var instructions: String by mutableStateOf("")
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        instructions = props.getString("instructions")
    }
}

class DefaultFormRenderer : ComponentRenderer<DefaultFormComponent> {
    @Composable
    override fun DefaultFormComponent.Render() {
        if (instructions.isNotEmpty()) {
            val rawText = instructions
            Text(
                text = rawText,
                textAlign = TextAlign.Left,
                modifier = Modifier.fillMaxWidth()
            )
        }
        Column {
            children.forEach { it.Render() }
        }
    }
}
