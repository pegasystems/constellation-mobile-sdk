package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent.SelectionMode
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Table
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableItem
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableSelectionMode
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer

class ListViewRenderer : ComponentRenderer<ListViewComponent> {
    @Composable
    override fun ListViewComponent.Render() {
        val selectedItems = items.filter { it.selected }
        Table(
            label = label,
            selectionMode = selectionMode.toTableSelectionMode(),
            columns = columnNames,
            columnsLabels = columnLabels,
            items = items.map { TableItem(it.data) },
            selectedItem = selectedItems.map { TableItem(it.data) },
            onItemClick = { id, selected ->
                onItemClick(id, selected)
            }
        )
    }

    private fun SelectionMode.toTableSelectionMode() = when (this) {
        SelectionMode.SINGLE -> TableSelectionMode.SINGLE
        SelectionMode.MULTI -> TableSelectionMode.MULTI
    }
}
