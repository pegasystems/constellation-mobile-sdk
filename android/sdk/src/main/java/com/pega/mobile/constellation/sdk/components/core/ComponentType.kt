package com.pega.mobile.constellation.sdk.components.core


/**
 * Represents the type of a component.
 *
 * @property type The string value of the component's type.
 * @see [com.pega.mobile.constellation.sdk.components.Components]
 */
@JvmInline
value class ComponentType(val type: String) {
    override fun toString() = type
}
