package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import com.pega.mobile.constellation.sdk.internal.ComponentManagerImpl.Companion.getComponentTyped
import com.pega.mobile.dxcomponents.compose.controls.form.Snackbar
import org.json.JSONObject

class RootContainerComponent(context: ComponentContext) : BaseComponent(context) {
    override val state = RootContainerState()

    override fun onUpdate(props: JSONObject) {
        val viewContainerId = ComponentId(props.getString("viewContainer").toInt())
        val httpMessagesArray = props.getJSONArray("httpMessages")
        state.viewContainer = context.componentManager.getComponentTyped(viewContainerId)
        state.httpMessages = httpMessagesArray.mapWithIndex {
            val httpMessage = getJSONObject(it)
            HttpMessage(httpMessage.getString("type"), httpMessage.getString("message"))
        }
    }
}

class RootContainerState : ComponentState {
    var viewContainer: ViewContainerComponent? by mutableStateOf(null)
    var httpMessages: List<HttpMessage> by mutableStateOf(emptyList())
}

data class HttpMessage(
    val type: String,
    val message: String
)

class RootContainerRenderer : ComponentRenderer<RootContainerComponent> {
    @Composable
    override fun Render(component: RootContainerComponent) {
        with(component.state) {
            Box {
                viewContainer?.Render()
                Snackbar(
                    messages = messages(),
                    onSnackbarClose = { httpMessages = emptyList() },
                    modifier = Modifier
                        .align(Alignment.BottomCenter)
                        .padding(bottom = 8.dp)
                )
            }
        }
    }

    private fun RootContainerState.messages() = httpMessages.map {
        val prefix = if (it.type == "error") "Http error: " else ""
        prefix + it.message
    }
}
