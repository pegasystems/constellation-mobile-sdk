package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun FieldValue(
    label: String,
    value: String,
    valueFontSize: TextUnit = 14.sp,
    valueFontWeight: FontWeight = FontWeight.Normal
) {
    FieldValue(label, AnnotatedString(value), valueFontSize, valueFontWeight)
}

@Composable
fun FieldValue(
    label: String,
    value: AnnotatedString,
    valueFontSize: TextUnit = 14.sp,
    valueFontWeight: FontWeight = FontWeight.Normal
) {
    Column(modifier = Modifier.padding(bottom = 8.dp)) {
        if (label.trim().isNotEmpty()) {
            Text(label, color = Color.Gray)
        }
        val annotated = if (value.trim().isNotEmpty()) value else AnnotatedString("---")
        Text(annotated, fontSize = valueFontSize, fontWeight = valueFontWeight)
    }
}
