---
name: android-instrumented-ui-test
description: Rules and guidelines for writing Android instrumented UI tests for the android-cmp-app sample
---

## Overview

Android instrumented UI tests live in:
`samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`

Tests use Compose UI Test with `MockHttpClient`/`MockInterceptor` backed by fixture JSON files;
they do not require a separately running HTTP server. Read
`samples/android-cmp-app/README.md` and
`test/src/commonMain/composeResources/files/responses/README.md` first.

Follow `AGENTS.md` and `.specify/memory/constitution.md`. For non-trivial work, use the
repository's specification, clarification/research, plan, tasks, implementation, and verification
sequence. When the user requests Spec Kit, use the installed `speckit-*` skills and keep the
selected feature's artifacts synchronized with confirmed requirements and actual results.

## Test Scope

Do not create tests for test classes or test infrastructure, including mock handlers,
test rules, helpers, and fixtures. Verify changes to that infrastructure through the
existing SDK or sample scenarios that use it, rather than adding tests of the tests.

---

## Required Inputs and Clarifications

Before creating a test, obtain all of the following from the user:

- **Pega version**: Every new test requires an explicitly provided or confirmed version.
  Do not infer it solely from the branch name, existing fixtures, or HAR.
- **Test-case instructions**: Required setup, interactions, and expected verifications.
- **HTTP traces**: A user-provided HAR containing the scenario's requests and responses.
- **Step titles**: The title of every requested step, used to locate the matching response.

Ask for any missing input before proceeding. If the user does not provide it, stop and report
the test as blocked; do not invent values, fabricate responses, or create a knowingly incomplete test.
Ask one clarification at a time.

Compare the requested version and scenario with the recording and repository profiles. Clarify
suspected version typos and contradictions between requested selections, later expectations,
and recorded payloads. Do not silently substitute another version, change the scenario, or
edit recorded business data to make an inconsistent expectation pass.

Test instructions example:

```
Test case 1: Verify rendering and behaviour of Data Reference Single Record

Test setup:
Click "New Service" button

Step 1: Title: Combobox, description: Data reference displayed as combobox which is rendered as regular dropdown.

- click dropdown - verify all values
- select "C-Class" value 
- after selecting verify if value has been selected 
- click next


Step 2: Title: Dropdown, description: Verify Data reference displayed as dropdown.

- Verify label: "Data reference single record"
- verify selected value - "C-Class"
- click dropdown
- verify all values
- select "A4" value 
- after selecting verify if value has been selected 
- click next

```
---

## Checklist — Adding a New Test

### 1. Map the scenario to the HAR

Find each step using its user-provided title in the response's
`uiResources.navigation.steps` array: select the entry whose `name` matches the title and
whose `visited_status` is `"current"`.

For each interaction, identify the HTTP method, URL, relevant query/body parameters, response,
assignment/action identifiers, and resulting current step. Include creation, refresh, submission,
case-action discovery, case-summary reads, and data-page requests actually used by the scenario.
Refresh or ancillary responses may omit navigation; associate them with the recorded action
and surrounding step responses rather than inventing a current-step entry.

Derive all expected labels, options, field values, selections, and submitted payloads from the
recorded requests and response JSON. Inspect the existing renderer when translating recorded
values into expected UI text; do not assume raw values are formatted, or formatted values are raw.

### 2. Extract versioned response fixtures

Every DX response used by the test must be stored as JSON under
`test/src/commonMain/composeResources/files/responses/dx/<versioned_folder>/`,
in the appropriate endpoint subdirectory. Decode HAR response content when necessary.
Extract response bodies only; do not copy the full HAR, authentication headers, cookies, or tokens.

Use these filename conventions:

| Directory | Filename |
|---|---|
| `cases/` | `<TestClassName>-<ShortenedTestCaseName>-<CaseStepName>.json` |
| `assignments/` | `<TestClassName>-<ShortenedTestCaseName>-<TestStepNumber>-<CaseStepName>.json` |
| `data_views/` | Recorded data-page name, with a descriptive suffix when multiple responses are needed |

