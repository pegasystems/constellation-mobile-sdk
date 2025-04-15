package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONObject

class UnsupportedJsComponent(context: ComponentContext) : BaseComponent(context) {
    var componentType by mutableStateOf("")
        private set

    override fun onUpdate(props: JSONObject) {
        componentType = props.getString("type")
    }
}

class UnsupportedJsRenderer : ComponentRenderer<UnsupportedJsComponent> {
    @Composable
    override fun UnsupportedJsComponent.Render() {
        val message = "Unsupported component '$componentType'"
        Log.w("UnsupportedJsComponent", "$message - not implemented in JS")
        Unsupported(message)
    }
}
