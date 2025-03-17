package com.pega.mobile.constellation.sdk.renderer

import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.pega.mobile.constellation.sdk.components.fields.CheckboxComponent
import com.pega.mobile.constellation.sdk.components.fields.EmailComponent
import com.pega.mobile.constellation.sdk.components.fields.TextAreaComponent
import com.pega.mobile.constellation.sdk.components.fields.TextInputComponent
import com.pega.mobile.constellation.sdk.components.fields.UrlComponent
import com.pega.mobile.dxcomponents.compose.controls.form.Checkbox
import com.pega.mobile.dxcomponents.compose.controls.form.Email
import com.pega.mobile.dxcomponents.compose.controls.form.TextArea
import com.pega.mobile.dxcomponents.compose.controls.form.TextInput
import com.pega.mobile.dxcomponents.compose.controls.form.Url

@Composable
fun TextInputComponent.Render() {
    val textState = viewModel.state.observeAsState()
    textState.value?.run {
        TextInput(
            value = value,
            label = label,
            helperText = helperText,
            validateMessage = validateMessage,
            placeholder = placeholder,
            required = required,
            disabled = disabled,
            readOnly = readOnly,
            onValueChange = { viewModel.setValue(it) },
            onFocusChange = { viewModel.setFocus(it) }
        )
    }
}

@Composable
fun EmailComponent.Render() {
    val emailState = viewModel.state.observeAsState()
    emailState.value?.run {
        Email(
            value = value,
            label = label,
            helperText = helperText,
            validateMessage = validateMessage,
            placeholder = placeholder,
            required = required,
            disabled = disabled,
            readOnly = readOnly,
            onValueChange = { viewModel.setValue(it) },
            onFocusChange = { viewModel.setFocus(it) }
        )
    }
}

@Composable
fun CheckboxComponent.Render() {
    val checkboxState = viewModel.state.observeAsState()
    checkboxState.value?.run {
        Checkbox(
            value = value.toBoolean(),
            caption = caption,
            label = label,
            helperText = helperText,
            validateMessage = validateMessage,
            required = required,
            disabled = disabled,
            readOnly = readOnly,
            onValueChange = {
                viewModel.setValue(it.toString())
            }
        )
    }
}

@Composable
fun TextAreaComponent.Render() {
    val textAreaState = viewModel.state.observeAsState()
    textAreaState.value?.run {
        TextArea(
            value = value,
            label = label,
            helperText = helperText,
            validateMessage = validateMessage,
            placeholder = placeholder,
            required = required,
            disabled = disabled,
            readOnly = readOnly,
            onValueChange = { viewModel.setValue(it) },
            onFocusChange = { viewModel.setFocus(it) }
        )
    }
}

@Composable
fun UrlComponent.Render() {
    val urlState = viewModel.state.observeAsState()
    urlState.value?.run {
        Url(
            value = value,
            label = label,
            helperText = helperText,
            validateMessage = validateMessage,
            placeholder = placeholder,
            required = required,
            disabled = disabled,
            readOnly = readOnly,
            onValueChange = { viewModel.setValue(it) },
            onFocusChange = { viewModel.setFocus(it) }
        )
    }
}