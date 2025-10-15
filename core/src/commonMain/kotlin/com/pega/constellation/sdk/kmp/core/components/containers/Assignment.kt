package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import kotlinx.serialization.json.JsonObject

class AssignmentComponent(context: ComponentContext) : ContainerComponent(context) {
    var loading: Boolean by mutableStateOf(true)
        private set

    @CallSuper
    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        loading = props.getBoolean("loading")
    }
}
