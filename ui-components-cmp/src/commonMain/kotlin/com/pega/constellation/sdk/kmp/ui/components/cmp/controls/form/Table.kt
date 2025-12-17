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
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableSelectionMode.MULTI
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.TableSelectionMode.SINGLE
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
    selectionMode: TableSelectionMode,
    columns: List<String>,
    columnsLabels: List<String>,
    items: List<TableItem>,
    selectedItem: TableItem?,
    onItemClick: (Int) -> Unit
) {
    Column {
        Heading(label, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)

        DataTable(
            modifier = Modifier.horizontalScroll(rememberScrollState()),
            columns = {
                headerBackground { TableHeaderBackground() }
                column {} // for selection control
                columnsLabels.forEach { column { Text(it.uppercase(), fontWeight = FontWeight.Bold) } }
            }
        ) {
            items.forEachIndexed { i, item ->
                val checked = item == selectedItem
                row(Modifier.toggleable(checked) { onItemClick(i) }) {
                    cell {
                        when (selectionMode) {
                            SINGLE -> RadioButton(checked, onClick = { onItemClick(i) })
                            MULTI -> Checkbox(checked, onCheckedChange = { onItemClick(i) })
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
