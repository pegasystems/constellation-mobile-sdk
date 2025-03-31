package com.pega.mobile.constellation.sdk.components.fields

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.dxcomponents.compose.controls.form.Date
import org.json.JSONObject
import java.time.LocalDate

class DateComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = DateViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
    }
}

class DateViewModel : FieldViewModel() {
    var placeholder: String by mutableStateOf("")
}

class DateRenderer : ComponentRenderer<DateViewModel> {
    @Composable
    override fun Render(viewModel: DateViewModel) {
        WithVisibility(viewModel) {
            val localDate = value.asLocalDateOrNull()
            Date(
                value = localDate,
                label = label,
                helperText = helperText,
                validateMessage = validateMessage,
                placeholder = placeholder,
                required = required,
                disabled = disabled,
                readOnly = readOnly,
                onValueChange = { value = it?.toString() ?: "" },
                onFocusChange = { focused = it }
            )
        }
    }

    private fun String.asLocalDateOrNull() = takeIf { isNotEmpty() }
        ?.runCatching { LocalDate.parse(this) }
        ?.onFailure { Log.e(TAG, "Unable to parse value as date", it) }
        ?.getOrNull()

    companion object {
        private const val TAG = "DateRenderer"
    }
}