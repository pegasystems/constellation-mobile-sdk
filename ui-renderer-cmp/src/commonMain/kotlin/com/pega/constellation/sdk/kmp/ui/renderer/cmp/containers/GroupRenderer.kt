package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.containers.GroupComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.arrow_right_48
import org.jetbrains.compose.resources.painterResource

class GroupRenderer : ComponentRenderer<GroupComponent> {
    @Composable
    override fun GroupComponent.Render() {
        if (collapsible) {
            CollapsibleGroup(heading, children)
        } else {
            NonCollapsibleGroup(heading, children)
        }
    }
}

@Composable
fun CollapsibleGroup(heading: String, children: List<Component>) {
    var collapsed by remember { mutableStateOf(false) }
    val rotationAngle by animateFloatAsState(
        targetValue = if (collapsed) 0f else 90f,
        label = "RotationAnimation"
    )
    Column {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.fillMaxWidth()
                .clickable { collapsed = !collapsed }
        ) {
            Icon(
                painter = painterResource(Res.drawable.arrow_right_48),
                contentDescription = if (collapsed) "Collapsed" else "Expanded",
                modifier = Modifier.height(24.dp).rotate(rotationAngle)
            )
            Heading(heading, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
        }
        AnimatedVisibility(visible = !collapsed) {
            Column {
                children.forEach { it.Render() }
            }
        }
    }
}

@Composable
fun NonCollapsibleGroup(heading: String, children: List<Component>) {
    Column {
        Heading(heading, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
        children.forEach { it.Render() }
    }
}