Use descriptive step names for refreshes and ancillary responses as well. If a filename collides,
extend it with a meaningful word describing the test's subject; never overwrite another scenario.
The directory already identifies the version, so do not repeat it in filenames.

Read `pyUserIdentifier` from the selected version's `data_views/D_pxBootstrapConfig.json`
(including its serialized configuration when applicable). Replace every occurrence of the
recorded operator identifier in extracted responses with that value, including nested values,
keys, and serialized JSON strings. Preserve unrelated business data.

Validate that extracted files are valid JSON and structurally match the HAR bodies after the
required operator normalization. Keep fixture origin in related test documentation.

### 3. Register every required request in handlers

- For assignment GET/PATCH responses in `dx/<version>/assignments`, add the route to
  `pega24/DxAssignments24Handler.kt`, `pega25/DxAssignments25Handler.kt`, or
  `pega26/DxAssignments26Handler.kt`. Add assignment-action entries to the matching
  `handleAction` dispatch. Match assignments by the recorded case identifier using
  `assignmentId.contains("D-2004")`, not equality against the whole assignment ID, so routing
  does not depend on the assignment prefix, work class, flow suffix, or encoded spaces.
  Match the action ID, including refresh suffixes where applicable. Validate submitted content and page instructions
  against the recording before returning the next response.
- For case GET/POST/DELETE/PATCH responses in `dx/<version>/cases`, use the matching
  `pega24/DxCases24Handler.kt`, `pega25/DxCases25Handler.kt`, or `pega26/DxCases26Handler.kt`.
  Add creation entries to its `caseTypes` map, using the `caseTypeID` from the first recorded
  POST to `/cases` as the key. Handle recorded case GET requests through the version
  delegate's `getCase` hook, not scenario-specific logic in the shared dispatcher.
- For data-page responses (`D_` prefix, files in `dx/<version>/data_views` or legacy
  `dx/data_views`), use `DxDataViewsHandler`. Match the recorded URL and relevant parameters
  or query projections when one endpoint returns different datasets.
- For newly introduced major versions, add and wire the corresponding version delegates
  rather than placing their routes in an existing version's handler.

Handlers inside folder: `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/`

Keep endpoint parsing, shared legacy routes, and missing-response errors in the public
`DxAssignmentsHandler`/`DxCasesHandler` dispatchers. Version delegates use `asset(relativePath)`
from `VersionedDxHandler`; reuse applicable request helpers such as `getPageInstructions` and
`getContentPageKey` from `MockRequestExtensions.kt`. Account for URL-encoded identifiers
when matching the recording.

When an identical URL returns different responses over time, distinguish them using recorded
request inputs where possible. If replay order is required, keep state local to the handler
instance so full test setup/retries reset it, and fail explicitly when the recording is exhausted.
Do not introduce shared global state, success-shaped fallbacks, or cross-version fallback.
Do not migrate shared/SwiftUI fixtures without evidence.

### 4. Create the test file

Under `samples/android-cmp-app/src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`,
choose `pega24/`, `pega25/`, or `pega26/` for the recorded runtime. Pega 24.1 and 24.2
share `pega24/` but still select different `PegaVersion` values. Use `<FeatureName>Test.kt`.
For a new major version, use its corresponding version package. Keep infrastructure in the
parent package and authentication fakes in `fake/`.

---

## Test Class Structure

- test class name: `<FeatureName>Test`
- Extend `ComposeTest` and pass the recorded `PegaVersion`; see version selection below.
- Annotate the class with `@OptIn(ExperimentalTestApi::class)`
- Use `kotlin.test.Test` as testing library
- Test method names use `test_` prefix + snake_case (`test_<feature_name>`)
- Annotate every scenario with `@PegaCase` using the recorded case type.
- Every test body runs inside `runAndroidTest { ... }`.
- `ComposeTest.setUp()` initializes the mock client, engine, injector, and app content before
  the test body.
- Missing/blank `@PegaCase` values fail explicitly. Never infer the case from a method name.

Example using an existing Pega 25 recording:

