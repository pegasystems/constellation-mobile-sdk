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
import com.pega.mobile.constellation.sdk.components.helpers.WithVisibility
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent.Cause
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_DEFINITION
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_RENDERER
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent.Cause.MISSING_JAVASCRIPT_IMPLEMENTATION
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONObject

class UnsupportedComponent(
    context: ComponentContext,
    unsupportedType: ComponentType = ComponentType("Unknown"),
    val cause: Cause = MISSING_JAVASCRIPT_IMPLEMENTATION,
) : BaseComponent(context) {
    var unsupportedType by mutableStateOf(unsupportedType)
        private set
    var visible by mutableStateOf(true)
        private set

    override fun onUpdate(props: JSONObject) {
        // for MISSING_JAVASCRIPT_IMPLEMENTATION, we get missing type in props
        // for other causes, we use the type from the context and pass here in constructor
        if (cause == MISSING_JAVASCRIPT_IMPLEMENTATION) {
            unsupportedType = ComponentType(props.getString("type"))
        }
        visible = props.optBoolean("visible", true)
    }

    enum class Cause {
        MISSING_JAVASCRIPT_IMPLEMENTATION,
        MISSING_COMPONENT_DEFINITION,
        MISSING_COMPONENT_RENDERER
    }

    companion object {
        fun create(context: ComponentContext, cause: Cause) = UnsupportedComponent(
            context = ComponentContextImpl(
                id = context.id,
                type = ComponentTypes.Unsupported,
                componentManager = context.componentManager,
                onComponentEvent = { Log.w(TAG, "Cannot send event to unsupported: $it") }
            ),
            unsupportedType = context.type,
            cause = cause
        )
    }
}

private const val TAG = "Unsupported"

class UnsupportedRenderer : ComponentRenderer<UnsupportedComponent> {
    @Composable
    override fun UnsupportedComponent.Render() {
        Log.w(TAG, "Unsupported component '$unsupportedType' due to ${cause.message()}")
        WithVisibility(visible) {
            Unsupported("Unsupported component '$unsupportedType'")
        }
    }

    private fun Cause.message() = when (this) {
        MISSING_JAVASCRIPT_IMPLEMENTATION -> "missing JavaScript implementation"
        MISSING_COMPONENT_DEFINITION -> "missing component definition"
        MISSING_COMPONENT_RENDERER -> "missing component renderer"
    }
}
