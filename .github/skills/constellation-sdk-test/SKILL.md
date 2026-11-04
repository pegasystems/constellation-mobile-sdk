---
name: constellation-sdk-test
description: Rules and guidelines for writing non-UI Constellation SDK and WebView integration tests in the test module's Android device source set
---

## Overview

Non-UI SDK/WebView scenarios live in:
`test/src/androidDeviceTest/kotlin/com/pega/constellation/sdk/kmp/test/`

The current suites are `ConstellationSdk24Test.kt` and `ConstellationSdk25Test.kt`.
Both remain in the same package, `com.pega.constellation.sdk.kmp.test`, not version
subpackages. These are Android device integration tests, not host-only unit tests or
shared iOS scenarios.

Read `test/src/commonMain/composeResources/files/responses/README.md` for fixture/CDN
prerequisites. Use existing recorded case types and the version established by their
provenance; ask before adding a scenario if its version cannot be established.

## Test Scope

Do not create tests for test classes or test infrastructure, including mock handlers,
test rules, helpers, and fixtures. Verify changes to that infrastructure through the
existing SDK or sample scenarios that use it, rather than adding tests of the tests.

## Test Class Structure

- Add scenarios to the appropriate version-specific SDK class.
- Use `kotlin.test.Test` and `test_`-prefixed snake_case method names.
- Select the class's version once with
  `@get:Rule val sdkTest = ConstellationSdkTestRule(PegaVersion...)`.
- Run each scenario inside `sdkTest.runTest { ... }`.
- Keep shared assertions and component helpers in `ConstellationSdkTestUtils.kt`.
- Do not use a Compose UI test rule, UI semantics assertions, or sample app setup.

Example following the existing Pega 24 initialization scenario:

```kotlin
package com.pega.constellation.sdk.kmp.test

import androidx.test.ext.junit.runners.AndroidJUnit4
import com.pega.constellation.sdk.kmp.core.ConstellationSdk.State
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import org.junit.Rule
import org.junit.runner.RunWith
import kotlin.test.Test
import kotlin.test.assertEquals

@RunWith(AndroidJUnit4::class)
class ConstellationSdk24Test {
    @get:Rule
    val sdkTest = ConstellationSdkTestRule(PegaVersion.v24_1_0)

    @Test
    fun test_initialization() = sdkTest.runTest {
        assertEquals(State.Initial, sdk.state.value)
        sdk.createCase("DIXL-MediaCo-Work-SDKTesting")
        sdk.assertState<State.Loading>()
        sdk.assertState<State.Ready>()
    }
}
```

## Lifecycle and Retries

`ConstellationSdkTestRule` initializes the mock interceptor, Android WebView engine,
and SDK in `before()` on the main dispatcher, once per test method. Its `after()`
destroys the engine and cancels its scope.

`sdkTest.runTest` runs on the main dispatcher and attempts the scenario body at most
twice. If the first attempt fails, the retry path tears down and recreates the mock
interceptor, engine, and SDK before running the body again, so each attempt starts
from initial SDK lifecycle state. Do not add a second retry loop.

## Running Tests

Download required local CDN assets following the response README. Use a connected
Android emulator/device and the checked-in Gradle Wrapper from repository root:

```bash
# One SDK class.
./gradlew :test:connectedAndroidDeviceTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.ConstellationSdk24Test

# One SDK method.
./gradlew :test:connectedAndroidDeviceTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.ConstellationSdk24Test#test_initialization
```

Use the same class filter with `ConstellationSdk25Test` for Pega 25.
The managed-device alternative is `:test:pixelAndroidDeviceTest`.

Report actual executed/discovered tests, failures, skips, and environment blockers.
An empty selection is not verification, and an Android result does not establish iOS
coverage.
