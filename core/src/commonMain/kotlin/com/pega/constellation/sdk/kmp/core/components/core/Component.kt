package com.pega.constellation.sdk.kmp.core.components.core

import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * Represents a UI component.
 */
interface Component {
    /**
     * The context in which this component is operating. Provided by [ComponentProducer].
     */
    val context: ComponentContext

    /**
     * Called when the component needs to update its properties.
     * @param props The new properties for the component in JSON format.
     */
    fun onUpdate(props: JsonObject)
}

/**
 * Base component class.
 */
abstract class BaseComponent(override val context: ComponentContext) : Component {
    override fun toString() = with(context) { "$type$id" }

    protected fun <T> JsonArray.mapWithIndex(transform: JsonArray.(Int) -> T) =
        List(size) { this.transform(it) }
}
