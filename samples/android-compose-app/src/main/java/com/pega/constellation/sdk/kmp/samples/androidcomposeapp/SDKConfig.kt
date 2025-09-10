package com.pega.constellation.sdk.kmp.samples.androidcomposeapp

/**
 * Configuration object for the Constellation Mobile SDK.
 */
object SDKConfig {

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
     * The client ID for authentication.
     *
     * By default, this is set to the client ID of *MediaCo_ReactSDK* OAuth 2.0 Client Registration.
     */
    const val AUTH_CLIENT_ID = "25795373220702300272"

    /**
     * The redirect URI for authentication.
     *
     * This URI should match the one configured in OAuth 2.0 Client Registration rule and
     * *appAuthRedirectScheme* placeholder used in the app's manifest file.
     */
    const val AUTH_REDIRECT_URI = "com.pega.mobile.constellation.sample://redirect"
}
