package com.pega.mobile.constellation.sdk.components

import com.pega.mobile.constellation.sdk.components.core.ComponentType

/**
 * Object that holds all known component types.
 */
object ComponentTypes {
    val RootContainer = ComponentType("RootContainer")
    val ViewContainer = ComponentType("ViewContainer")
    val FlowContainer = ComponentType("FlowContainer")
    val View = ComponentType("View")
    val Region = ComponentType("Region")
    val Assignment = ComponentType("Assignment")
    val AssignmentCard = ComponentType("AssignmentCard")
    val DefaultForm = ComponentType("DefaultForm")

    // fields
    val TextInput = ComponentType("TextInput")
    val Email = ComponentType("Email")
    val Integer = ComponentType("Integer")
    val Currency = ComponentType("Currency")
    val Checkbox = ComponentType("Checkbox")
    val TextArea = ComponentType("TextArea")
    val URL = ComponentType("URL")
    val Date = ComponentType("Date")
    val RadioButtons = ComponentType("RadioButtons")
    val Dropdown = ComponentType("Dropdown")

    // widgets
    val ActionButtons = ComponentType("ActionButtons")
    val AlertBanner = ComponentType("AlertBanner")

    // unsupported
    val UnsupportedJs = ComponentType("Unsupported")
    val UnsupportedNative = ComponentType("UnsupportedNative")
}