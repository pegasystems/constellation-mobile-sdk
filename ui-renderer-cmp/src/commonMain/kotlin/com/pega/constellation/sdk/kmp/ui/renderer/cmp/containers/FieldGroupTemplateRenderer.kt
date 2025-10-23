package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.size
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.FieldGroupTemplateComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.no_items
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.icon_empty_list_48
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.outline_delete_48
import org.jetbrains.compose.resources.painterResource
import org.jetbrains.compose.resources.stringResource

class FieldGroupTemplateRenderer : ComponentRenderer<FieldGroupTemplateComponent> {
    @Composable
    override fun FieldGroupTemplateComponent.Render() {
        val focusManager = LocalFocusManager.current
        Column(modifier = Modifier.fillMaxWidth()) {
            items.forEachIndexed { index, item ->
                Column {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.SpaceBetween,
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(item.heading, fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        if (item.allowDelete) {
                            IconButton(onClick = {
                                focusManager.clearFocus()
                                deleteItem(item)
                            }) {
                                Icon(
                                    painterResource(Res.drawable.outline_delete_48),
                                    "Delete item ${index + 1}",
                                    Modifier.size(24.dp)
                                )
                            }
                        }
                    }
                    item.component.Render()
                }
            }
            if (items.isEmpty()) {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    verticalArrangement = Arrangement.SpaceBetween,
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Spacer(modifier = Modifier.size(32.dp))
                    Icon(
                        painterResource(Res.drawable.icon_empty_list_48),
                        "No items",
                        Modifier.size(48.dp)
                    )
                    Text(stringResource(Res.string.no_items))
                    Spacer(modifier = Modifier.size(32.dp))
                }
            }
            if (allowAddItems) {
                OutlinedButton(
                    onClick = {
                        focusManager.clearFocus()
                        addItem()
                    }, modifier = Modifier.fillMaxWidth()
                ) {
                    Text(addButtonLabel)
                }
            }
        }
    }
}
