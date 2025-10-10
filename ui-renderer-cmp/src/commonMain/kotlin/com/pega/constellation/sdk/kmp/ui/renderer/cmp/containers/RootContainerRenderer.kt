package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Alert
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Confirm
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

class RootContainerRenderer : ComponentRenderer<RootContainerComponent> {

    @Composable
    override fun RootContainerComponent.Render() {
        val alert = context.componentManager.getAlertComponent()
        val alertInfo = alert.info

        Box {
            viewContainer?.Render()
//            Snackbar(
//                messages = httpMessages,
//                onSnackbarClose = { clearMessages() },
//                modifier = Modifier
//                    .align(Alignment.BottomCenter)
//                    .padding(bottom = 8.dp)
//            )
            // val alert = context.componentManager.getAlertComponent()
            alertInfo?.let {
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