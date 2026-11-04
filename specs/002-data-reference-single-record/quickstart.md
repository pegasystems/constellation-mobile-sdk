# Validation

Use the existing local Pega 26.1 assets under `test/src/commonMain/composeResources/files/responses/cdn/26.1/`. If absent, run:

```bash
(cd test/src/commonMain/composeResources/files/responses && ./download_js_files.sh)
```

With an Android device/emulator available:

```bash
./gradlew :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest
```

Expected: one discovered scenario passes, reaches Readonly with Camry, and validates all five submitted reference bodies.

Compile separately if device execution is unavailable:

```bash
./gradlew :samples:android-cmp-app:compileDebugAndroidTestKotlinAndroid
```

Compilation alone does not establish runtime acceptance or iOS coverage.

## Executed Results - 2026-10-27

- The focused single-class command above executed 1 test: 1 passed, 0 failures, 0 skipped.
- Final validation ran the new scenario together with the existing Pega 26 cascading-dropdown regression:

```bash
./gradlew :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.DataReferenceSingleRecordTest,com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26.CascadingDropdownTest
```

Result: BUILD SUCCESSFUL, 2 tests passed, 0 failures/errors/skips on Pixel_10_Pro_XL (Android 17 emulator). This run includes compilation of the final test and mock handlers.

All 16 fixture bodies were compared structurally with their HAR responses after replacing the recorded operator with the existing bootstrap identifier, `test`. All six current navigation names match the requested steps. The new fixtures contain no original operator identifier or credential keys. `git diff --check` passed.

Existing CDN assets were present, so the downloader was not run. No iOS checks were run: this feature adds Android sample coverage only.
