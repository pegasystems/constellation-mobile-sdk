package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.toggleable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Checkbox
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableSelectionMode.MULTI
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableSelectionMode.SINGLE
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.HelperText
import io.github.windedge.table.DataTable

enum class TableSelectionMode { SINGLE, MULTI }

/**
 * Represents a single row in a [Table].
 *
 * @param data A map of column names to their corresponding cell values.
 */
data class TableItem(
    val data: Map<String, String>
)

@Composable
fun Table(
    label: String,
    validateMessage: String,
    selectionMode: TableSelectionMode,
    columns: List<String>,
    columnsLabels: List<String>,
    items: List<TableItem>,
    selectedItem: List<TableItem>,
    required: Boolean,
    disabled: Boolean,
    onItemClick: (Int, Boolean) -> Unit
) {
    Column {
        Label(
            label = label,
            modifier = Modifier.padding(vertical = 8.dp),
            hideLabel = false,
            required = required,
            disabled = false,
            readOnly = false,
            fontSize = 20.sp,
            fontWeight = FontWeight.Bold
        )
        HelperText(
            text = "",
            modifier = Modifier.padding(bottom = 8.dp),
            validateMessage = validateMessage,
            disabled = disabled,
            readOnly = false
        )
        DataTable(
            modifier = Modifier.horizontalScroll(rememberScrollState()),
            columns = {
                headerBackground { TableHeaderBackground() }
                column {} // for selection control
                columnsLabels.forEach {
                    column {
                        Text(
                            it.uppercase(),
                            fontWeight = FontWeight.Bold
                        )
                    }
                }
            }
        ) {
            items.forEachIndexed { i, item ->
                val isChecked = selectedItem.contains(item)
                row(Modifier.toggleable(value = isChecked, enabled = !disabled) {
                    val selected = if (selectionMode == MULTI) !isChecked else true
                    onItemClick(i, selected)
                }) {
                    cell {
                        when (selectionMode) {
                            SINGLE -> RadioButton(
                                selected = isChecked,
                                onClick = { onItemClick(i, true) },
                                enabled = !disabled
                            )
                            MULTI -> Checkbox(
                                checked = isChecked,
                                onCheckedChange = { onItemClick(i, !isChecked) },
                                enabled = !disabled
                            )
                        }
                    }
                    columns.forEach { cell { Text(item.data[it].orEmpty()) } }
                }
            }
        }
    }
}

@Composable
private fun TableHeaderBackground() {
    Box(
        Modifier.background(
            color = Color.Black.copy(alpha = 0.1f),
            shape = RoundedCornerShape(8.dp)
        )
    )
}
