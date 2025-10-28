package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.material3.Checkbox
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer

class ListViewRenderer : ComponentRenderer<ListViewComponent> {
    @Composable
    override fun ListViewComponent.Render() {
        selectedItemId?.let { itemId ->
            val selectedItem = items.firstOrNull { it.data[itemId.name] == itemId.value }
            ListView(label, selectionMode, columnNames, items, selectedItem, ::selectItem)
        }
    }
}

@Composable
fun ListView(
    label: String,
    selectionMode: ListViewComponent.SelectionMode,
    columnNames: List<String>,
    items: List<ListViewComponent.Item>,
    selectedItem: ListViewComponent.Item?,
    onItemClick: (ListViewComponent.Item) -> Unit
) {
    Column {
        Text(
            text = label,
            modifier = Modifier.fillMaxWidth(),
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold,
            textAlign = TextAlign.Left
        )

        items.forEach { item ->
            Column {
                when (selectionMode) {
                    ListViewComponent.SelectionMode.SINGLE ->
                        RadioButton(
                            selected = item == selectedItem,
                            onClick = { onItemClick(item) })

                    ListViewComponent.SelectionMode.MULTI -> Checkbox(false, onCheckedChange = {})
                }
                columnNames.forEach { columnName ->
                    item.data[columnName]?.let {
                        Row {
                            Text(columnName, modifier = Modifier.weight(1f))
                            Text(it, modifier = Modifier.weight(1f))
                        }
                    }

                }
            }
        }
    }
}
