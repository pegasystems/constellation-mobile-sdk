package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.Dialog
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Alert
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Confirm
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Prompt
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
            dialogConfig?.let {
                when (it.type) {
                    Dialog.Type.CONFIRM -> Confirm(
                        message = it.message,
                        onConfirm = {
                            it.onConfirm()
                            dismissDialog()
                        },
                        onCancel = {
                            it.onCancel()
                            dismissDialog()
                        })

                    Dialog.Type.ALERT -> Alert(
                        message = it.message,
                        onConfirm = {
                            it.onConfirm()
                            dismissDialog()
                        }
                    )

                    Dialog.Type.PROMPT -> Prompt(
                        message = it.message,
                        defaultValue = it.promptDefault ?: "",
                        onConfirm = { value ->
                            it.onPromptConfirm(value)
                            dismissDialog()
                        },
                        onCancel = {
                            it.onCancel()
                            dismissDialog()
                        }
                    )
                }
            }
        }
    }
}