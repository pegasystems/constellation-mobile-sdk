package com.pega.mobile.constellation.sdk.components.widgets

import android.util.Log
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import com.pega.mobile.constellation.sdk.components.core.BaseComponent
import com.pega.mobile.constellation.sdk.components.core.ComponentContext
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentViewModel
import com.pega.mobile.dxcomponents.compose.controls.form.Unsupported
import org.json.JSONObject

class UnsupportedNativeComponent(componentType: String, context: ComponentContext) :
    BaseComponent(context) {
    override val viewModel = UnsupportedNativeViewModel(componentType)

    override fun onUpdate(props: JSONObject) {}
}

class UnsupportedNativeViewModel(initialState: String) : ComponentViewModel {
    var componentType by mutableStateOf(initialState)
}

class UnsupportedNativeRenderer : ComponentRenderer<UnsupportedNativeViewModel> {
    @Composable
    override fun Render(viewModel: UnsupportedNativeViewModel) {
        Log.w("UnsupportedNativeComponent", "Component unsupported - not implemented in Native code.")
        Unsupported("Missing native component for '${viewModel.componentType}'")
    }
}
