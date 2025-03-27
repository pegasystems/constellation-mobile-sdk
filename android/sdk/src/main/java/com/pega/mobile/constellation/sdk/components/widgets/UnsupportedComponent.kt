package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Unsupported
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentContextImpl
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentState
import com.pega.mobile.constellation.sdk.components.core.ComponentType
import com.pega.mobile.constellation.sdk.components.core.ComponentViewModel
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedState.MissingJsComponent
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedState.MissingNativeComponent
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONObject

class UnsupportedComponent private constructor(
    context: ComponentContext,
    initialState: UnsupportedState
) : BaseComponent(context) {
    override val viewModel = UnsupportedViewModel(initialState)

    override fun onUpdate(props: JSONObject) {
        viewModel.state = MissingJsComponent(
            type = ComponentType(props.getString("type"))
        )
    }

    companion object {
        fun create(context: ComponentContext) = UnsupportedComponent(
            context = ComponentContextImpl(context.id, Unsupported, context.componentManager),
            initialState = MissingNativeComponent(context.type)
        )
    }
}

class UnsupportedViewModel(initialState: UnsupportedState) : ComponentViewModel {
    var state by mutableStateOf(initialState)
}

sealed class UnsupportedState(val type: ComponentType) : ComponentState {
    class MissingJsComponent(type: ComponentType) : UnsupportedState(type)
    class MissingNativeComponent(type: ComponentType) : UnsupportedState(type)
}

class UnsupportedRenderer : ComponentRenderer<UnsupportedViewModel> {
    @Composable
    override fun Render(viewModel: UnsupportedViewModel) {
        with(viewModel.state) {
            when (this) {
                is MissingJsComponent -> {
                    Log.w(TAG, "Component unsupported - not implemented in JS side.")
                    Unsupported("Unsupported component '$type'")
                }

                is MissingNativeComponent -> {
                    Log.w(TAG, "Component unsupported - not implemented in Native side.")
                    Unsupported("Missing native component for '$type'")
                }
            }
        }
    }

    companion object {
        private const val TAG = "UnsupportedRenderer"
    }
}

