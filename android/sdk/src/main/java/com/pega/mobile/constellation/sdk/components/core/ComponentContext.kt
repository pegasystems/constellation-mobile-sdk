package com.pega.mobile.constellation.sdk.components.core

import kotlinx.coroutines.CoroutineScope

interface ComponentContext {
    val id: ComponentId
    val type: ComponentType
    val scope: CoroutineScope
    val componentManager: ComponentManager

    fun sendComponentEvent(event: ComponentEvent)
}

internal class ComponentContextImpl(
    override val id: ComponentId,
    override val type: ComponentType,
    override val scope: CoroutineScope,
    override val componentManager: ComponentManager,
    val onComponentEvent: (ComponentEvent) -> Unit,
) : ComponentContext {
    override fun sendComponentEvent(event: ComponentEvent) = onComponentEvent(event)
}