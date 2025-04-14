package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.style.TextAlign
import androidx.core.text.HtmlCompat
import androidx.core.text.HtmlCompat.FROM_HTML_MODE_COMPACT
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class DefaultFormComponent(context: ComponentContext) : ContainerComponent(context) {
    override val state = DefaultFormState()
    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        state.instructions = props.getString("instructions")
    }
}

class DefaultFormState : ContainerState() {
    var instructions: String by mutableStateOf("")
}

class DefaultFormRenderer : ComponentRenderer<DefaultFormComponent> {
    @Composable
    override fun Render(component: DefaultFormComponent) {
        with(component.state) {
            if (instructions.isNotEmpty()) {
                val rawText = HtmlCompat.fromHtml(instructions, FROM_HTML_MODE_COMPACT).toString()
                    .trim('\n')
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
}
