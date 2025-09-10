package com.pega.constellation.sdk.kmp.core.api

import kotlin.jvm.JvmInline


/**
 * Represents the type of a component.
 *
 * @property type The string value of the component's type.
 * @see [com.pega.constellation.sdk.kmp.core.components.ComponentRegistry]
 */
@JvmInline
value class ComponentType(val type: String) {
    override fun toString() = type
}
