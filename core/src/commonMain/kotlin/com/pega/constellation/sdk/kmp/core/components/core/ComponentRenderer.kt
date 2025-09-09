package com.pega.constellation.sdk.kmp.core.components.core

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Unsupported
import com.pega.constellation.sdk.kmp.core.components.Components
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_RENDERER
import com.pega.constellation.sdk.kmp.ui.components.cmp.stub.Log

private const val TAG = "ComponentRenderer"
private val LocalRenderers = compositionLocalOf { Components.DefaultRenderers }

/**
 * Allows to render components using Jetpack Compose.
 *
 * @see [Components.DefaultRenderers]
 */
interface ComponentRenderer<C : Component> {
    @Composable
    fun C.Render()
}

/**
 * Helper extension method to render any component.
 * It uses map of renderers stored in [LocalRenderers], which can be customized with [ProvideRenderers].
 */
@Composable
fun <C : Component> C.Render() {
    val component = this
    val renderers = LocalRenderers.current
    val renderer = renderers[context.type]
    renderer?.Render(component)
        ?: renderers.getValue(Unsupported)
            .Render(UnsupportedComponent.create(context, cause = MISSING_COMPONENT_RENDERER))
            .also { Log.e(TAG, "Cannot find component renderer for ${context.type}") }
}

@Composable
@Suppress("unchecked_cast")
private fun <C : Component> ComponentRenderer<*>.Render(component: C) {
    (this as ComponentRenderer<C>).runCatching { component.Render() }
        .onFailure { Log.e(TAG, "Component rendering failed: $component", it) }
}

/**
 * Allows to add provide custom renderers for built-in rendering.
 */
@Composable
fun ProvideRenderers(
    customRenderers: Map<ComponentType, ComponentRenderer<*>>,
    content: @Composable () -> Unit
) {
    val renderers = Components.DefaultRenderers + customRenderers
    CompositionLocalProvider(LocalRenderers provides renderers, content)
}
