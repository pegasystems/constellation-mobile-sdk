# Validation Guide

## Prerequisites

- JDK 17+ and the checked-in Gradle Wrapper.
- A connected Android device/emulator and version-matched CDN assets as described in
  `test/src/commonMain/composeResources/files/responses/README.md`.
- The Pega 26.1 configuration case fixtures extracted from the user-supplied
  `traces_tests.har`, under `test/src/commonMain/composeResources/files/responses/dx/26.1/`.

## Compile

```bash
./gradlew :core:compileKotlinJvm :ui-components-cmp:compileKotlinJvm :ui-renderer-cmp:compileKotlinJvm
```

Earlier JVM compiles succeeded in this session before the latest committed edits;
rerun against the current tree. Compilation alone does not validate UI behavior.

## Recorded Android scenarios

```bash
./gradlew :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest,com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceListOfRecordsTest

./gradlew :test:connectedAndroidDeviceTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.ConstellationSdk24Test,com.pega.constellation.sdk.kmp.test.ConstellationSdk25Test
```

Require nonzero executed test counts and record results. Single-record prior results
are recorded in `specs/002-data-reference-single-record/quickstart.md`; they do not
establish that this branch's later table changes have been tested.

## Required and disabled table acceptance

On 2026-11-04, the following ran on the connected Pixel 10 Pro XL emulator (Android 17):

```bash
./gradlew --quiet :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceTableConfigTest
```

Result: 1 test passed, 0 failed, 0 skipped. The recorded journey checks required
indicators, empty-submit banner and inline errors, inline error clearing, enabled
selection, disabled row interaction, and complete request bodies. The banner may
remain visible after the inline message clears. The recording identifies Pega 26.1.1;
the existing 26.1 fixture profile supplies the local runtime assets.

The following related regression command ran on the same emulator:

```bash
./gradlew --quiet :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest,com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceListOfRecordsTest
```

Result: 2 tests passed, 0 failed, 0 skipped.

Additional acceptance work remains: exercise enabled and disabled single- and multi-select
tables. Verify both row and control activation, selection preservation, disabled
control appearance, required indicator, validation suppression when disabled, and
message updates without unnecessary data reloads. Exercise field, page, and HTTP
banner classifications and display. Record the fixture, platform, test count, and
result; do not claim a pass if the necessary fixture or platform is unavailable.

## iOS

Verify the changed SwiftUI banner and CMP table on an iOS simulator using the
applicable sample and fixtures. Android checks are not iOS acceptance coverage.
