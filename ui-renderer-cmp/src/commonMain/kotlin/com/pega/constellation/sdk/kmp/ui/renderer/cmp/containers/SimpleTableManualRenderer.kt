package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import EditableTable
import EditableTableAddRowButton
import EditableTableRow
import androidx.compose.runtime.Composable
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility

class SimpleTableManualRenderer : ComponentRenderer<SimpleTableManualComponent> {
    @Composable
    override fun SimpleTableManualComponent.Render() {
        WithVisibility(visible) {
            EditableTable(
                label = label,
                columns = columnNames,
                rows = rows.mapIndexed { rowId, row ->
                    EditableTableRow(
                        onEditButtonClick = if (row.showEditButton) { { editRowInModal(rowId) } } else null,
                        onDeleteButtonClick = if (row.showDeleteButton) { { deleteRow(rowId) } } else null,
                        cells = row.cells.map { { it.component.Render() } }
                    )
                },
                addRowButton = if (allowAddRows) {
                    EditableTableAddRowButton(
                        label = addButtonLabel,
                        onClick = { addRow() }
                    )
                } else {
                    null
                }
            )
        }
    }
}