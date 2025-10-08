package com.pega.constellation.sdk.kmp.core.internal

import com.pega.constellation.sdk.kmp.core.api.ComponentObservable
import com.pega.constellation.sdk.kmp.core.api.ComponentObserver

internal class ComponentObservableDelegate : ComponentObservable {
    private val observers = mutableSetOf<ComponentObserver>()

    override fun addObserver(observer: ComponentObserver) {
        observers.add(observer)
    }

    override fun removeObserver(observer: ComponentObserver) {
        observers.remove(observer)
    }

    override fun notifyObservers() {
        observers.forEach { it.onUpdated() }
    }
}
