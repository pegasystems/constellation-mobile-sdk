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
import com.pega.mobile.constellation.sdk.components.core.AlertComponent
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.constellation.sdk.internal.ComponentManagerImpl.Companion.getComponentTyped
import com.pega.mobile.dxcomponents.compose.controls.form.Alert
import com.pega.mobile.dxcomponents.compose.controls.form.Confirm
import com.pega.mobile.dxcomponents.compose.controls.form.Snackbar
import org.json.JSONObject

class RootContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var viewContainer: ViewContainerComponent? by mutableStateOf(null)
        private set
    var httpMessages: List<String> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JSONObject) {
        val viewContainerId = ComponentId(props.getString("viewContainer").toInt())
        val httpMessagesArray = props.getJSONArray("httpMessages")
        viewContainer = context.componentManager.getComponentTyped(viewContainerId)
        httpMessages = httpMessagesArray.mapWithIndex {
            val httpMessage = getJSONObject(it)
            val type = httpMessage.getString("type")
            val message = httpMessage.getString("message")
            val prefix = if (type == "error") "Http error: " else ""
            prefix + message
        }
    }

    fun clearMessages() {
        httpMessages = emptyList()
    }
}

class RootContainerRenderer : ComponentRenderer<RootContainerComponent> {
    @Composable
    override fun RootContainerComponent.Render() {
        Box {
            viewContainer?.Render()
            Snackbar(
                messages = httpMessages,
                onSnackbarClose = { clearMessages() },
                modifier = Modifier
                    .align(Alignment.BottomCenter)
                    .padding(bottom = 8.dp)
            )
            val alert = context.componentManager.getAlertComponent()
            alert.info?.let {
                when (it.type) {
                    AlertComponent.Type.CONFIRM -> Confirm(
                        message = it.message,
                        onConfirm = {
                            it.onConfirm()
                            alert.setAlertInfo(null)
                        },
                        onCancel = {
                            it.onCancel()
                            alert.setAlertInfo(null)
                        })

                    AlertComponent.Type.ALERT -> Alert(
                        message = it.message,
                        onConfirm = {
                            it.onConfirm()
                            alert.setAlertInfo(null)
                        }
                    )
                }
            }
        }
    }
}
