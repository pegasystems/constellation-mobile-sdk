package com.pega.mobile.constellation.sdk.components.core

import kotlinx.coroutines.CoroutineScope


/**
 * Represents the context of a component.
 *
 * @property id The unique identifier of the component.
 * @property type The type of the component.
 * @property scope The coroutine scope associated with the component.
 * @property componentManager The manager responsible for handling component-related operations.
 */
interface ComponentContext {
    val id: ComponentId
    val type: ComponentType
    val scope: CoroutineScope
    val componentManager: ComponentManager


    /**
     * Sends an event to the SDK engine related to the component.
     * @param event The event to be sent.
     */
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