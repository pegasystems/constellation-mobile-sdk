package com.pega.mobile.constellation.sdk.components.containers

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
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent
import com.pega.mobile.constellation.sdk.internal.ComponentManagerImpl.Companion.getComponentTyped
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class AssignmentCardComponent(context: ComponentContext) : ContainerComponent(context) {
    var actionButtons: ActionButtonsComponent? by mutableStateOf(null)
        private set
    var loading by mutableStateOf(true)
        private set

    override fun onUpdate(props: JSONObject) {
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
