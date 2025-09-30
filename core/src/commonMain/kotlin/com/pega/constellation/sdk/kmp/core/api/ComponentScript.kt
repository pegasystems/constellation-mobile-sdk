package com.pega.constellation.sdk.kmp.core.api

/**
 * Class which defines a script to be injected for a component.
 *
 * @property file path to the script file.
 * @property resourceType type of resources where the script file is located.
 *
 * Examples of creating [ComponentScript]:
 * ```kotlin
 * ComponentScript(
 *     file = Res.getUri("files/components_overrides/email.component.override.js"),
 *     resourceType = ComponentScript.ResourceType.COMPOSE_RESOURCES
 * )
 * ```
 *
 * ```kotlin
 * ComponentScript(
 *     file = "components_overrides/email.component.override.js",
 *     resourceType = ComponentScript.ResourceType.PLATFORM_RESOURCES
 * )
 */
data class ComponentScript(
    val file: String,
    val resourceType: ResourceType
) {
    enum class ResourceType {
        /**
         * Resources located in the platform resources (e.g., Android assets, iOS main bundle).
         */
        PLATFORM_RESOURCES,

        /**
         * Resources located in the Compose Multiplatform resources (composeMultiplatform).
         */
        COMPOSE_RESOURCES
    }
}
