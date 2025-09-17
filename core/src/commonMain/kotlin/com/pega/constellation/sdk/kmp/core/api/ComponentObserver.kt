package com.pega.constellation.sdk.kmp.core.api

/**
 * Functional interface for observing component updates.
 */
fun interface ComponentObserver {
    /**
     * Called after the component is updated.
     */
    fun onUpdated()
}
