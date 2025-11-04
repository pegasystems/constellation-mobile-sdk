package com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form

import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.toggleable
import androidx.compose.material3.Checkbox
import androidx.compose.material3.RadioButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
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
    items: List<TableItem>,
    selectedItem: TableItem?,
    onItemClick: (Int) -> Unit
) {
    Column {
        Heading(label)
        Spacer(Modifier.height(8.dp))

        DataTable(
            modifier = Modifier.horizontalScroll(rememberScrollState()),
            columns = {
                headerBackground { Box(Modifier.background(Color.Black.copy(alpha = 0.1f))) }
                column {}
                columns.forEach { column { Text(it) } }
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