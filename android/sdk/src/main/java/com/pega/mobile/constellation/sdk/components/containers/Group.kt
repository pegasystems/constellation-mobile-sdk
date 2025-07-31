package com.pega.mobile.constellation.sdk.components.containers

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.compose.ui.text.font.FontWeight
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.Render
import com.pega.mobile.dxcomponents.compose.containers.Column
import org.json.JSONObject

class GroupComponent(context: ComponentContext) : ContainerComponent(context) {
    var visible: Boolean by mutableStateOf(true)
        private set
    var showHeading: Boolean by mutableStateOf(false)
        private set
    var heading: String by mutableStateOf("")
        private set
    var instructions: String by mutableStateOf("")
        private set
    var collapsible: Boolean by mutableStateOf(false)
        private set

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        with(props) {
            visible = getBoolean("visible")
            showHeading = getBoolean("showHeading")
            heading = getString("heading")
            instructions = getString("instructions")
            collapsible = getBoolean("collapsible")
        }
    }
}

class GroupRenderer : ComponentRenderer<GroupComponent> {
    @Composable
    override fun GroupComponent.Render() {

        Column {
            Text(text = heading, fontWeight = FontWeight.Bold)
            children.forEach { it.Render() }
        }
    }

}