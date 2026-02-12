package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.unit.sp

@Composable
fun FieldValue(label: String, value: String) {
    FieldValue(label, AnnotatedString(value))
}

@Composable
fun FieldValue(label: String, value: AnnotatedString) {
    Column(modifier = Modifier.fillMaxWidth()) {
        if (label.trim().isNotEmpty()) {
            Text(label, fontSize = 14.sp, color = Color.Gray)
        }
        val annotated = if (value.trim().isNotEmpty()) value else AnnotatedString("---")
        Text(annotated, fontSize = 14.sp)
    }
}
