package com.pega.mobile.constellation.sdk.components.core

import kotlinx.coroutines.channels.BufferOverflow.DROP_OLDEST
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow

interface ComponentViewModel

interface EventViewModel : ComponentViewModel {
    val events: Flow<ComponentEvent>
}

@Suppress("FunctionName")
internal fun MutableEventFlow() = MutableSharedFlow<ComponentEvent>(
    extraBufferCapacity = 1,
    onBufferOverflow = DROP_OLDEST
)
