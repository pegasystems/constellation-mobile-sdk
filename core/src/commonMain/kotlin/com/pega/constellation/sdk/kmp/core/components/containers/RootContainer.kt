package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.core.BaseComponent
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentId
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.getJSONArray
import com.pega.constellation.sdk.kmp.core.components.getJsonObject
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import kotlinx.serialization.json.JsonObject

class RootContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var viewContainer: ViewContainerComponent? by mutableStateOf(null)
        private set
    var httpMessages: List<String> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JsonObject) {
        val viewContainerId = ComponentId(props.getString("viewContainer").toInt())
        val httpMessagesArray = props.getJSONArray("httpMessages")
        viewContainer = context.componentManager.getComponentTyped(viewContainerId)
        httpMessages = httpMessagesArray.mapWithIndex {
            val httpMessage = getJsonObject(it)
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
//            Snackbar(
//                messages = httpMessages,
//                onSnackbarClose = { clearMessages() },
//                modifier = Modifier
//                    .align(Alignment.BottomCenter)
//                    .padding(bottom = 8.dp)
//            )
//            val alert = context.componentManager.getAlertComponent()
//            alert.info?.let {
//                when (it.type) {
//                    AlertComponent.Type.CONFIRM -> Confirm(
//                        message = it.message,
//                        onConfirm = {
//                            it.onConfirm()
//                            alert.setAlertInfo(null)
//                        },
//                        onCancel = {
//                            it.onCancel()
//                            alert.setAlertInfo(null)
//                        })
//
//                    AlertComponent.Type.ALERT -> Alert(
//                        message = it.message,
//                        onConfirm = {
//                            it.onConfirm()
//                            alert.setAlertInfo(null)
//                        }
//                    )
//                }
//            }
        }
    }
}
