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

class UnsupportedNativeComponent(componentType: String, context: ComponentContext) :
    BaseComponent(context) {
    override val state = UnsupportedNativeState(componentType)

    override fun onUpdate(props: JSONObject) {}
}

class UnsupportedNativeState(initialState: String) : ComponentState {
    var componentType by mutableStateOf(initialState)
}

class UnsupportedNativeRenderer : ComponentRenderer<UnsupportedNativeComponent> {
    @Composable
    override fun Render(component: UnsupportedNativeComponent) {
        Log.w(
            "UnsupportedNativeComponent",
            "Component unsupported - not implemented in Native code."
        )
        Unsupported("Missing native component for '${component.state.componentType}'")
    }
}
