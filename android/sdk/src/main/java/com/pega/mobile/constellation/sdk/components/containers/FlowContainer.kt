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
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentViewModel
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.constellation.sdk.components.mapWithIndex
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class FlowContainerComponent(context: ComponentContext) : BaseComponent(context) {
    override val viewModel = FlowContainerViewModel()
    override fun onUpdate(props: JSONObject) {
        viewModel.title = props.getString("title")
        val assignmentId = ComponentId(props.getString("assignment").toInt())
        viewModel.assignment = context.componentManager.getComponent(assignmentId)
        val banners = props.getJSONArray("alertBanners")
        val ids = banners.mapWithIndex { getString(it).toInt() }
        viewModel.alertBanners = context.componentManager.getComponents(ids.map { ComponentId(it) })
    }
}

class FlowContainerViewModel : ComponentViewModel {
    var title: String by mutableStateOf("")
    var assignment: Component? by mutableStateOf(null)
    var alertBanners: List<Component> by mutableStateOf(emptyList())
}

class FlowContainerRenderer : ComponentRenderer<FlowContainerViewModel> {
    @Composable
    override fun Render(viewModel: FlowContainerViewModel) {
        with(viewModel) {
            Column {
                Text(
                    text = title,
                    modifier = Modifier.fillMaxWidth(),
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Left
                )
                alertBanners.forEach {
                    it.Render()
                }
                assignment?.Render()
            }
        }
    }
}

