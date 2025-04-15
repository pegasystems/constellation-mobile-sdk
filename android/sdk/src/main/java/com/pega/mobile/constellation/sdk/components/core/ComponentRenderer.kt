package com.pega.mobile.constellation.sdk.components.core

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import com.pega.mobile.constellation.sdk.components.Components

private val LocalRenderers = compositionLocalOf { Components.DefaultRenderers }

/**
 * Allows to render components using Jetpack Compose.
 *
 * @see [com.pega.mobile.constellation.sdk.components.Components.DefaultRenderers]
 */
interface ComponentRenderer<out C : Component> {
    @Composable
    fun Render(component: @UnsafeVariance C)
}

/**
 * Helper extension method to render any component.
 * It uses map of renderers stored in [LocalRenderers], which can be modified with [ProvideRenderers].
 */
@Composable
fun Component.Render() {
    LocalRenderers.current[context.type]?.Render(this)
        ?: error("Cannot find component renderer for type ${context.type}")
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
