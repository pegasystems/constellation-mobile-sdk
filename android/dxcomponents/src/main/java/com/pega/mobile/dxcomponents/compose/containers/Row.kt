/*
 * Copyright © 2024 and Confidential to Pegasystems Inc. All rights reserved.
 */

package com.pega.mobile.dxcomponents.compose.containers

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.RowScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.pega.mobile.dxcomponents.compose.controls.form.Button

@Composable
fun Row(
    modifier: Modifier = Modifier,
    itemsContent: @Composable RowScope.() -> Unit
) {
    Row(
        modifier = modifier,
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.Center,
    ) {
        itemsContent()
    }
}

@Preview(showBackground = true)
@Composable
fun RowPreview() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        itemsContent = {
            Button(
                title = "Cancel",
                modifier = Modifier.weight(1f)
            )
            Button(
                title = "Fill from with AI",
                modifier = Modifier.weight(1f)
            )
            Button(
                title = "Save for later",
                modifier = Modifier.weight(1f)
            )
        })
}