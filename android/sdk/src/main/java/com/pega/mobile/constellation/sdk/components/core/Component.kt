package com.pega.mobile.constellation.sdk.components.core

import org.json.JSONObject

interface Component {
    val context: ComponentContext
    val state: ComponentState

    fun onUpdate(props: JSONObject)
}

abstract class BaseComponent(override val context: ComponentContext) : Component {
    override fun toString() = with(context) { "$type$id" }
}
