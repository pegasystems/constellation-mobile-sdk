package com.pega.mobile.constellation.sdk.components.core

import com.pega.mobile.constellation.sdk.internal.ComponentManagerImpl
import org.json.JSONObject

interface ComponentManager {
    fun getComponentDefinitions(): List<ComponentDefinition>
    fun getComponent(id: ComponentId): Component?
    fun getComponents(ids: List<ComponentId>): List<Component>
    fun addComponent(context: ComponentContext): Component
    fun updateComponent(id: ComponentId, props: JSONObject)
    fun removeComponent(id: ComponentId)

    companion object {
        fun create(
            customDefinitions: List<ComponentDefinition> = emptyList()
        ): ComponentManager = ComponentManagerImpl(customDefinitions)
    }
}
