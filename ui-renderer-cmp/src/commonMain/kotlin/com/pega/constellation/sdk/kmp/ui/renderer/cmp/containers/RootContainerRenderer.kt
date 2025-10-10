package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Alert
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Confirm
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Snackbar
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render

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