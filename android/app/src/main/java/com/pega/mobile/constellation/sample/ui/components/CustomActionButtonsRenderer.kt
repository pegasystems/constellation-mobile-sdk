package com.pega.mobile.constellation.sample.ui.components

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent
import com.pega.mobile.dxcomponents.compose.containers.Row
import com.pega.mobile.dxcomponents.compose.controls.form.Button

class CustomActionButtonsRenderer : ComponentRenderer<ActionButtonsComponent> {
    @Composable
    override fun ActionButtonsComponent.Render() {
        Row(modifier = Modifier.fillMaxWidth()) {
            secondaryButtons.forEach {
                Button(
                    title = it.name,
                    modifier = Modifier.weight(1f),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.White,
                        contentColor = Color.Black
                    ),
                    onClick = { onClick(it) }
                )
            }
            primaryButtons.forEach {
                Button(
                    title = it.name.trimEnd(),
                    modifier = Modifier.weight(1f),
                    onClick = { onClick(it) }
                )
            }
        }
    }
}