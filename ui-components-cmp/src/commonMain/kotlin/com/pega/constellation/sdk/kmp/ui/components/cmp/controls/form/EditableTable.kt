import androidx.compose.foundation.background
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import com.pega.constellation.sdk.kmp.ui.components.cmp.controls.common.Heading
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.Res
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.icon_edit_48
import com.pega.constellation.sdk.kmp.ui_components_cmp.generated.resources.outline_delete_48
import io.github.windedge.table.DataTable
import org.jetbrains.compose.resources.painterResource

data class EditableTableRow (
    val onEditButtonClick: (() -> Unit)?,
    val onDeleteButtonClick: (() -> Unit)?,
    val cells: List<@Composable () -> Unit>
)

data class EditableTableAddRowButton(
    val label: String,
    val onClick: () -> Unit
)

@Composable
fun EditableTable(
    label: String,
    columns: List<String>,
    rows: List<EditableTableRow>,
    addRowButton: EditableTableAddRowButton?,
) {
    Column {
        Heading(label)
        Spacer(Modifier.height(8.dp))
        val focusManager = LocalFocusManager.current
        val haveEditColumn = rows.any { it.onEditButtonClick != null }
        val haveDeleteColumn = rows.any { it.onDeleteButtonClick != null }

        DataTable(
            modifier = Modifier.horizontalScroll(rememberScrollState()),
            columns = {
                headerBackground { TableHeaderBackground() }
                if (haveEditColumn) {
                    column { } // for edit button
                }
                if (haveDeleteColumn) {
                    column {  } // for delete button
                }
                columns.forEach { column { Text(it.uppercase(), fontWeight = FontWeight.Bold) } }
            }
        ) {
            rows.forEachIndexed { rowId, rowObject ->
                row {
                    if (haveEditColumn) {
                        cell {
                            if (rowObject.onEditButtonClick != null) {
                                IconButton(onClick = {
                                    focusManager.clearFocus()
                                    rowObject.onEditButtonClick()
                                }) {
                                    Icon(
                                        painterResource(Res.drawable.icon_edit_48),
                                        "Delete item ${rowId + 1}",
                                        Modifier.size(24.dp)
                                    )
                                }
                            }
                        }
                    }
                    if (haveDeleteColumn) {
                        cell {
                            if (rowObject.onDeleteButtonClick != null) {
                                IconButton(onClick = {
                                    focusManager.clearFocus()
                                    rowObject.onDeleteButtonClick()
                                }) {
                                    Icon(
                                        painterResource(Res.drawable.outline_delete_48),
                                        "Delete item ${rowId + 1}",
                                        Modifier.size(24.dp)
                                    )
                                }
                            }
                        }
                    }
                    rowObject.cells.forEach { composableCell ->
                        cell {
                            composableCell()
                        }
                    }
                }
            }
        }
        if (addRowButton != null) {
            val focusManager = LocalFocusManager.current
            OutlinedButton(
                onClick = {
                    focusManager.clearFocus()
                    addRowButton.onClick()
                }, modifier = Modifier.fillMaxWidth()
            ) {
                Text(addRowButton.label)
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