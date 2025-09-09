package com.pega.constellation.sdk.kmp.core.components.core

import kotlin.jvm.JvmInline


/**
 * Represents a unique identifier for a component.
 *
 * @property id The integer value of the component's identifier.
 */
@JvmInline
value class ComponentId(val id: Int) {
    override fun toString() = "#$id"
}

