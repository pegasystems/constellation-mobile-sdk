package com.pega.mobile.constellation.sdk.components

import com.pega.mobile.constellation.sdk.components.core.ComponentType

/**
 * Object that holds all known component types.
 */
object ComponentTypes {
    // containers
    val Assignment = ComponentType("Assignment")
    val AssignmentCard = ComponentType("AssignmentCard")
    val DefaultForm = ComponentType("DefaultForm")
    val FlowContainer = ComponentType("FlowContainer")
    val Region = ComponentType("Region")
    val RootContainer = ComponentType("RootContainer")
    val View = ComponentType("View")
    val ViewContainer = ComponentType("ViewContainer")

    //Templates
    val SimpleTable = ComponentType("SimpleTable")
    val FieldGroupTemplate = ComponentType("FieldGroupTemplate")

    // fields
    val Checkbox = ComponentType("Checkbox")
    val Currency = ComponentType("Currency")
    val Date = ComponentType("Date")
    val Decimal = ComponentType("Decimal")
    val Dropdown = ComponentType("Dropdown")
    val Email = ComponentType("Email")
    val Integer = ComponentType("Integer")
    val Phone = ComponentType("Phone")
    val RadioButtons = ComponentType("RadioButtons")
    val TextArea = ComponentType("TextArea")
    val TextInput = ComponentType("TextInput")
    val URL = ComponentType("URL")

    // widgets
    val ActionButtons = ComponentType("ActionButtons")
    val AlertBanner = ComponentType("AlertBanner")

    // unsupported
    val Unsupported = ComponentType("Unsupported")
}