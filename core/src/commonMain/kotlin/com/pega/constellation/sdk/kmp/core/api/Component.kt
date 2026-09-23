package com.pega.constellation.sdk.kmp.core.api

import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.components.optString
import com.pega.constellation.sdk.kmp.core.internal.ComponentManagerImpl.Companion.getComponentTyped
import com.pega.constellation.sdk.kmp.core.internal.ComponentObservableDelegate
import kotlinx.serialization.json.JsonArray
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject

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


    /**
     * The fully qualified property reference for the current component, including its page context.
     */
    var pConnectPropertyReference: String by mutableStateOf("")
        private set

    /**
     * The alternate design-system configuration resolved for this component.
     *
     * This server-provided configuration is exposed as JSON for renderers to interpret. It is
     * `null` when no alternate design system is configured, including after a later update
     * removes the configuration.
     */
    var configAlternateDesignSystem: JsonObject? by mutableStateOf(null)
        private set

    /**
     * The identifier of this component's parent, or `null` for the root component.
     *
     * The component manager assigns this value when the parent adopts the component. Use
     * [getParent] to retrieve the parent component.
     */
    var parentId: ComponentId? by mutableStateOf(null)
        private set

    protected abstract fun applyProps(props: JsonObject)

    override fun onUpdate(props: JsonObject) {
        pConnectPropertyReference = props.optString("pConnectPropertyReference")
        configAlternateDesignSystem = props["configAlternateDesignSystem"]?.jsonObject

        applyProps(props)
        notifyObservers()
    }

    override fun toString() = with(context) { "$type$id${parentId?.let { "(parent=$it)" } ?: ""}" }

    fun getParent() = parentId?.let { context.componentManager.getComponent(it) }

    internal fun adoptChildAndGet(childId: ComponentId) =
        context.componentManager.getComponentTyped<BaseComponent>(childId)?.also {
            it.parentId = context.id
        }

    protected fun <T> JsonArray.mapWithIndex(transform: JsonArray.(Int) -> T) =
        List(size) { this.transform(it) }
}

interface HideableComponent {
    val visible: Boolean
}
