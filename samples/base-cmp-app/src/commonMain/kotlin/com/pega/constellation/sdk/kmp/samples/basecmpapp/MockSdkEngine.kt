package com.pega.constellation.sdk.kmp.samples.basecmpapp

import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilder
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.api.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import kotlinx.serialization.json.JsonObjectBuilder
import kotlinx.serialization.json.add
import kotlinx.serialization.json.addJsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray
import kotlin.random.Random

class MockSdkEngine(
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
        addComponent(4, ComponentTypes.DefaultForm) {
            put("instructions", "Please fill out the form below")
            putJsonArray("children") {
                add(10) // First Name
                add(11) // Last Name
                add(12) // Email
                add(13) // Notes
            }
        }

        addComponent(31, ComponentTypes.ActionButtons, ::onReload) {
            putJsonArray("mainButtons") {
                addJsonObject {
                    put("type", "submit")
                    put("name", "Reload")
                    put("jsAction", "submit")
                }
            }
            putJsonArray("secondaryButtons") {}
        }

        addComponent(3, ComponentTypes.AssignmentCard) {
            put("loading", "false")
            put("actionButtons", "31") // ActionButtons
            putJsonArray("children") {
                add(4) // Default Form
            }
        }
        addComponent(2, ComponentTypes.ViewContainer) {
            putJsonArray("children") {
                add(3) // AssignmentCard
            }
        }
        addComponent(1, ComponentTypes.RootContainer) {
            put("viewContainer", "2")
            putJsonArray("httpMessages") {}
        }

        handler.handle(EngineEvent.Ready)
    }

    private fun onReload(event: ComponentEvent) {
        val i = Random.nextInt(10000)
        config.componentManager.updateComponent(
            id = ComponentId(13),
            props = buildJsonObject {
                put("label", "Notes #$i")
                put("value", "Event: ${event.type}\nRandom notes #$i")
            }
        )
    }

    private fun addComponent(
        id: Int,
        type: ComponentType,
        onComponentEvent: (ComponentEvent) -> Unit = {},
        props: JsonObjectBuilder.() -> Unit,
    ) {
        with(config.componentManager) {
            addComponent(ComponentContextImpl(ComponentId(id), type, this, onComponentEvent))
            updateComponent(ComponentId(id), buildJsonObject(props))
        }
    }

    class MockSdkEngineBuilder() : ConstellationSdkEngineBuilder {
        override fun build(config: ConstellationSdkConfig, handler: EngineEventHandler) =
            MockSdkEngine(config, handler)
    }
}
