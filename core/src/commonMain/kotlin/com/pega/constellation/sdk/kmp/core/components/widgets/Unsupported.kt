package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import com.pega.constellation.sdk.kmp.core.components.core.BaseComponent
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.core.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.core.ComponentType
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.getString
import com.pega.constellation.sdk.kmp.core.components.helpers.WithVisibility
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_DEFINITION
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_RENDERER
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_JAVASCRIPT_IMPLEMENTATION
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.UNKNOWN_CAUSE
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Unsupported
import kotlinx.serialization.json.JsonObject

class UnsupportedComponent(
    context: ComponentContext,
    type: ComponentType = ComponentType("Unknown"),
    cause: Cause = UNKNOWN_CAUSE,
) : BaseComponent(context) {
    var type by mutableStateOf(type)
        private set
    var cause by mutableStateOf(cause)
        private set
    var visible by mutableStateOf(false)
        private set

    override fun onUpdate(props: JsonObject) {
        type = ComponentType(props.getString("type"))
        cause = MISSING_JAVASCRIPT_IMPLEMENTATION
        visible = props.getBoolean("visible")
    }

    enum class Cause {
        MISSING_JAVASCRIPT_IMPLEMENTATION,
        MISSING_COMPONENT_DEFINITION,
        MISSING_COMPONENT_RENDERER,
        UNKNOWN_CAUSE
    }

    companion object {
        fun create(context: ComponentContext, cause: Cause) = UnsupportedComponent(
            context = ComponentContextImpl(
                id = context.id,
                type = ComponentTypes.Unsupported,
                componentManager = context.componentManager,
                onComponentEvent = { Log.w(TAG, "Cannot send event to unsupported: $it") }
            ),
            type = context.type,
            cause = cause
        )
    }
}

private const val TAG = "Unsupported"

class UnsupportedRenderer : ComponentRenderer<UnsupportedComponent> {
    @Composable
    override fun UnsupportedComponent.Render() {
        Log.w(TAG, "Unsupported component '$type' due to ${cause.message()}")
        WithVisibility(visible) {
            Unsupported("Unsupported component '$type'")
        }
    }

    private fun Cause.message() = when (this) {
        MISSING_JAVASCRIPT_IMPLEMENTATION -> "missing JavaScript implementation"
        MISSING_COMPONENT_DEFINITION -> "missing component definition"
        MISSING_COMPONENT_RENDERER -> "missing component renderer"
        UNKNOWN_CAUSE -> "unknown cause"
    }
}
