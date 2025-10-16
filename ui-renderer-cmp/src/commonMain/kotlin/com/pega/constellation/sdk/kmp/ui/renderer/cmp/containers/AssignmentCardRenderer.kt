package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render


class AssignmentCardRenderer : ComponentRenderer<AssignmentCardComponent> {
    @Composable
    override fun AssignmentCardComponent.Render() {
        Column(Modifier.padding(8.dp)) {
            LazyColumn(Modifier.weight(1f)) {
                items(children) { it.Render() }
            }
            actionButtons?.Render()
        }
    }
}