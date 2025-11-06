package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

/**
 * Represents the mode in which the Compose UI tests will run.
 */
sealed class ComposeTestMode(val token: String) {
    /**
     * Compose UI tests will run against a mock server.
     */
    object MockServer : ComposeTestMode("test-token")

    /**
     * Compose UI tests will run against a real server.
     */
    class RealServer(token: String) : ComposeTestMode(token)
}
