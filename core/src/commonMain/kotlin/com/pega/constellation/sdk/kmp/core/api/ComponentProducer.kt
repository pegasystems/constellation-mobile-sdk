package com.pega.constellation.sdk.kmp.core.api

/**
 * Functional interface for producing components based on their context.
 */
fun interface ComponentProducer {
    /**
     * Produces a component given its context.
     *
     * @param context The context of the component to be produced.
     * @return The produced component.
     */
    fun produce(context: ComponentContext): Component
}
