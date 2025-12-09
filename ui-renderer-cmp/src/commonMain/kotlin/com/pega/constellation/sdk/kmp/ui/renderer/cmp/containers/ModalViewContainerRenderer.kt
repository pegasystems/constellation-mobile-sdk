package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.BasicAlertDialog
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.containers.ModalViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Button
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

class ModalViewContainerRenderer : ComponentRenderer<ModalViewContainerComponent> {
    @OptIn(ExperimentalMaterial3Api::class)
    @Composable
    override fun ModalViewContainerComponent.Render() {
        WithVisibility(visible) {
            BasicAlertDialog(
                onDismissRequest = {
                    onCancelClick()
                }
                ) {
                Card(
                    modifier = Modifier.fillMaxWidth(),
                ) {
                    Column(Modifier.padding(16.dp)) {
                        if (title.isNotEmpty()) {
                            Heading(title)
                        }
                        alertBanners.forEach { it.Render() }
                        children.forEach { it.Render() }
                        Row(modifier = Modifier.fillMaxWidth()) {
                            Button(
                                title = cancelButtonLabel,
                                modifier = Modifier.weight(1f),
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = Color.White,
                                    contentColor = Color.Black
                                ),
                                onClick = { onCancelClick() }
                            )
                            Button(
                                title = submitButtonLabel,
                                modifier = Modifier.weight(1f),
                                onClick = { onSubmitClick() }
                            )
                        }
                    }
                }
            }
        }
    }
}
