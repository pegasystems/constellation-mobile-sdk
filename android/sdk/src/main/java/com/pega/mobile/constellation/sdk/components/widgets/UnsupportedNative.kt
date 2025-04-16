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

class UnsupportedNativeComponent(
    componentType: String,
    context: ComponentContext
) : BaseComponent(context) {
    var componentType by mutableStateOf(componentType)
        private set

    override fun onUpdate(props: JSONObject) {
        error("This component should not receive any updates from JS")
    }
}

class UnsupportedNativeRenderer : ComponentRenderer<UnsupportedNativeComponent> {
    @Composable
    override fun UnsupportedNativeComponent.Render() {
        val message = "Unsupported component '$componentType'"
        Log.w("UnsupportedNativeComponent", "$message - not implemented in Native code")
        Unsupported(message)
    }
}
