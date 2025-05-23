package com.pega.mobile.dxcomponents.compose.containers

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
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.compose.controls.form.Switch
import com.pega.mobile.dxcomponents.compose.controls.form.TextInput

@Composable
fun OneColumnPage(
    modifier: Modifier = Modifier,
    itemsContent: LazyListScope.() -> Unit
) {
    LazyColumn(
        modifier = modifier,
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        itemsContent()
    }
}

@Preview(showBackground = true)
@Composable
fun OneColumnPagePreview() {
    var textValue by remember { mutableStateOf("John Doe") }
    var switchValue by remember { mutableStateOf(false) }

    OneColumnPage(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        itemsContent = {
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
        })
}
