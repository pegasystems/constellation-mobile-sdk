package com.pega.constellation.sdk.kmp.core.api

/**
 * Observable interface that allows to register listeners to be notified on component updates.
 */
interface ComponentObservable {
    /**
     * Adds an observer that will be notified when the component is updated.
     */
    fun addObserver(observer: ComponentObserver)

    /**
     * Removes previously added component observer.
     */
    fun removeObserver(observer: ComponentObserver)

    /**
     * Notifies all registered observers about an update.
     */
    fun notifyObservers()
}