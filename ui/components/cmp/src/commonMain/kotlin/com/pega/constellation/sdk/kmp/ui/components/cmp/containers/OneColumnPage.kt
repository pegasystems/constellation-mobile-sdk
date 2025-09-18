package com.pega.constellation.sdk.kmp.ui.components.cmp.containers

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyListScope
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Switch
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TextInput
import org.jetbrains.compose.ui.tooling.preview.Preview

@Composable
fun OneColumnPage(
    modifier: Modifier = Modifier,
    content: LazyListScope.() -> Unit
) {
    LazyColumn(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(8.dp),
        content = content
    )
}

@Preview
@Composable
fun OneColumnPagePreview() {
    var textValue by remember { mutableStateOf("John Doe") }
    var switchValue by remember { mutableStateOf(false) }

    OneColumnPage(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        content = {
            item {
                TextInput(
                    value = textValue,
                    label = "name",
                    helperText = "Write your name",
                    onValueChange = { textValue = it },
                )
            }
            item {
                TextInput(
                    value = textValue,
                    label = "surname",
                    helperText = "Write your surname",
                    onValueChange = { textValue = it },
                )
            }
            item {
                Switch(
                    value = switchValue,
                    caption = "adult",
                    onValueChange = { switchValue = it }
                )
            }
            item {
                Switch(
                    value = switchValue,
                    caption = "employed",
                    onValueChange = { switchValue = it }
                )
            }
        }
    )
}
