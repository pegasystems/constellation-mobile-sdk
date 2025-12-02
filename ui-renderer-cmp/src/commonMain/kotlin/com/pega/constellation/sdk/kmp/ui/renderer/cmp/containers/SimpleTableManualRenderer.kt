package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.FocusManager
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent.DisplayMode.EDITABLE_IN_MODAL
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent.DisplayMode.EDITABLE_IN_ROW
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent.DisplayMode.DISPLAY_ONLY
import com.pega.constellation.sdk.kmp.core.components.fields.DropdownComponent
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.helpers.WithVisibility
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.icon_arrow_up_48
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.icon_arrow_down_48
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.icon_edit_48
import com.pega.constellation.sdk.kmp.ui_renderer_cmp.generated.resources.outline_delete_48
import org.jetbrains.compose.resources.painterResource

// TODO: This is just draft of renderer for testing purposes
class SimpleTableManualRenderer : ComponentRenderer<SimpleTableManualComponent> {
    @Composable
    override fun SimpleTableManualComponent.Render() {
        WithVisibility(visible) {
            Column(modifier = Modifier.horizontalScroll(rememberScrollState())) {
                if (label.isNotEmpty()) { // TODO: handle show label?
                    Heading(label, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
                }
                when (displayMode) {
                    DISPLAY_ONLY -> {
                        rows.forEachIndexed { i, row ->
                            row.RenderReadOnlyCells(
                                rowId = i,
                                maxRowId = rows.size - 1,
                                columnNames = columnNames,
                                showEditButton = row.showEditButton,
                                showDeleteButton = row.showDeleteButton,
                                showReorderButtons = allowReorderRows,
                                onEditClick = {},
                                onDeleteClick = {},
                                onReorderClick = {}
                            )
                        }
                    }

                    EDITABLE_IN_MODAL -> {
                        rows.forEachIndexed { i, row ->
                            row.RenderReadOnlyCells(
                                rowId = i,
                                maxRowId = rows.size - 1,
                                columnNames = columnNames,
                                showEditButton = row.showEditButton,
                                showDeleteButton = row.showDeleteButton,
                                showReorderButtons = allowReorderRows,
                                onEditClick = { editRowInModal(i) },
                                onDeleteClick = { deleteRow(i) },
                                onReorderClick = {
                                    val toIndex = when (it) {
                                        ReorderDirection.UP -> i - 1
                                        ReorderDirection.DOWN -> i + 1
                                    }
                                    reorderRow(i, toIndex)
                                }
                            )
                        }
                        if (allowAddRows) {
                            val focusManager = LocalFocusManager.current
                            OutlinedButton(
                                onClick = {
                                    focusManager.clearFocus()
                                    addRowInModal()
                                }, modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(addButtonLabel)
                            }
                        }
                    }

                    EDITABLE_IN_ROW -> {
                        rows.forEachIndexed { i, row ->
                            row.RenderEditableCells(
                                rowId = i,
                                maxRowId = rows.size - 1,
                                columnNames = columnNames,
                                showDeleteButton = row.showDeleteButton,
                                showReorderButtons = allowReorderRows,
                                onDeleteClick = { deleteRow(i) },
                                onReorderClick = {
                                    val toIndex = when (it) {
                                        ReorderDirection.UP -> i - 1
                                        ReorderDirection.DOWN -> i + 1
                                    }
                                    reorderRow(i, toIndex)
                                })
                        }
                        if (allowAddRows) {
                            val focusManager = LocalFocusManager.current
                            OutlinedButton(
                                onClick = {
                                    focusManager.clearFocus()
                                    addRow()
                                }, modifier = Modifier.fillMaxWidth()
                            ) {
                                Text(addButtonLabel)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun SimpleTableManualComponent.Row.RenderReadOnlyCells(
    rowId: Int,
    maxRowId: Int,
    columnNames: List<String>,
    showEditButton: Boolean,
    showDeleteButton: Boolean,
    showReorderButtons: Boolean,
    onDeleteClick: () -> Unit,
    onEditClick: () -> Unit,
    onReorderClick: (ReorderDirection) -> Unit
) {
    Row {
        val focusManager = LocalFocusManager.current
        if (showEditButton) {
            IconButton(onClick = {
                focusManager.clearFocus()
                onEditClick()
            }) {
                Icon(
                    painterResource(Res.drawable.icon_edit_48),
                    "Delete item ${rowId + 1}",
                    Modifier.size(24.dp)
                )
            }
        }
        if (showDeleteButton) {
            IconButton(onClick = {
                focusManager.clearFocus()
                onDeleteClick()
            }) {
                Icon(
                    painterResource(Res.drawable.outline_delete_48),
                    "Delete item ${rowId + 1}",
                    Modifier.size(24.dp)
                )
            }
        }
        if (showReorderButtons) {
            ReorderingButtons(focusManager, rowId, maxRowId) { onReorderClick(it) }
        }
        cells.forEachIndexed { cellId, cell ->
            Column {
                if (rowId == 0) {
                    Text(columnNames[cellId])
                }
                (cell.component as? FieldComponent)?.let { component ->
                    val text = if (component is DropdownComponent) {
                        component.options.firstOrNull { it.key == component.value }?.label ?: ""
                    } else {
                        component.value
                    }
                    Text(
                        text,
                        modifier = Modifier.padding(4.dp)
                    )
                }
            }

        }
    }
}

@Composable
fun SimpleTableManualComponent.Row.RenderEditableCells(
    rowId: Int,
    maxRowId: Int,
    columnNames: List<String>,
    showDeleteButton: Boolean,
    showReorderButtons: Boolean,
    onDeleteClick: () -> Unit,
    onReorderClick: (ReorderDirection) -> Unit
) {
    Row {
        val focusManager = LocalFocusManager.current
        if (showDeleteButton) {
            IconButton(onClick = {
                focusManager.clearFocus()
                onDeleteClick()
            }) {
                Icon(
                    painterResource(Res.drawable.outline_delete_48),
                    "Delete item ${rowId + 1}",
                    Modifier.size(24.dp)
                )
            }
        }
        if (showReorderButtons) {
            ReorderingButtons(focusManager, rowId, maxRowId) { onReorderClick(it) }
        }
        cells.forEachIndexed { cellId, cell ->
            Column {
                if (rowId == 0) {
                    Text(columnNames[cellId])
                }
                cell.component.Render()
            }
        }
    }
}

@Composable
fun ReorderingButtons(
    focusManager: FocusManager,
    rowId: Int,
    maxRowId: Int,
    onReorderClick: (ReorderDirection) -> Unit
) {
    Column {
        if (rowId > 0) {
            IconButton(onClick = {
                focusManager.clearFocus()
                onReorderClick(ReorderDirection.UP)
            }) {
                Icon(
                    painterResource(Res.drawable.icon_arrow_up_48),
                    "Reorder up item ${rowId + 1}",
                    Modifier.size(24.dp)
                )
            }
        }
        if (rowId < maxRowId)
            IconButton(onClick = {
                focusManager.clearFocus()
                onReorderClick(ReorderDirection.DOWN)
            }) {
                Icon(
                    painterResource(Res.drawable.icon_arrow_down_48),
                    "Reorder down item ${rowId + 1}",
                    Modifier.size(24.dp)
                )
            }
    }
}


enum class ReorderDirection {
    UP, DOWN
}