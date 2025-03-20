package com.pega.mobile.constellation.sdk.components.core

@JvmInline
value class ComponentId(val id: Int) {
    override fun toString() = "#$id"
}

