package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONObject

class UnsupportedJsComponent(context: ComponentContext) : BaseComponent(context) {
    override val state = UnsupportedJsState()

    override fun onUpdate(props: JSONObject) {
        state.componentType = props.getString("type")
    }
}

class UnsupportedJsState : ComponentState {
    var componentType by mutableStateOf("")
}

class UnsupportedJsRenderer : ComponentRenderer<UnsupportedJsComponent> {
    @Composable
    override fun Render(component: UnsupportedJsComponent) {
        Log.w(
            "UnsupportedJSComponent",
            "Component unsupported - not implemented in JavaScript code."
        )
        Unsupported("Unsupported component '${component.state.componentType}'")
    }
}
