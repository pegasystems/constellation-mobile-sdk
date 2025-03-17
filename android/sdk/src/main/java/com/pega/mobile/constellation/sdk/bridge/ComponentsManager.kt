package com.pega.mobile.constellation.sdk.bridge

import android.util.Log
import com.pega.mobile.constellation.sdk.ComponentProducer
import com.pega.mobile.constellation.sdk.components.Component
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentComponent
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormComponent
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
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent
import com.pega.mobile.constellation.sdk.viewmodel.UnsupportedState
import org.json.JSONObject

object ComponentsManager {
    private const val TAG = "ComponentsManager"

    private val componentsMap = mutableMapOf<Int, Component>()

    private val components: MutableMap<String, ComponentProducer> = mutableMapOf(
        // containers
        "RootContainer" to { sendEventCallback -> RootContainerComponent() },
        "ViewContainer" to { sendEventCallback -> ViewContainerComponent() },
        "FlowContainer" to { sendEventCallback -> FlowContainerComponent() },
        "View" to { sendEventCallback -> ViewComponent() },
        "Region" to { sendEventCallback -> RegionComponent() },
        "Assignment" to { sendEventCallback -> AssignmentComponent() },
        "AssignmentCard" to { sendEventCallback -> AssignmentCardComponent() },
        "DefaultForm" to { sendEventCallback -> DefaultFormComponent() },
        // fields
        "TextInput" to { sendEventCallback -> TextInputComponent(sendEventCallback) },
        "Email" to { sendEventCallback -> EmailComponent(sendEventCallback) },
        "Checkbox" to { sendEventCallback -> CheckboxComponent(sendEventCallback) },
        "TextArea" to { sendEventCallback -> TextAreaComponent(sendEventCallback) },
        "URL" to { sendEventCallback -> UrlComponent(sendEventCallback) },
        // widgets
        "ActionButtons" to { sendEventCallback -> ActionButtonsComponent(sendEventCallback) }
    )

    fun setComponentsOverrides(componentsOverrides: Map<String, ComponentProducer>) {
        components += componentsOverrides
    }

    fun addComponent(id: Int, type: String, sendEventCallback: (ComponentEvent) -> Unit) {
        Log.d(TAG, "Adding component '${type}', id: $id")
        createNewComponent(type, sendEventCallback).also {
            componentsMap[id] = it
        }
    }

    fun removeComponent(id: Int) {
        Log.d(TAG, "Removing component with id: $id")
        componentsMap.remove(id)
    }

    fun getComponent(id: Int) = componentsMap[id]

    fun updateComponent(id: Int, propsJson: String) {
        componentsMap[id]?.updateProps(JSONObject(propsJson))
    }

    private fun createNewComponent(
        type: String,
        sendEventCallback: (ComponentEvent) -> Unit
    ) = components[type]?.invoke(sendEventCallback)
        ?: UnsupportedComponent(UnsupportedState.MissingNativeComponent(type))
}