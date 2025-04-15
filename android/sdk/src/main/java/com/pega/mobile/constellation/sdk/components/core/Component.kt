package com.pega.mobile.constellation.sdk.components.core

import org.json.JSONObject

/**
 * Represents a UI component.
 */
interface Component {
    /**
     * The context in which this component is operating. Provided by [ComponentProducer].
     */
    val context: ComponentContext

    /**
     * The current state of this component.
     */
    val state: ComponentState

    /**
     * Called when the component needs to update its properties.
     * @param props The new properties for the component in JSON format.
     */
    fun onUpdate(props: JSONObject)
}

/**
 * Base component class.
 */
abstract class BaseComponent(override val context: ComponentContext) : Component {
    override fun toString() = with(context) { "$type$id" }
}
