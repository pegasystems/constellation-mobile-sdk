package com.pega.mobile.constellation.sdk.components.core

/**
 * Class which defines a component.
 *
 * @property type type of the component. It can be built-in type defined in [ComponentTypes] or custom type.
 * @property jsFile relative path to js file. Root of the path is assets folder.
 * e.g.: if there is assets/components_override/custom_component_email.js
 *  script should be 'components_override/custom_component_email.js'
 *
 * @property producer function which takes component context and returns new Component
 */
class ComponentDefinition(
    val type: ComponentType,
    val jsFile: String? = null,
    val producer: ComponentProducer
)
