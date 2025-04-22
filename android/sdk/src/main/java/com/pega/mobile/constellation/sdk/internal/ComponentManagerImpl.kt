package com.pega.mobile.constellation.sdk.internal

import android.util.Log
import com.pega.mobile.constellation.sdk.components.Components.DefaultDefinitions
import com.pega.mobile.constellation.sdk.components.core.Component
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentDefinition
import com.pega.mobile.constellation.sdk.components.core.ComponentId
import com.pega.mobile.constellation.sdk.components.core.ComponentManager
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_DEFINITION
import org.json.JSONObject

internal class ComponentManagerImpl(
    private val customDefinitions: List<ComponentDefinition>
) : ComponentManager {
    private val components = mutableMapOf<ComponentId, Component>()
    private val definitions = (DefaultDefinitions + customDefinitions).associateBy { it.type }

    override fun getComponentDefinitions() = customDefinitions

    override fun addComponent(context: ComponentContext) =
        produceComponent(context).also { components[context.id] = it }

    override fun getComponent(id: ComponentId) =
        components[id] ?: Log.w(TAG, "Cannot find component $id").let { null }

    override fun getComponents(ids: List<ComponentId>) =
        ids.mapNotNull { getComponent(it) }

    override fun updateComponent(id: ComponentId, props: JSONObject) {
        val component = getComponent(id)
        runCatching { component?.onUpdate(props) }
            .onFailure { Log.e(TAG, "Failure during component update: $component") }
    }

    override fun removeComponent(id: ComponentId) {
        components.remove(id)
    }

    private fun produceComponent(context: ComponentContext): Component =
        definitions[context.type]?.producer?.produce(context)
            ?: UnsupportedComponent.create(context, cause = MISSING_COMPONENT_DEFINITION)
                .also { Log.w(TAG, "Cannot find component definition for ${context.type}") }

    companion object {
        private const val TAG = "ComponentManager"

        @Suppress("unchecked_cast")
        fun <T : Component> ComponentManager.getComponentTyped(id: ComponentId) =
            getComponent(id) as? T
    }
}
