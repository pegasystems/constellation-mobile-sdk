package com.pega.constellation.sdk.kmp.samples.desktopcmpapp

import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.api.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import com.pega.constellation.sdk.kmp.samples.basecmpapp.App
import kotlinx.serialization.json.JsonObjectBuilder
import kotlinx.serialization.json.add
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray

fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "constellation-multiplatform-sdk",
    ) {
        App(ConstellationSdkEngineBuilderImpl())
    }
}


class ConstellationSdkEngineBuilderImpl() : ConstellationSdkEngineBuilder {
    override fun build(config: ConstellationSdkConfig, handler: EngineEventHandler) =
        MockConstellationSdkEngine(config, handler)
}


class MockConstellationSdkEngine(
    private val config: ConstellationSdkConfig,
    private val handler: EngineEventHandler
) : ConstellationSdkEngine {
    override fun load(caseClassName: String, startingFields: Map<String, Any>) {
        handler.handle(EngineEvent.Loading)

        // add some components manually
        addComponent(10, ComponentTypes.TextInput) {
            put("label", "First Name")
            put("value", "")
        }
        addComponent(11, ComponentTypes.TextInput) {
            put("label", "Last Name")
            put("value", "")
        }
        addComponent(12, ComponentTypes.Email) {
            put("label", "Email")
            put("value", "")
            put("required", "true")
        }
        addComponent(13, ComponentTypes.TextArea) {
            put("label", "Notes")
            put("value", "")
        }
        addComponent(2, ComponentTypes.ViewContainer) {
            putJsonArray("children") {
                add(10) // First Name
                add(11) // Last Name
                add(12) // Email
                add(13) // Notes
            }
        }
        addComponent(1, ComponentTypes.RootContainer) {
            put("viewContainer", "2")
            putJsonArray("httpMessages") {}
        }

        handler.handle(EngineEvent.Ready)
    }

    private fun addComponent(id: Int, type: ComponentType, props: JsonObjectBuilder.() -> Unit) {
        with(config.componentManager) {
            addComponent(ComponentContextImpl(ComponentId(id), type, this))
            updateComponent(ComponentId(id), buildJsonObject(props))
        }
    }

}

