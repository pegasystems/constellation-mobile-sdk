package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.sp

@Composable
fun FieldValue(label: String, value: String) {
    Column(modifier = Modifier.fillMaxWidth()) {
        if (label.trim().isNotEmpty()) {
            Text(label, fontSize = 14.sp, color = Color.Gray)
        }
        Text(value.ifEmpty { "---" }, fontSize = 14.sp)
    }
}
