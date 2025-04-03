package com.pega.mobile.constellation.sdk.components.core

import kotlinx.coroutines.channels.BufferOverflow.DROP_OLDEST
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow

interface ComponentViewModel {
    val events: Flow<ComponentEvent>
}

abstract class BaseViewModel : ComponentViewModel {
    protected val _events = MutableEventFlow()
    override val events = _events.asSharedFlow()
}

@Suppress("FunctionName")
internal fun MutableEventFlow() = MutableSharedFlow<ComponentEvent>(
    extraBufferCapacity = 1,
    onBufferOverflow = DROP_OLDEST
)
