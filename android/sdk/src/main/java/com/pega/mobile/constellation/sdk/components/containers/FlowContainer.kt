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
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class FlowContainerComponent(context: ComponentContext) : ContainerComponent(context) {
    override val viewModel = FlowContainerViewModel()
    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.title = props.getString("title")
    }
}

class FlowContainerViewModel : ContainerViewModel() {
    var title: String by mutableStateOf("")
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
                children.forEach { it.Render() }
            }
        }
    }
}

