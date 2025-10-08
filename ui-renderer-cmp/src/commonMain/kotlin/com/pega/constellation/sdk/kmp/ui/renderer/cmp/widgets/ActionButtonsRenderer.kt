package com.pega.constellation.sdk.kmp.ui.renderer.cmp.widgets

import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.ButtonDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Button
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer

class ActionButtonsRenderer : ComponentRenderer<ActionButtonsComponent> {
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