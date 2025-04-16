package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class ViewComponent(context: ComponentContext) : ContainerComponent(context) {
    var visible: Boolean by mutableStateOf(false)
        private set
    var label: String by mutableStateOf("")
        private set
    var showLabel: Boolean by mutableStateOf(false)
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        visible = props.getString("visible").toBoolean()
        label = props.getString("label")
        showLabel = props.getString("showLabel").toBoolean()
    }
}

class ViewRenderer : ComponentRenderer<ViewComponent> {
    @Composable
    override fun ViewComponent.Render() {

        if (!visible) return
        Column(modifier = Modifier.padding(vertical = 8.dp)) {
            if (showLabel && label.isNotEmpty()) {
                Text(
                    text = label,
                    textAlign = TextAlign.Left,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(vertical = 8.dp),
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            children.forEach { it.Render() }
        }
    }
}
