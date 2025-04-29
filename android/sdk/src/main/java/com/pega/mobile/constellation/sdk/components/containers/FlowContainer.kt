package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerComponent
import com.pega.mobile.constellation.sdk.internal.ComponentManagerImpl.Companion.getComponentTyped
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class FlowContainerComponent(context: ComponentContext) : BaseComponent(context) {
    var title: String by mutableStateOf("")
        private set
    var assignment: AssignmentComponent? by mutableStateOf(null)
        private set
    var alertBanners: List<AlertBannerComponent> by mutableStateOf(emptyList())
        private set

    override fun onUpdate(props: JSONObject) {
        val manager = context.componentManager
        val assignmentId = ComponentId(props.getString("assignment").toInt())
        val banners = props.getJSONArray("alertBanners")
        val bannersIds = banners.mapWithIndex { getString(it).toInt() }
        title = props.getString("title")
        assignment = manager.getComponentTyped(assignmentId)
        alertBanners = bannersIds.mapNotNull { manager.getComponentTyped(ComponentId(it)) }
    }
}

class FlowContainerRenderer : ComponentRenderer<FlowContainerComponent> {
    @Composable
    override fun FlowContainerComponent.Render() {
        Column {
            Text(
                text = title,
                modifier = Modifier.fillMaxWidth(),
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Left
            )
            alertBanners.forEach { it.Render() }
            assignment?.Render()
        }
    }
}
