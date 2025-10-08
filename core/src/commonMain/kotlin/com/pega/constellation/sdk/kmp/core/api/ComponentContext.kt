package com.pega.constellation.sdk.kmp.core.api


/**
 * Represents the context of a component.
 *
 * @property id The unique identifier of the component.
 * @property type The type of the component.
 * @property componentManager The manager responsible for handling component-related operations.
 */
interface ComponentContext {
    val id: ComponentId
    val type: ComponentType
    val componentManager: ComponentManager

    /**
     * Sends an event to the SDK engine related to the component.
     * @param event The event to be sent.
     */
    fun sendComponentEvent(event: ComponentEvent)
}

class ComponentContextImpl(
    override val id: ComponentId,
    override val type: ComponentType,
    override val componentManager: ComponentManager,
    val onComponentEvent: (ComponentEvent) -> Unit = {},
) : ComponentContext {
    override fun sendComponentEvent(event: ComponentEvent) = onComponentEvent(event)
}
