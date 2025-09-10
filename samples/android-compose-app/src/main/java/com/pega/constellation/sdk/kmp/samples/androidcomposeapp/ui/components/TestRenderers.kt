package com.pega.constellation.sdk.kmp.samples.androidcomposeapp.ui.components

import android.R.attr.label
import androidx.compose.foundation.layout.Box
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.testTag
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.fields.IntegerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.ComponentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.Render
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.IntegerRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.TextInputRenderer

abstract class TestRenderer : ComponentRenderer<Component> {

}

class TestTextInputRenderer : ComponentRenderer<TextInputComponent> {
    private var index = 1

    @Composable
    override fun TextInputComponent.Render() {
        TextInputRenderer().apply {
            Box(modifier = Modifier.testTag("${this@Render::class.java}_${label}_$index")) {
                this@Render.Render()
            }
        }
    }
}

class TestIntegerRenderer : ComponentRenderer<IntegerComponent> {
    @Composable
    override fun IntegerComponent.Render() {
        IntegerRenderer().apply { this@Render.TestRender() }
    }
}

var testIndex = 1

@Composable
fun <C : Component> C.TestRender() {
    Box(modifier = Modifier.testTag("${this@TestRender::class.java}_${label}")) {
        this@TestRender.Render()
    }
}
