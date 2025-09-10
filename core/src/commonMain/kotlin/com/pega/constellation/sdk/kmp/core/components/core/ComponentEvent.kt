package com.pega.constellation.sdk.kmp.core.components.core

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.JsonPrimitive

/**
 * Data for event sent to javascript.
 *
 * @param type - event type. Supported by default components are: 'FieldChange', 'FieldChangeWithFocus'.
 * Other types can be supported for custom components added by user.
 * @param componentData - component data like 'value'
 * @param eventData - data of event. e.g.: for 'FieldChangeWithFocus' we should add 'focused' with value
 */
data class ComponentEvent(
    val type: String,
    val componentData: Map<String, String> = emptyMap(),
    val eventData: Map<String, String> = emptyMap()
) {
    fun encodeToJsonString() =
        JsonObject(
            mapOf(
                "type" to JsonPrimitive(type),
                "componentData" to JsonObject(componentData.map { (key, value) ->
                    key to JsonPrimitive(
                        value
                    )
                }.toMap()),
                "eventData" to JsonObject(eventData.map { (key, value) -> key to JsonPrimitive(value) }
                    .toMap())
            )
        ).toString()

    companion object {
        fun forFieldChange(value: String) =
            ComponentEvent(FIELD_CHANGE, mapOf("value" to value))

        fun forFieldChangeWithFocus(value: String, focused: Boolean) =
            ComponentEvent(
                FIELD_CHANGE_WITH_FOCUS,
                mapOf("value" to value),
                mapOf("focused" to focused.toString())
            )

        fun forActionButtonClick(buttonType: String, jsAction: String) =
            ComponentEvent(
                ACTION_BUTTON_CLICK,
                mapOf(
                    "buttonType" to buttonType,
                    "jsAction" to jsAction
                )
            )

        private const val FIELD_CHANGE = "FieldChange"
        private const val FIELD_CHANGE_WITH_FOCUS = "FieldChangeWithFocus"
        private const val ACTION_BUTTON_CLICK = "ActionButtonClick"
    }
}
