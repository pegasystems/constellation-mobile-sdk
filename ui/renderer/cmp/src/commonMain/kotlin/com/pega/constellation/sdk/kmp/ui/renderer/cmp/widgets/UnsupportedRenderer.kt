package com.pega.constellation.sdk.kmp.ui.renderer.cmp.widgets

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_DEFINITION
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_RENDERER
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_JAVASCRIPT_IMPLEMENTATION
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.UNKNOWN_CAUSE
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Unsupported
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

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
