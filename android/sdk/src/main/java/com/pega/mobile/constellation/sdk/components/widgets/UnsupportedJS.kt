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

class UnsupportedJsComponent(context: ComponentContext) : BaseComponent(context) {
    override val viewModel = UnsupportedJsViewModel()

    override fun onUpdate(props: JSONObject) {
        viewModel.componentType = props.getString("type")
    }
}

class UnsupportedJsViewModel : ComponentViewModel {
    var componentType by mutableStateOf("")
}

class UnsupportedJsRenderer : ComponentRenderer<UnsupportedJsViewModel> {
    @Composable
    override fun Render(viewModel: UnsupportedJsViewModel) {
        Log.w("UnsupportedJSComponent", "Component unsupported - not implemented in JavaScript code.")
        Unsupported("Unsupported component '${viewModel.componentType}'")
    }
}
