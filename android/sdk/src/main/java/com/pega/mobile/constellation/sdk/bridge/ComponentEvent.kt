package com.pega.mobile.constellation.sdk.bridge

import org.json.JSONObject

/**
 * Data for event sent to javascript
 *
 * @param type - event type. Supported by default components are: 'FieldChange', 'FieldChangeWithFocus'.
 * Other types can be supported for custom components added by user.
 * @param componentData - component data like 'value'
 * @param eventData - data of event. e.g.: for 'FieldChangeWithFocus' we should add 'focused' with value
 */
data class ComponentEvent(
    val type: String,
    val componentData: Map<String, String>,
    val eventData: Map<String, String> = emptyMap()
) {
    fun toJson() =
        JSONObject().apply {
            put("type", type)
            put("componentData", JSONObject(componentData))
            put("eventData", JSONObject(eventData))
        }

    companion object {
        fun changeValueComponentEvent(value: String) =
            ComponentEvent(FIELD_CHANGE, mapOf("value" to value))

        fun changeValueWithFocusComponentEvent(value: String, focused: Boolean) =
            ComponentEvent(
                FIELD_CHANGE_WITH_FOCUS,
                mapOf("value" to value),
                mapOf("focused" to focused.toString())
            )
        fun actionButtonClick(buttonType: String, jsAction: String) =
            ComponentEvent(
                ACTION_BUTTON_CLICK,
                mapOf(
                    "buttonType" to buttonType,
                    "jsAction" to jsAction
                )
            )

        const val FIELD_CHANGE = "FieldChange"
        const val FIELD_CHANGE_WITH_FOCUS = "FieldChangeWithFocus"
        const val ACTION_BUTTON_CLICK = "ActionButtonClick"
    }
}