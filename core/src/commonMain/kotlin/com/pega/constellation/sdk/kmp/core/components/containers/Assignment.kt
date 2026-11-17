package com.pega.constellation.sdk.kmp.core.components.containers

import androidx.annotation.CallSuper
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.constellation.sdk.kmp.core.api.ComponentContext
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.components.getBoolean
import com.pega.constellation.sdk.kmp.core.components.optString
import kotlinx.serialization.json.JsonObject

class AssignmentComponent(context: ComponentContext) : ContainerComponent(context) {
    var loading: Boolean by mutableStateOf(true)
        private set
    /**
     * Pega assignment/work item identifier used by assignment actions.
     *
     * It is typically composed by the JS layer as `{contextName}/{containerName}`.
     */
    var itemKey: String by mutableStateOf("")
        private set

    @CallSuper
    override fun applyProps(props: JsonObject) {
        super.applyProps(props)
        loading = props.getBoolean("loading")
        itemKey = props.optString("itemKey")
    }

    /**
     * Navigates the current assignment to the requested step.
     *
     * Pass `"previous"` to perform the same back-navigation used by the built-in secondary button.
     * In typical consumer usage, [itemKey] does not need to be provided manually.
     */
    fun navigateToStep(stepId: String, itemKey: String = this.itemKey) {
        context.sendComponentEvent(
            ComponentEvent(
                type = ASSIGNMENT_EVENT,
                eventData = mapOf(
                    EVENT_TYPE_KEY to NAVIGATE_TO_STEP,
                    STEP_ID_KEY to stepId,
                    ITEM_KEY to itemKey
                )
            )
        )
    }

    private companion object {
        private const val ASSIGNMENT_EVENT = "AssignmentEvent"
        private const val EVENT_TYPE_KEY = "type"
        private const val NAVIGATE_TO_STEP = "navigateToStep"
        private const val STEP_ID_KEY = "stepId"
        private const val ITEM_KEY = "itemKey"
    }
}
