---
name: android-instrumented-ui-test
description: Rules and guidelines for writing Android instrumented UI tests for the android-cmp-app sample
---

## Overview

Android instrumented UI tests live in:
`samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`

Tests are run with Compose UI Test against a mock HTTP server backed by fixture JSON files.

---

## Checklist — Adding a New Test

### 1. Register the mock fixture in handlers.
- For POST related jsons (POST in name, files in test/src/commonMain/composeResources/files/responses/dx/cases/) -> `DxCasesHandler`
- For Datapages related responses (D_ prefix in name, files in test/src/commonMain/composeResources/files/responses/dx/data_views) -> `DxDataViewsHandler`
- For assignment procesing PATCH responses (files in test/src/commonMain/composeResources/files/responses/dx/assignments) -> `DxAssignmentsHandler`
    - Please use `assignmentId` from response and create `handle` function for each test. Inside `handle` function handle exact request using `actionId`

Handlers inside folder: `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/`

### 2. Create the test file

Location: `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/cases/`
Name: <FeatureName>Test.kt

---

## Test Class Structure

- test class name: `<FeatureName>Test`
- Extend `ComposeTest` and pass the appropriate `PegaVersion` - please ask user for it if not provided.
- Annotate the class with `@OptIn(ExperimentalTestApi::class)`
- Use `kotlin.test.Test` as testing library
- Test method names use `test_` prefix + snake_case (`test_<feature_name>`)
- Every test body runs inside `runComposeUiTest { ... }`
- Call `setupApp(caseClassName = "...")` as the first statement inside `runComposeUiTest`

---

## Starting a Case

Always begin by triggering case creation from the app's home screen:

```kotlin
onNodeWithText("New Service").performClick()
```

Then wait for the form title to confirm the view loaded before asserting anything else:

```kotlin
waitForNode("Expected title", substring = true)
```

---

## Utility Functions (`ComposeTestUtils.kt`)

Import from `com.pega.constellation.sdk.kmp.samples.androidcmpapp.test`:

| Function | Purpose |
|---|---|
| `waitForNode(text, substring)` | Wait up to 5 s for exactly one node with given text; fails with a clear message |
| `waitForNodes(text, count, substring)` | Wait up to 5 s for exactly `count` nodes with given text |
| `onAllDescendantsOf(testTag)` | Returns all nodes that are descendants of a node with the given test tag |
| `find(text)` | Extension on `SemanticsNodeInteractionCollection` — filters by text and returns the first match |
| `printAllFormNodes()` | Debug helper — prints the full node tree to logcat |

### `onAllDescendantsOf` + `find` pattern

Use this pattern to scope assertions to a specific section of the UI identified by a test tag:

```kotlin
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.find
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.onAllDescendantsOf

onAllDescendantsOf("some_test_tag").let { nodes ->
    nodes.find("label text").assertExists()
    nodes.find("value text").assertExists()
}
```

Both `find` and `onAllDescendantsOf` must be explicitly imported — they are top-level extension functions, not methods on the test class.

---

## Extracting Repeated Data

When the same set of texts must be verified in multiple places (e.g. in two different sections of the same screen), extract them into a class-level property and iterate:

```kotlin
private val expectedFields = mapOf(
    "label 1" to "value 1",
    "label 2" to "value 2",
)

private fun ComposeUiTest.verifyExpectedFields(testTag: String) {
    onAllDescendantsOf(testTag).let { nodes ->
        expectedFields.forEach { (label, value) ->
            nodes.find(label).assertExists()
            nodes.find(value).assertExists()
        }
    }
}
```

Call the shared function with different test tags:

```kotlin
verifyExpectedFields("section_one_tag")
verifyExpectedFields("section_two_tag")
```

---

## Helper Methods

Extract repeated assertion sequences into `private fun ComposeUiTest.<name>()` methods to keep the main test body readable:

```kotlin
private fun ComposeUiTest.verifyDetailsShown() {
    waitForNode("Details")
    waitForNode("Label")
    waitForNode("Some value")
}
```

---

## Common Interactions

```kotlin
// Text input
onNodeWithText("field label").performTextInput("value")

// Click
onNodeWithText("Button label").performClick()

// Checkbox via test tag
onNodeWithTag("checkbox_[Label]").performClick()

// Scroll then interact
it.find("field label").performScrollTo().performClick()

// Wait for node to disappear
waitUntilDoesNotExist(hasText("text"))

// Assert node count
waitForNodes("text", count = 2)
```

---

## PegaVersion

Please ask user for PegaVersion if he didin't specify it. Available values are defined in `PegaVersion` (e.g. `PegaVersion.v24_1_0`, `PegaVersion.v24_2_2`, `PegaVersion.v25_1`).
