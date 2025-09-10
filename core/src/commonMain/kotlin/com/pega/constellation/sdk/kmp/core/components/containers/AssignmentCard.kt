package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentId
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.core.Render
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import com.pega.constellation.sdk.kmp.ui.components.cmp.containers.Column
import kotlinx.serialization.json.JsonObject

class AssignmentCardComponent(context: ComponentContext) : ContainerComponent(context) {
    var actionButtons: ActionButtonsComponent? by mutableStateOf(null)
        private set
    var loading by mutableStateOf(true)
        private set

    override fun onUpdate(props: JsonObject) {
        super.onUpdate(props)
        val actionButtonsId = ComponentId(props.getString("actionButtons").toInt())
        actionButtons = context.componentManager.getComponentTyped(actionButtonsId)
        loading = props.optBoolean("loading", false)
    }
}

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
