package com.pega.mobile.constellation.sdk.renderer

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.livedata.observeAsState
import com.pega.mobile.constellation.sdk.bridge.ComponentsManager
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentComponent
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormComponent
import com.pega.mobile.constellation.sdk.components.containers.FieldComponent
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.RegionComponent
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewContainerComponent
import com.pega.mobile.constellation.sdk.components.fields.CheckboxComponent
import com.pega.mobile.constellation.sdk.components.fields.EmailComponent
import com.pega.mobile.constellation.sdk.components.fields.TextAreaComponent
import com.pega.mobile.constellation.sdk.components.fields.TextInputComponent
import com.pega.mobile.constellation.sdk.components.fields.UrlComponent
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent
import com.pega.mobile.constellation.sdk.viewmodel.FieldViewModel
import com.pega.mobile.constellation.sdk.viewmodel.UnsupportedState
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONArray
import kotlin.reflect.KClass

private const val TAG = "RenderComponent"

@Composable
fun RenderComponent(
    component: Component,
    customViews: Map<KClass<out FieldComponent>, @Composable (FieldViewModel) -> Unit>
) {
    (component as? FieldComponent)?.viewModel?.state?.let {
        if (it.observeAsState().value?.visible == false) {
            return
        }
    }
    customViews[component::class]?.invoke((component as FieldComponent).viewModel)
        ?: when (component) {
            is TextInputComponent -> {
                component.Render()
            }

            is EmailComponent -> {
                component.Render()
            }

            is CheckboxComponent -> {
                component.Render()
            }

            is TextAreaComponent -> {
                component.Render()
            }

            is UrlComponent -> {
                component.Render()
            }

            is ViewComponent -> {
                component.Render(customViews)
            }

            is DefaultFormComponent -> {
                component.Render(customViews)
            }

            is RegionComponent -> {
                component.Render(customViews)
            }

            is AssignmentCardComponent -> {
                component.Render(customViews)
            }

            is AssignmentComponent -> {
                component.Render(customViews)
            }

            is FlowContainerComponent -> {
                component.Render(customViews)
            }

            is ViewContainerComponent -> {
                component.Render(customViews)
            }

            is RootContainerComponent -> {
                component.Render(customViews)
            }

            is UnsupportedComponent -> {
                component.Render()
            }

            else -> {
                Log.e(TAG, "Component type unknown - should never happen.")
            }
        }
}

@Composable
private fun UnsupportedComponent.Render() {
    val state = this.viewModel.state.observeAsState()
    state.value?.run {
        when (this) {
            is UnsupportedState.MissingJsComponent -> {
                Log.w(TAG, "Component unsupported - not implemented in JS side.")
                Unsupported("Unsupported component '$componentType'")
            }

            is UnsupportedState.MissingNativeComponent -> {
                Log.w(TAG, "Component unsupported - not implemented in Native side.")
                Unsupported("Missing native component for '$componentType'")
            }
        }
    }
}

fun JSONArray.toComponentsList(): List<Component> {
    val children = mutableListOf<Int>()
    for (i in 0..<this.length()) {
        children.add((this[i] as String).toInt())
    }
    return children.mapNotNull { ComponentsManager.getComponent(it) }
}