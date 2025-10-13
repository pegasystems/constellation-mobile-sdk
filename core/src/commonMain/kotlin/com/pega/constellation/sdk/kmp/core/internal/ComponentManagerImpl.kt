package com.pega.constellation.sdk.kmp.core.internal

import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentDefinition
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.components.ComponentRegistry.DefaultDefinitions
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RootContainer
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.Dialog
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent.Cause.MISSING_COMPONENT_DEFINITION
import kotlinx.serialization.json.JsonObject

internal class ComponentManagerImpl(
    private val customDefinitions: List<ComponentDefinition>
) : ComponentManager {
    private val components = mutableMapOf<ComponentId, Component>()
    private val definitions = (DefaultDefinitions + customDefinitions).associateBy { it.type }
    private var rootContainer: RootContainerComponent? = null

    override fun getCustomComponentDefinitions() = customDefinitions

    override fun addComponent(context: ComponentContext): Component =
        produceComponent(context).also {
            component -> components[context.id] = component
            if (context.type == RootContainer)
                rootContainer = component as RootContainerComponent
        }

    override fun getComponent(id: ComponentId) =
        components[id] ?: Log.w(TAG, "Cannot find component $id").let { null }

    override fun getComponents(ids: List<ComponentId>) =
        ids.mapNotNull { getComponent(it) }

    override fun updateComponent(id: ComponentId, props: JsonObject) {
        val component = getComponent(id)
        runCatching { component?.onUpdate(props) }
            .onFailure {
                Log.e(TAG, "Failure during component update: $component, (message: ${it.message})")
            }
    }

    override fun removeComponent(id: ComponentId) {
        components.remove(id)
    }

    override fun presentDialog(config: Dialog.Config) {
        rootContainer?.presentDialog(config) ?: Log.w(TAG, "No RootContainer to present dialog")
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
