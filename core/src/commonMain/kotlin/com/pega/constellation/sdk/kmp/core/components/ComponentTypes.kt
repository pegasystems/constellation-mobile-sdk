package com.pega.constellation.sdk.kmp.core.components

import com.pega.constellation.sdk.kmp.core.api.ComponentType

/**
 * Object that holds all known component types.
 */
object ComponentTypes {
    // containers
    val Assignment = ComponentType("Assignment")
    val AssignmentCard = ComponentType("AssignmentCard")
    val DataReference = ComponentType("DataReference")
    val DefaultForm = ComponentType("DefaultForm")
    val FlowContainer = ComponentType("FlowContainer")
    val OneColumn = ComponentType("OneColumn")
    val Region = ComponentType("Region")
    val RootContainer = ComponentType("RootContainer")
    val View = ComponentType("View")
    val ViewContainer = ComponentType("ViewContainer")

    // templates
    val SimpleTable = ComponentType("SimpleTable")
    val SimpleTableSelect = ComponentType("SimpleTableSelect")
    val FieldGroupTemplate = ComponentType("FieldGroupTemplate")

    // fields
    val Checkbox = ComponentType("Checkbox")
    val Currency = ComponentType("Currency")
    val Date = ComponentType("Date")
    val DateTime = ComponentType("DateTime")
    val Decimal = ComponentType("Decimal")
    val Dropdown = ComponentType("Dropdown")
    val Email = ComponentType("Email")
    val Integer = ComponentType("Integer")
    val Phone = ComponentType("Phone")
    val RadioButtons = ComponentType("RadioButtons")
    val TextArea = ComponentType("TextArea")
    val TextInput = ComponentType("TextInput")
    val Time = ComponentType("Time")
    val URL = ComponentType("URL")

    // widgets
    val ActionButtons = ComponentType("ActionButtons")
    val AlertBanner = ComponentType("AlertBanner")

    // unsupported
    val Unsupported = ComponentType("Unsupported")
}
