package com.pega.mobile.constellation.sdk.components.core

import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.compositionLocalOf
import com.pega.mobile.constellation.sdk.components.Components

private val LocalRenderers = compositionLocalOf { Components.DefaultRenderers }

/**
 * Allows to render components using Jetpack Compose.
 */
interface ComponentRenderer<out C : Component> {
    @Composable
    fun Render(component: @UnsafeVariance C)
}

@Composable
fun Component.Render() {
    LocalRenderers.current[context.type]?.Render(this)
        ?: error("Cannot find component renderer for type ${context.type}")
}

@Composable
fun ProvideRenderers(
    customRenderers: Map<ComponentType, ComponentRenderer<*>>,
    content: @Composable () -> Unit
) {
    val renderers = Components.DefaultRenderers + customRenderers
    CompositionLocalProvider(LocalRenderers provides renderers, content)
}
