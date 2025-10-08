package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render


class AssignmentCardRenderer : ComponentRenderer<AssignmentCardComponent> {
    @Composable
    override fun AssignmentCardComponent.Render() {
        val alpha by animateFloatAsState(if (loading) 0.5f else 1f)
        Box(
            modifier = Modifier
                .fillMaxSize()
                .alpha(alpha),
            contentAlignment = Alignment.Center
        ) {
            if (loading) CircularProgressIndicator()
            Column(modifier = Modifier.padding(8.dp)) {
                LazyColumn(modifier = Modifier.weight(1f)) {
                    items(children) { it.Render() }
                }
                actionButtons?.Render()
            }
        }
    }
}