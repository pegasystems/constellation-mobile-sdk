package com.pega.constellation.sdk.kmp.core.components.core

import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl
import kotlinx.serialization.json.JsonObject


/**
 * Manages components within the system, providing methods to retrieve, add, update, and remove components.
 */
interface ComponentManager {
    /**
     * Retrieves all component definitions.
     * @return A list of component definitions.
     */
    fun getComponentDefinitions(): List<ComponentDefinition>

    /**
     * Retrieves a component by its unique identifier.
     *
     * @param id The unique identifier of the component.
     * @return The component associated with the given identifier, or null if not found.
     */
    fun getComponent(id: ComponentId): Component?

    /**
     * Retrieves multiple components by their unique identifiers.
     *
     * @param ids A list of unique identifiers for the components.
     * @return A list of components associated with the given identifiers.
     */
    fun getComponents(ids: List<ComponentId>): List<Component>

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
    fun updateComponent(id: ComponentId, props: String)

    /**
     * Removes a component from the system.
     * @param id The unique identifier of the component to be removed.
     */
    fun removeComponent(id: ComponentId)

    /**
     * Retrieves the alert component responsible for natively showing JS alerts and dialogs.
     *
     * @return The alert component instance.
     */
    fun getAlertComponent(): AlertComponent

    companion object {
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
