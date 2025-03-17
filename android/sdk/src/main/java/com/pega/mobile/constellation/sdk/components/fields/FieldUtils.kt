package com.pega.mobile.constellation.sdk.components.fields

import com.pega.mobile.constellation.sdk.viewmodel.BaseFieldState
import org.json.JSONObject

fun JSONObject.toBaseFieldState(): BaseFieldState {
    return BaseFieldState(
        value = getString("value"),
        label = getString("label"),
        visible = getString("visible").toBoolean(),
        required = getString("required").toBoolean(),
        disabled = getString("disabled").toBoolean(),
        readOnly = getString("readOnly").toBoolean(),
        helperText = getString("helperText"),
        validateMessage = getString("validateMessage")
    )
}