package com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers

import androidx.compose.foundation.border
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
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


class SimpleTableManualRenderer : ComponentRenderer<SimpleTableManualComponent> {
    @Composable
    override fun SimpleTableManualComponent.Render() {
        WithVisibility(visible) {
            Column {
                if (label.isNotEmpty()) { // TODO: handle show label?
                    Heading(label, Modifier.padding(vertical = 8.dp), fontSize = 16.sp)
                }
                when (displayMode) {
                    DISPLAY_ONLY -> {
                        rows.forEachIndexed { i, row ->
                            row.RenderReadOnlyCells(i, columnNames)
                        }
                    }

                    EDITABLE_IN_MODAL -> {
                        rows.forEachIndexed { i, row ->
                            row.RenderReadOnlyCells(i, columnNames)
                        }
                    }

                    EDITABLE_IN_ROW -> {
                        rows.forEachIndexed { i, row ->
                            Row(modifier = Modifier.horizontalScroll(rememberScrollState())) {
                                row.cells.forEachIndexed { cellId, cell ->
                                    Column {
                                        if (i == 0) {
                                            Text(columnNames[cellId])
                                        }
                                        cell.component.Render()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    }
}

@Composable
fun SimpleTableManualComponent.Row.RenderReadOnlyCells(rowId: Int, columnNames: List<String>) {
    Row(modifier = Modifier.horizontalScroll(rememberScrollState())) {
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