package com.pega.constellation.sdk.kmp.core.api

import kotlin.jvm.JvmInline

/**
 * Class which defines a script to be injected for a component.
 *
 * @property file path to the script file. Relative to /assets folder or provided by [Res.getUri].
 *
 * Examples of creating [ComponentScript]:
 * ```kotlin
 * ComponentScript(
 *     file = Res.getUri("files/components_overrides/email.component.override.js")
 * )
 * ```
 *
 * ```kotlin
 * ComponentScript(
 *     file = "components_overrides/email.component.override.js"
 * )
 * ```
 */
@JvmInline
value class ComponentScript(
    val file: String
)
