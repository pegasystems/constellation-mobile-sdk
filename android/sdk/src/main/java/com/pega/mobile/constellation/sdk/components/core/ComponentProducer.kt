package com.pega.mobile.constellation.sdk.components.core

fun interface ComponentProducer {
    fun produce(context: ComponentContext): Component
}
