package com.pega.mobile.constellation.sdk.renderer

import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.core.text.HtmlCompat
import androidx.core.text.HtmlCompat.FROM_HTML_MODE_COMPACT
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentComponent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormComponent
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.RegionComponent
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewContainerComponent
import com.pega.mobile.constellation.sdk.viewmodel.FieldViewModel
import com.pega.mobile.dxcomponents.compose.containers.Column
import com.pega.mobile.dxcomponents.compose.containers.Row
import com.pega.mobile.dxcomponents.compose.controls.form.Button
import kotlin.reflect.KClass

@Composable
fun RootContainerComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        Column {
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun ViewContainerComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        Column {
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun ViewComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        if (!state.visible) return@let
        Column(modifier = Modifier.padding(top = 8.dp, bottom = 8.dp)) {
            if (state.showLabel && state.label.isNotEmpty()) {
                Text(
                    text = state.label,
                    textAlign = TextAlign.Left,
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(top = 8.dp, bottom = 8.dp),
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold
                )
            }
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun RegionComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        Column {
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun FlowContainerComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        Column(modifier = Modifier.padding(top = 16.dp)) {
            Text(
                text = state.title,
                modifier = Modifier.fillMaxWidth().padding(start = 16.dp, top = 16.dp),
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Left
            )
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun DefaultFormComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        if (state.instructions.isNotEmpty()) {
            val rawText =
                HtmlCompat.fromHtml(state.instructions, FROM_HTML_MODE_COMPACT)
                    .toString()
                    .trim('\n')
            Text(text = rawText, textAlign = TextAlign.Left, modifier = Modifier.fillMaxWidth())
        }

        Column {
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun AssignmentComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        Column {
            state.children.forEach { field ->
                RenderComponent(field, customViews)
            }
        }
    }
}

@Composable
fun AssignmentCardComponent.Render(
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit> = emptyMap()
) {
    viewModel.state.observeAsState().value?.let { state ->
        Column(modifier = Modifier.padding(16.dp)) {
            LazyColumn(modifier = Modifier.weight(1f)) {
                items(state.children) { field ->
                    RenderComponent(field, customViews)
                }
            }
            state.actionButtons.viewModel.state.observeAsState().value?.let { buttonState ->
                Row(modifier = Modifier.fillMaxWidth()) {
                    buttonState.primaryButtons.forEach {
                        Button(title = it.name.trimEnd(), modifier = Modifier.weight(1f)) {
                            state.actionButtons.viewModel.click(it)
                        }
                    }
                }
                Row(modifier = Modifier.fillMaxWidth()) {
                    buttonState.secondaryButtons.forEach {
                        Button(
                            title = it.name,
                            modifier = Modifier.weight(1f),
                            colors = ButtonDefaults.buttonColors(
                                containerColor = Color.Gray,
                                contentColor = Color.White
                            )
                        ) {
                            state.actionButtons.viewModel.click(it)
                        }
                    }
                }
            }
        }
    }
}
