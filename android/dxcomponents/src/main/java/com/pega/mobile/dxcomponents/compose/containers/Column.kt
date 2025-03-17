/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.dxcomponents.compose.containers

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.pega.mobile.dxcomponents.compose.controls.form.Button

@Composable
fun Column(
    modifier: Modifier = Modifier,
    itemsContent: @Composable ColumnScope.() -> Unit
) {
    Column(
        modifier = modifier,
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Top
    ) {
        itemsContent()
    }
}

@Preview(showBackground = true)
@Composable
fun ColumnPreview() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        itemsContent = {
            Button(title = "Cancel")
            Button(title = "Fill from with AI")
            Button(title = "Save for later")
        })
}

