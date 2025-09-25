package com.pega.constellation.sdk.kmp.samples.basecmpapp

import com.pega.constellation.sdk.kmp.core.ConstellationSdkConfig
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngine
import com.pega.constellation.sdk.kmp.core.ConstellationSdkEngineBuilderBase
import com.pega.constellation.sdk.kmp.core.EngineEvent
import com.pega.constellation.sdk.kmp.core.EngineEventHandler
import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.api.ComponentContextImpl
import com.pega.constellation.sdk.kmp.core.api.ComponentEvent
import com.pega.constellation.sdk.kmp.core.api.ComponentId
import com.pega.constellation.sdk.kmp.core.api.ComponentManager
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes
import com.pega.constellation.sdk.kmp.core.components.fields.FieldComponent
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
        config.componentManager.configureComponents()
        handler.handle(EngineEvent.Ready)
    }

    private fun ComponentManager.configureComponents() {
        component(10, ComponentTypes.TextInput) {
            put("label", "First Name")
            put("value", "")
        }
        component(11, ComponentTypes.TextInput) {
            put("label", "Last Name")
            put("value", "")
        }
        component(12, ComponentTypes.Email) {
            put("label", "Email")
            put("value", "")
            put("required", "true")
        }
        component(13, ComponentTypes.TextArea) {
            put("label", "Notes")
            put("value", "")
        }
        component(4, ComponentTypes.DefaultForm) {
            put("instructions", "Please fill out the form below")
            putJsonArray("children") {
                add(10) // First Name
                add(11) // Last Name
                add(12) // Email
                add(13) // Notes
            }
        }

        component(31, ComponentTypes.ActionButtons, ::onFillForm) {
            putJsonArray("mainButtons") {
                addJsonObject {
                    put("type", "submit")
                    put("name", "Fill the form")
                    put("jsAction", "submit")
                }
            }
            putJsonArray("secondaryButtons") {}
        }

        component(3, ComponentTypes.AssignmentCard) {
            put("loading", "false")
            put("actionButtons", "31") // ActionButtons
            putJsonArray("children") {
                add(4) // Default Form
            }
        }
        component(2, ComponentTypes.ViewContainer) {
            putJsonArray("children") {
                add(3) // AssignmentCard
            }
        }
        component(1, ComponentTypes.RootContainer) {
            put("viewContainer", "2")
            putJsonArray("httpMessages") {}
        }
    }

    @Suppress("unused")
    private fun onFillForm(event: ComponentEvent) = with(config.componentManager) {
        val i = Random.nextInt(10000)
        updateComponent(10) {
            put("label", "First Name #$i")
            put("value", "Jan #$i")
        }
        updateComponent(11) {
            put("label", "Last Name #$i")
            put("value", "Kowalski #$i")
        }
        updateComponent(12) {
            put("label", "Email #$i")
            put("value", "jan.kowalski$i@email.com")
        }
        updateComponent(13) {
            put("label", "Notes #$i")
            put("value", "Random notes #$i")
        }
    }

    private fun ComponentManager.component(
        id: Int,
        type: ComponentType,
        onComponentEvent: (ComponentEvent) -> Unit = {},
        props: JsonObjectBuilder.() -> Unit,
    ) = addComponent(ComponentContextImpl(ComponentId(id), type, this, onComponentEvent))
        .also { it.addObserver { println("Component updated: $it ${it.value}") } }
        .also { updateComponent(id, props) }

    private fun ComponentManager.updateComponent(id: Int, props: JsonObjectBuilder.() -> Unit) =
        updateComponent(ComponentId(id), buildJsonObject(props))

    class MockSdkEngineBuilder() : ConstellationSdkEngineBuilderBase() {
        override fun build(config: ConstellationSdkConfig, handler: EngineEventHandler) =
            MockSdkEngine(config, handler).also { notifyBuilt(it) }
    }

    private val Component.value: String
        get() = (this as? FieldComponent)?.value ?: ""
}
