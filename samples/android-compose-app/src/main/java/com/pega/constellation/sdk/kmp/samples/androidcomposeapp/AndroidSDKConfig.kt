package com.pega.constellation.sdk.kmp.samples.androidcomposeapp

/**
 * Configuration object for the Constellation Mobile SDK.
 */
object AndroidSDKConfig {

    /**
     * The base URL of the Pega Platform.
     *
     * Replace with the actual URL of your Pega instance.
     */
    const val PEGA_URL = "https://insert-url-here.example/prweb"

    /**
     * The version of the Pega Platform being used. Determines the Constellation Core JS library version used by the SDK.
     */
    const val PEGA_VERSION = "24.1.0"

    /**
     * The name of the Pega case class to be created.
     */
    const val PEGA_CASE_CLASS_NAME = "DIXL-MediaCo-Work-NewService"

    /**
     * OAuth2 token
     */
    const val AUTH_TOKEN = "Bearer token_encoded_value"
}
