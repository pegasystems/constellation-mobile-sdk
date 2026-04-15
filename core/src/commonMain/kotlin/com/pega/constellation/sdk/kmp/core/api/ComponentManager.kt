package com.pega.constellation.sdk.kmp.core.api

import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl
import kotlinx.serialization.json.JsonObject

/**
 * Manages components within the system, providing methods to retrieve, add, update, and remove components.
 */
interface ComponentManager {

    /**
     * Finds and returns the root container component.
     */
    val rootContainerComponent: RootContainerComponent?
        get() = getComponent(ROOT_CONTAINER_ID) as? RootContainerComponent

    /**
     * Retrieves all custom components and component overrides definitions.
     * @return A list of custom component definitions.
     */
    fun getCustomComponentDefinitions(): List<ComponentDefinition>

    /**
     * Retrieves a component by its unique identifier.
     *
     * @param id The unique identifier of the component.
     * @return The component associated with the given identifier, or null if not found.
     */
    fun getComponent(id: ComponentId): Component?

    /**
     * Retrieves all components.
     *
     * @return A list of all components.
     */
    fun getComponents(): List<Component>

    /**
     * Retrieves multiple components by their unique identifiers.
     *
     * @param ids A list of unique identifiers for the components.
     * @return A list of components associated with the given identifiers.
     */
    fun getComponents(ids: List<ComponentId>): List<Component>

    /**
     * Retrieves a component by its unique identifier and sets its [ComponentContext.parentId]
     * to [parentId].
     *
     * @param id The unique identifier of the child component.
     * @param parentId The identifier of the parent component.
     * @return The component associated with [id] with [ComponentContext.parentId] set, or null if not found.
     */
    fun setComponentParentAndGet(id: ComponentId, parentId: ComponentId): Component?

    /**
     * Retrieves multiple components by their unique identifiers and sets each component's
     * [ComponentContext.parentId] to [parentId].
     *
     * @param ids A list of unique identifiers for the child components.
     * @param parentId The identifier of the parent component.
     * @return A list of components associated with the given identifiers with [ComponentContext.parentId] set.
     */
    fun setComponentsParentAndGet(ids: List<ComponentId>, parentId: ComponentId): List<Component>

    /**
     * Adds a new component.
     *
     * @param context The context of the component to be added.
     * @return The newly added component.
     */
    fun addComponent(context: ComponentContext): Component

    /**
     * Updates the properties of an existing component.
     *
     * @param id The unique identifier of the component to be updated.
     * @param props The new properties to be applied to the component.
     */
    fun updateComponent(id: ComponentId, props: JsonObject)

    /**
     * Removes a component from the system.
     * @param id The unique identifier of the component to be removed.
     */
    fun removeComponent(id: ComponentId)

    companion object {
        /**
         * Root container component ID.
         */
        val ROOT_CONTAINER_ID = ComponentId(1)

        /**
         * Retrieves a child component by its unique identifier, sets its [ComponentContext.parentId]
         * to [parentId], and casts it to [T]. Returns null if not found or if cast fails.
         */
        @Suppress("UNCHECKED_CAST")
        fun <T : Component> ComponentManager.setComponentParentAndGetTyped(id: ComponentId, parentId: ComponentId) =
            setComponentParentAndGet(id, parentId) as? T

        /**
         * Creates a new instance of `ComponentManager` with optional custom component definitions.
         *
         * @param customDefinitions A list of custom component definitions. Defaults to an empty list.
         * @return A new instance of `ComponentManager`.
         */
        fun create(
            customDefinitions: List<ComponentDefinition> = emptyList()
        ): ComponentManager = ComponentManagerImpl(customDefinitions)
    }
}
