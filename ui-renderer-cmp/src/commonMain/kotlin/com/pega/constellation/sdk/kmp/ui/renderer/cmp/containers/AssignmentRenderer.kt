package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.semantics.clearAndSetSemantics
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import kotlinx.coroutines.delay

class AssignmentRenderer : ComponentRenderer<AssignmentComponent> {
    @Composable
    override fun AssignmentComponent.Render() {
        val alpha by animateFloatAsState(if (loading) 0.5f else 1f)

        Box(
            modifier = Modifier.fillMaxSize().alpha(alpha),
            contentAlignment = Alignment.Center
        ) {
            Column {
                children.forEach { it.Render() }
            }
            DelayedProgress(loading)
        }
    }

    @Composable
    private fun DelayedProgress(loading: Boolean) {
        var showProgress by remember { mutableStateOf(false) }

        LaunchedEffect(loading) {
            if (loading) {
                delay(150) // Delay to avoid flickering for fast operations
                showProgress = true
            } else {
                showProgress = false
            }
        }

        if (showProgress) {
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .clearAndSetSemantics {}
                    .clickable(
                        onClick = { /* Do nothing, consume the click */ },
                        indication = null, // Removes the ripple effect
                        interactionSource = remember { MutableInteractionSource() }
                    ),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        }
    }

}