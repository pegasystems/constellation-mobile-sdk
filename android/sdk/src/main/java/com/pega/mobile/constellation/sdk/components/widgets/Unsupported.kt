package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.ComponentTypes
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentContextImpl
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentType
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONObject

class UnsupportedComponent(
    context: ComponentContext,
    componentType: ComponentType = ComponentType("Unknown")
) : BaseComponent(context) {
    var componentType by mutableStateOf(componentType)
        private set

    override fun onUpdate(props: JSONObject) {
        componentType = ComponentType(props.getString("type"))
    }

    companion object {
        private const val TAG = "Unsupported"

        fun create(context: ComponentContext) = UnsupportedComponent(
            context = ComponentContextImpl(
                id = context.id,
                type = ComponentTypes.Unsupported,
                componentManager = context.componentManager,
                onComponentEvent = { Log.w(TAG, "Cannot send event to unsupported: $it") }
            ),
            componentType = context.type,
        )
    }
}

class UnsupportedRenderer : ComponentRenderer<UnsupportedComponent> {
    @Composable
    override fun UnsupportedComponent.Render() {
        val message = "Unsupported component '$componentType'"
        Log.w("Unsupported", message)
        Unsupported(message)
    }
}
