This directory contains responses used in tests with mocked server.

**Both** iOS and Android projects are using this dir.

Please run `download_js_files.sh` script from this directory, to download required dependencies for tests.

Downloaded CDN assets must be under `cdn/24.1/`, `cdn/24.2/`, `cdn/25.1/`, and `cdn/26.1/`.
Older checkouts may still have `cdn/8.24.1/` and `cdn/8.24.2/`; rename those directories to
`cdn/24.1/` and `cdn/24.2/`, respectively, or rerun the download script. These files are
gitignored, so updating the checkout does not migrate existing downloads.

Check that every selected version has its required local CDN assets before running UI tests.
There is no retained `CdnAssetsTest` in this checkout; an empty test selection does not
validate downloads.

DX response fixtures with a known Pega version are stored under `dx/<version>/<endpoint>/`, for example:

```text
dx/24.1/assignments/
dx/24.2/cases/
dx/25.1/data_views/
dx/26.1/cases/
```

The version is represented by the directory, so filenames inside a versioned directory must not repeat the
version. Existing fixtures in the top-level `dx/assignments`, `dx/cases`, and `dx/data_views` directories are
legacy/shared fixtures and should remain there when they are used by multiple versions, by SwiftUI tests, or
when their source version is not established. New version-specific fixtures should use the versioned layout.

### Assignment, case, and data-view mock handlers

`DxAssignmentsHandler`, `DxCasesHandler`, and `DxDataViewsHandler` keep endpoint recognition, shared
request parsing, shared legacy responses, and missing-response errors common. They select scenario handlers from
`test/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/test/mock/handlers/`:

- `pega24/`: Pega 24 scenarios, distinguished further by 24.1 and 24.2.
- `pega25/`: Pega 25 scenarios, including instance-local next/previous navigation history.
- `pega26/`: Pega 26 scenarios.

Add recorded case types, assignment actions, and data views only to their version's handlers. Use the shared
`asset` helper for versioned paths and the common request helpers for page instructions/content keys.
Do not copy request parsing or shared legacy responses into version handlers.

A scenario recorded only for another version returns an explicit missing-response error; handlers
do not fall back to another version's fixture directory. Top-level legacy/shared routes remain
available across versions. Existing handler constructors and callers are unchanged.


### SDK integration tests

`ConstellationSdk24Test` and `ConstellationSdk25Test` in `test/src/androidDeviceTest/` contain the
SDK/WebView integration scenarios for their Pega versions. Both files remain in the same package.
`ConstellationSdkTestUtils.kt` provides a shared JUnit rule for Android setup, teardown, and retries,
plus shared assertion and component helpers; there is no base test class. These tests run on an Android
device.

Each class selects its Pega version once when constructing `ConstellationSdkTestRule`. The rule
initializes the SDK in `before()` on the main dispatcher and cleans it up in `after()`. Tests call
`sdkTest.runTest { ... }` without selecting a version or initializing the SDK again.

```bash
./gradlew :test:connectedAndroidDeviceTest \
  -Pandroid.testInstrumentationRunnerArguments.class=com.pega.constellation.sdk.kmp.test.ConstellationSdk24Test,com.pega.constellation.sdk.kmp.test.ConstellationSdk25Test
```