```kotlin
package com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega25

import androidx.compose.ui.test.ExperimentalTestApi
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.performClick
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.ComposeTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.PegaCase
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.runAndroidTest
import com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.waitForNode
import com.pega.constellation.sdk.kmp.test.mock.PegaVersion
import kotlin.test.Test

@OptIn(ExperimentalTestApi::class)
class CaseProcessingTest : ComposeTest(PegaVersion.v25_1) {
    @Test
    @PegaCase("OI1OYV-Marco2-Work-SimpleTest")
    fun test_case_processing_backward() = runAndroidTest {
        onNodeWithText("New Service").performClick()
        waitForNode("step1 (S-", substring = true)
    }
}
```

`RetryingComposeTestRule` creates a fresh official Compose rule for each attempt and reruns
the complete setup/test/teardown lifecycle. Two attempts are the default; pass `maxAttempts = 1`
to `ComposeTest` when retries must be disabled. `runAndroidTest` captures scenario-failure
screenshots before teardown and rethrows the failure. Do not add another retry loop.

---

## Starting a Case

For case-creation scenarios, begin from the app's home screen:

```kotlin
onNodeWithText("New Service").performClick()
```

Always verify the current step title after case creation and after every submission.
Wait for the form title to confirm the view loaded before asserting the new form's contents:

```kotlin
waitForNode("Expected title", substring = true)
```

Use enough of the recorded title to distinguish the current form from navigation labels.
When the UI includes the case identifier in its heading, use it to disambiguate as appropriate.

### Verifying request payloads

After every submission, verify the captured request body against the corresponding HAR request.
`ComposeTest` provides the protected `ComposeContentTestRule.waitForRequestBody(urlPart)`
helper; it is inherited, not a top-level function to import.

Choose a URL fragment that distinguishes submission from refresh or other requests to the same
action. For example, a recorded `/actions/ExpectedAction?` submission must not accidentally
match `/actions/ExpectedAction/refresh`.

Compare parsed JSON rather than serialized strings so formatting and object-key order do not
cause false failures. Verify the complete recorded payload, including `content` and
`pageInstructions` when present; do not check only a selected identifier while ignoring unexpected
fields or instructions. Check creation and refresh bodies as well when they are part of the
requested behavior.

Handler-side validation complements captured-body assertions; it does not replace them.

---

## Reliable UI Assertions and Interactions

- Verify actual selection semantics (`assertIsSelected`, `assertIsOn`, or the control's
  corresponding state) before and after a selection change. Text presence alone does not prove
  selection. For exclusive selection, verify the previous choice is no longer selected.
- Scope repeated labels and values to the intended control, section, item, or popup.
  An expanded dropdown can expose the same text in both its selected field and a menu item;
  scope option assertions/clicks to the popup rather than selecting a global text match.
- Prefer existing test tags and semantic ancestry. Inspect the merged and unmerged trees before
  assuming that visual grouping implies a parent-child semantics relationship.
- Some table/layout implementations expose cells and controls as siblings and include
  measurement-only duplicates. Do not assert arbitrary duplicate counts or use a global first
  match to prove an item's data. If semantic ancestry is unavailable, correlate cells and
  controls using their actual row layout positions. Use unclipped positions/sizes when horizontal
  scrolling would make clipped bounds empty, and exclude measurement-only copies.
- Scope detail assertions to the selected item. Verify all columns, options, rows/items, and
  fields requested by the scenario using the response data, not just a representative subset.
- Use `performScrollTo()` only for nodes with a scrollable ancestor. Fixed footer buttons may
  not have one and should be clicked directly. Scroll offscreen content into view and use
  `assertIsDisplayed()` when verifying visible rendering.
- Use existing bounded waits for asynchronous rendering/selection changes; do not add sleeps
  or another retry loop. Remove temporary tree dumps and debug-only code after diagnosing failures.

---

## Utility Functions (`ComposeTestUtils.kt`)

Import from `com.pega.constellation.sdk.kmp.samples.androidcmpapp.test`:

