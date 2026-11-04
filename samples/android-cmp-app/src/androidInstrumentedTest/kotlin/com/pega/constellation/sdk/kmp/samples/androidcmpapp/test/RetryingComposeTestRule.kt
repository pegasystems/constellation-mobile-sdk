package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.junit4.createComposeRule
import org.junit.rules.TestRule
import org.junit.runner.Description
import org.junit.runners.model.Statement

@OptIn(ExperimentalTestApi::class)
internal class RetryingComposeTestRule(
    private val test: ComposeTest,
    private val maxAttempts: Int
) : TestRule {
    init {
        require(maxAttempts > 0) { "maxAttempts must be positive" }
    }

    override fun apply(base: Statement, description: Description): Statement = object : Statement() {
        override fun evaluate() {
            test.testDescription = description
            for (attempt in 1..maxAttempts) {
                test.composeRule = createComposeRule()
                try {
                    test.composeRule.apply(base, description).evaluate()
                    return
                } catch (failure: Throwable) {
                    if (attempt == maxAttempts) throw failure
                    println("Retrying ${description.displayName} after failed attempt $attempt")
                }
            }
        }
    }
}
