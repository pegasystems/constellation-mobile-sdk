package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import EditableTable
import EditableTableAddRowButton
import EditableTableRow
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import com.pega.constellation.sdk.kmp.core.Log
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent.DisplayMode
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
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
                        onEditButtonClick = if (row.showEditButton) {
                            { editRowInModal(rowId) }
                        } else null,
                        onDeleteButtonClick = if (row.showDeleteButton) {
                            { deleteRow(rowId) }
                        } else null,
                        cells = row.cells.map {
                            {
                                val testTag = (it.component as? FieldComponent)?.pConnectPropertyReference ?: ""
                                Box(modifier = Modifier.testTag(testTag)) {
                                    it.component.Render()
                                }
                            }
                        }
                    )
                },
                addRowButton = if (allowAddRows) {
                    EditableTableAddRowButton(
                        label = addButtonLabel,
                        onClick = {
                            when (displayMode) {
                                DisplayMode.EDITABLE_IN_ROW -> addRow()
                                DisplayMode.EDITABLE_IN_MODAL -> addRowInModal()
                                else -> Log.e(TAG, "Can not add row in $displayMode mode")
                            }
                        }
                    )
                } else {
                    null
                },
                onReorder = if (allowReorderRows) {
                    { from, to -> reorderRow(from, to) }
                } else {
                    null
                }
            )
        }
    }

    companion object {
        private const val TAG = "SimpleTableManualRenderer"
    }
}