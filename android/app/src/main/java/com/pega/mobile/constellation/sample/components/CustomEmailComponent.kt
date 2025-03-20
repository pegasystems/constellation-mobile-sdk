/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.constellation.sample.components

import androidx.compose.foundation.layout.Column
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.fields.EmailViewModel
import com.pega.mobile.constellation.sdk.components.fields.FieldComponent
import com.pega.mobile.dxcomponents.compose.controls.form.Email
import org.json.JSONObject

class CustomEmailComponent(context: ComponentContext) : FieldComponent(context) {
    override val viewModel = EmailViewModel()

    override fun onUpdate(props: JSONObject) {
        super.onUpdate(props)
        viewModel.placeholder = props.getString("placeholder")
    }
}


class CustomEmailRenderer : ComponentRenderer<EmailViewModel> {
    @Composable
    override fun Render(viewModel: EmailViewModel) {
        with(viewModel) {
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
                    onValueChange = { value = it },
                    onFocusChange = { focused = it }
                )
            }
        }
    }
}
