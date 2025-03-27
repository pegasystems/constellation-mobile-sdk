package com.pega.mobile.constellation.sdk.components.core

interface ComponentContext {
    val id: ComponentId
    val type: ComponentType
    val componentManager: ComponentManager
}

internal class ComponentContextImpl(
    override val id: ComponentId,
    override val type: ComponentType,
    override val componentManager: ComponentManager
) : ComponentContext