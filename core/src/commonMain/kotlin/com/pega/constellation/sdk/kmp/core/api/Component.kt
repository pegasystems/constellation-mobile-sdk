package com.pega.constellation.sdk.kmp.core.api

import com.pega.constellation.sdk.kmp.core.internal.ComponentObservableDelegate
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject

/**
 * Represents a UI component.
 */
interface Component : ComponentObservable {
    /**
     * The context in which this component is operating. Provided by [ComponentProducer].
     */
    val context: ComponentContext

    /**
     * Called by [ComponentManager] when the component needs to update its properties.
     * @param props The new properties for the component in JSON format.
     */
    fun onUpdate(props: JsonObject)
}

/**
 * Base component class.
 */
abstract class BaseComponent(
    override val context: ComponentContext
) : Component, ComponentObservable by ComponentObservableDelegate() {

    protected abstract fun applyProps(props: JsonObject)

    override fun onUpdate(props: JsonObject) {
        applyProps(props)
        notifyObservers()
    }

    override fun toString() = with(context) { "$type$id" }

    protected fun <T> JsonArray.mapWithIndex(transform: JsonArray.(Int) -> T) =
        List(size) { this.transform(it) }
}
