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
interface ComponentRenderer<C : Component> {
    @Composable
    fun C.Render()
}

/**
 * Helper extension method to render any component.
 * It uses map of renderers stored in [LocalRenderers], which can be customized with [ProvideRenderers].
 */
@Composable
@Suppress("unchecked_cast")
fun <T : Component> T.Render() {
    val component = this
    val renderers = LocalRenderers.current
    val renderer = renderers[context.type] as? ComponentRenderer<T>
    renderer?.run { component.Render() }
        ?: error("Cannot find renderer for type ${context.type}")
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
