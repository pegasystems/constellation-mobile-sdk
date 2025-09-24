package com.pega.constellation.sdk.kmp.core.engine

import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.api.ComponentType

class WKWebViewEngineComponentContext(
    override val id: ComponentId,
    override val type: ComponentType,
    override val componentManager: ComponentManager,
    val updateHandler: (String) -> Unit
) : ComponentContext {
    override fun sendComponentEvent(event: ComponentEvent) {
        updateHandler(event.encodeToJsonString())
    }
}