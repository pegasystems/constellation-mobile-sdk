/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.ui.screens

import android.content.Context
import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.mobile.constellation.sample.components.CustomEmailComponent
import com.pega.mobile.constellation.sample.components.CustomEmailViewModel
import com.pega.mobile.constellation.sample.components.CustomSliderComponent
import com.pega.mobile.constellation.sample.components.CustomSliderViewModel
import com.pega.mobile.constellation.sdk.ConstellationMobileSDK
import com.pega.mobile.constellation.sdk.FormResult
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.fields.CheckboxComponent
import com.pega.mobile.constellation.sdk.renderer.Render
import com.pega.mobile.constellation.sdk.viewmodel.CheckboxViewModel
import com.pega.mobile.dxcomponents.compose.controls.form.Checkbox
import com.pega.mobile.dxcomponents.compose.controls.form.Email

@Composable
fun MainScreen(sdk: ConstellationMobileSDK) {
    var showPega by remember { mutableStateOf(false) }
    val context = LocalContext.current
    if (showPega) {
        val rootViewComponent = sdk.createCase {
            handleResult(context, it)
            showPega = false
        }
        PegaScreen(rootViewComponent as RootContainerComponent)
    } else {
        CreateCaseScreen { showPega = true }
    }
}

private fun handleResult(context: Context, result: FormResult) {
    when (result) {
        is FormResult.Finished ->
            Toast.makeText(context, result.successMessage, Toast.LENGTH_SHORT).show()

        is FormResult.Cancelled ->
            Toast.makeText(context, "Form cancelled", Toast.LENGTH_SHORT).show()
    }
}

@Composable
fun PegaScreen(rootComponent: RootContainerComponent) {
    Column {
        rootComponent.Render(
            customViews = mapOf(
                CustomEmailComponent::class to { CustomEmail(it as CustomEmailViewModel) },
                CheckboxComponent::class to { CustomCheckbox(it as CheckboxViewModel) },
                CustomSliderComponent::class to { CustomSlider(it as CustomSliderViewModel) },
            )
        )
    }
}

@Composable
fun CustomEmail(viewModel: CustomEmailViewModel) {
    val emailState = viewModel.state.observeAsState()
    emailState.value?.run {
        Column {
            Text("CustomEmailComponent")
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
}

@Composable
fun CustomCheckbox(viewModel: CheckboxViewModel) {
    Column {
        Text("Custom checkbox")
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
}

@Composable
fun CreateCaseScreen(onClick: () -> Unit = {}) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .padding(top = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        Text(
            "Pega Constellation Mobile SDK",
            fontSize = 20.sp,
            textAlign = TextAlign.Center
        )
        Spacer(modifier = Modifier.height(32.dp))
        Button(onClick = onClick) {
            Text("Create a new Case")
        }
    }
}
