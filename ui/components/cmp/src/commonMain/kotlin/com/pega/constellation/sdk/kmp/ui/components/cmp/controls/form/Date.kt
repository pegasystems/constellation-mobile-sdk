package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Icon
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.DatePickerModal
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.Input
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.utils.interceptInteractionSource
import constellation_mobile_sdk.ui.components.cmp.generated.resources.Res
import constellation_mobile_sdk.ui.components.cmp.generated.resources.icon_calendar_range
import kotlinx.datetime.LocalDate
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun Date(
    value: LocalDate?,
    label: String,
    modifier: Modifier = Modifier,
    helperText: String = "",
    validateMessage: String = "",
    hideLabel: Boolean = false,
    placeholder: String = "",
    required: Boolean = false,
    disabled: Boolean = false,
    readOnly: Boolean = false,
    onValueChange: (LocalDate?) -> Unit = {},
    onFocusChange: (Boolean) -> Unit = {}
) {
    val focusManager = LocalFocusManager.current
    var showDialog by remember { mutableStateOf(false) }
    if (showDialog) {
        DatePickerModal(
            value = value,
            onDateSelected = {
                onValueChange(it)
                focusManager.clearFocus()
                showDialog = false
            },
            onDismiss = {
                focusManager.clearFocus()
                showDialog = false
            }
        )
    }

    Input(
        value = value?.toString().orEmpty(),
        label = label,
        modifier = modifier,
        helperText = helperText,
        validateMessage = validateMessage,
        hideLabel = hideLabel,
        placeholder = placeholder,
        required = required,
        disabled = disabled,
        readOnly = readOnly,
        onValueChange = {},
        onFocusChange = onFocusChange,
        trailingIcon = { Icon(painterResource(Res.drawable.icon_calendar_range), "Select date") },
        interactionSource = interceptInteractionSource(disabled, readOnly) { showDialog = true }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreview() {
    var value: LocalDate? by remember { mutableStateOf(null) }

    Date(
        modifier = Modifier.padding(8.dp),
        value = value,
        label = "Birth date",
        helperText = "select date of birth",
        onValueChange = { value = it }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewDisabled() {
    Date(
        value = LocalDate.parse("2020-10-10"),
        label = "Birth date",
        disabled = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewReadOnly() {
    Date(
        value = LocalDate.parse("1980-01-01"),
        label = "Birth date",
        readOnly = true,
        onValueChange = { error("unexpected") }
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewRequired() {
    Date(
        value = LocalDate.parse("2024-09-27"),
        label = "Birth date",
        required = true
    )
}

@Preview(showBackground = true)
@Composable
fun DatePreviewValidateMessage() {
    Date(
        value = LocalDate.parse("2024-09-27"),
        label = "Birth date",
        validateMessage = "Some error!",
        helperText = "select date of birth"
    )
}

