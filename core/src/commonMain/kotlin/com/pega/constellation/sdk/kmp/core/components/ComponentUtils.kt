package com.pega.constellation.sdk.kmp.core.components

import com.pega.constellation.sdk.kmp.core.api.Component
import com.pega.constellation.sdk.kmp.core.components.containers.ContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent

fun Component.structure(indent: String = ""): String {
    val self = indent + this + "\n"
    val children = children().joinToString("") { it.structure("$indent-") }
    return self + children
}

fun Component.children() = when (this) {
    is ContainerComponent -> children
    is RootContainerComponent -> listOfNotNull(modalViewContainer, viewContainer)
    is FlowContainerComponent -> listOfNotNull(assignment) + alertBanners
    else -> emptyList()
}