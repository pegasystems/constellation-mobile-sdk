package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent.SelectionMode
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.Table
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableItem
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableSelectionMode
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer

class ListViewRenderer : ComponentRenderer<ListViewComponent> {
    @Composable
    override fun ListViewComponent.Render() {
        val selectedItem = selectedItemIndex?.let { items.getOrNull(it) }
        Table(
            label = label,
            selectionMode = selectionMode.toTableSelectionMode(),
            columns = columnNames,
            columnsLabels = columnLabels,
            items = items.map { TableItem(it.data) },
            selectedItem = selectedItem?.let { TableItem(it.data) },
            onItemClick = {
                setValueToAutoSubmit(it)
                onItemSelected(it)
            }
        )
        LaunchedEffect(updateIndex) {
            checkAutoSubmit()
        }
    }

    private fun SelectionMode.toTableSelectionMode() = when (this) {
        SelectionMode.SINGLE -> TableSelectionMode.SINGLE
        SelectionMode.MULTI -> TableSelectionMode.MULTI
    }
}
