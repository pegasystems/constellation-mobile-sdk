package com.pega.constellation.sdk.kmp.core.api

/**
 * Class which defines a component.
 *
 * @property type type of the component. It can be built-in type defined in [com.pega.constellation.sdk.kmp.core.components.ComponentTypes] or custom type.
 * @property script (optional) script to be injected for the component.
 * @property producer function which takes component context and returns new Component
 *
 * @see [com.pega.constellation.sdk.kmp.core.components.ComponentRegistry.DefaultDefinitions]
 */
class ComponentDefinition(
    val type: ComponentType,
    val script: ComponentScript? = null,
    val producer: ComponentProducer
)