| Function | Purpose |
|---|---|
| `waitForNode(text, substring)` | Wait up to 5 s for exactly one node with given text; fails with a clear message |
| `waitForNodes(text, count, substring)` | Wait up to 5 s for exactly `count` nodes with given text |
| `waitForDescendantNode(testTag, text, substring)` | Wait for one matching descendant inside a tagged section |
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

private fun ComposeContentTestRule.verifyExpectedFields(testTag: String) {
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

Extract repeated assertion sequences into `private fun ComposeContentTestRule.<name>()` methods
(import `androidx.compose.ui.test.junit4.ComposeContentTestRule`):

```kotlin
private fun ComposeContentTestRule.verifyDetailsShown() {
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

Use the version explicitly supplied or confirmed by the user and reconcile it with fixture
provenance. Available values are `PegaVersion.v24_1_0`, `PegaVersion.v24_2_2`,
`PegaVersion.v25_1`, and `PegaVersion.v26_1`, mapped to `dx/24.1`, `dx/24.2`,
`dx/25.1`, and `dx/26.1`.

The enum is in `test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/PegaVersion.kt`.

### New minor version

Add the requested version to `PegaVersion`, reusing the existing major version's fixture profile
and handlers. Update exhaustive version dispatches to select those existing handlers.
Introducing a minor version alone does not require new resource directories or files.
Preserve existing mappings; do not reorganize previously established fixture profiles.
New scenario responses still follow the fixture rules above.

### New major version

Before proceeding, ask the user for any missing bootstrap response and CDN base URL.
Also ask whether the version requires additional JavaScript dependencies. If the required
bootstrap response or CDN URL is not provided, stop and report the work as blocked.
Do not guess them or copy another version's bootstrap as a substitute.

For the confirmed version:

- Add its `PegaVersion` value and separate versioned DX/CDN resource layout, following existing
  versions. Add the user-provided bootstrap response at
  `test/src/commonMain/composeResources/files/responses/dx/<versioned_folder>/data_views/D_pxBootstrapConfig.json`.
  Use the repository's exact `D_pxBootstrapConfig.json` spelling.
- Update `test/src/commonMain/composeResources/files/responses/download_js_files.sh`:
  add the version to `RELEASES` and the user-provided CDN base URL to the corresponding position
  in `CDN_URLS`. Keep the arrays aligned.
- If the user provides additional JavaScript dependencies, add a version-specific download
  section with descriptive `echo` messages, following the existing sections.
- Wire the new version into the mock dispatchers and CDN routing wherever existing profiles
  require it. Keep remote hashed dependency names consistent with the stable local asset names.
- Update directly related version/setup documentation. A fixture profile alone is not evidence
  that a component or platform is supported.

## Running tests

Before running tests, check for the selected version's CDN profile under
`test/src/commonMain/composeResources/files/responses/cdn/` and verify its required files,
including any additional dependencies. If the directory for the requested major/profile is
absent, run the downloader first from its required working directory:

```bash
(cd test/src/commonMain/composeResources/files/responses && ./download_js_files.sh)
```

The downloader rebuilds the local CDN tree for all configured profiles; do not run it
unnecessarily when the required assets are already present and complete.

Use the checked-in Gradle Wrapper. Start with the narrowest class/method selection for the
changed scenario, then run closely related existing tests to check for regressions. Use a package
selection when validating a whole version:

```bash
# One sample version package; use the parent package for all sample scenarios.
./gradlew :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.package=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26
```

The managed-device alternative is `:samples:android-cmp-app:pixelDebugAndroidTest`.

If execution fails because a mock request containing `data_views` is unhandled, find its response
in the supplied HAR using the request URL and relevant request inputs. Add the JSON under
`dx/<versioned_folder>/data_views/`, normalize its operator identity, register the route in
`DxDataViewsHandler`, and rerun. If the required response is absent from the HAR, ask the user
for it instead of fabricating data.

Report exact commands and actual discovered/executed test counts, failures, skips, and environment
blockers. Compilation alone, empty discovery, or historical results do not establish runtime
acceptance. Android results do not establish iOS coverage.
