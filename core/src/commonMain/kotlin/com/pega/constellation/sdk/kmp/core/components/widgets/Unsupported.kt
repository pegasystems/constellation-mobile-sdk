package com.pega.constellation.sdk.kmp.core.components.widgets

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.BaseComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.api.HideableComponent
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import com.pega.constellation.sdk.kmp.core.components.optBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_JAVASCRIPT_IMPLEMENTATION
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.UNKNOWN_CAUSE
import kotlinx.serialization.json.JsonObject

class UnsupportedComponent(
    context: ComponentContext,
    type: ComponentType = ComponentType("Unknown"),
    cause: Cause = UNKNOWN_CAUSE,
    visible: Boolean = false
) : BaseComponent(context), HideableComponent {
    var type by mutableStateOf(type)
        private set
    var cause by mutableStateOf(cause)
        private set
    override var visible by mutableStateOf(visible)
        private set

    override fun applyProps(props: JsonObject) {
        type = ComponentType(props.optString("type", this.type.type))
        cause = MISSING_JAVASCRIPT_IMPLEMENTATION
        visible = props.optBoolean("visible", visible)
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
            cause = cause,
            visible = true
        )
    }
}

private const val TAG = "Unsupported"