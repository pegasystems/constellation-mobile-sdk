## Constellation SDK - Android Sample Application using base CMP module

- [Configuration](#configuration)
- [Running the application](#running-the-application)
- [ Integration of CMP module with Native Compose application](#integration-of-cmp-module-with-native-compose-application)

Project contains Android sample application that demonstrates the usage of the SDK.

Build the sample with Gradle `9.4.0` and JDK 17 or newer using the repository's Gradle Wrapper.

### Configuration

To run the sample application, you need to provide necessary configuration: [SDKConfig.kt](../../samples/base-cmp-app/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/SDKConfig.kt)

```kotlin
object SDKConfig {
    ...
    const val PEGA_URL = "https://insert-url-here.example/prweb"
    const val PEGA_CASE_CLASS_NAME = "DIXL-MediaCo-Work-NewService" // replace with correct case type name if necessary
    const val AUTH_CLIENT_ID = "13225896606129931937" // replace with correct client id if necessary
    const val AUTH_REDIRECT_URI = "com.pega.mobile.constellation.sample://redirect" // replace with correct redirect uri if necessary
}
```

For more information about the configuration, please refer to the [Configuring sample mobile application](../../docs/configure-sample-mobile-apps.md) document.

### Running the application

Now, run the application on your Android device or emulator using Android Studio.

The `New Service` action creates the case type configured by
`SDKConfig.PEGA_CASE_CLASS_NAME`. From the bottom navigation, use `Create`
to load and choose another case type advertised by the Pega environment.

### Integration of CMP module with Native Compose application

The application depends on the module [base-cmp-app](../base-cmp-app) that contains shared code in Kotlin Multiplatform.

It exposes:
- MediaCoApp composable function that can be used directly in Compose to display MediaCo application.
- Injector for dependency injection 
- AuthManager for managing authentication.

### Instrumented tests

Scenario tests are grouped under
`src/androidInstrumentedTest/kotlin/com/pega/constellation/sdk/kmp/samples/androidcmpapp/test/`:

- `pega24/`: Pega 24.1 and 24.2 scenarios.
- `pega25/`: Pega 25 scenarios.
- `pega26/`: Pega 26 scenarios.

Test setup, utilities, runners, and fakes remain shared in the parent package and `fake/`.
`DataReferenceTestHelper` shares car data, dropdown and card lookup, and table/card assertions
between the Pega 26 single-record and list-of-records scenarios; selection and submission logic
remain in each scenario.
Each test class passes its Pega version to `ComposeTest`, and each scenario declares its
case type with `@PegaCase`:

```kotlin
class CaseProcessingTest : ComposeTest(PegaVersion.v24_1_0) {
    @Test
    @PegaCase("DIXL-MediaCo-Work-SDKTesting")
    fun test_case_processing_sdk_testing() = runAndroidTest {
        onNodeWithText("New Service").performClick()
        // Scenario interactions and assertions.
    }
}
```

`ComposeTest.setUp()` initializes the mock client, WebView engine, injector, and app content
before the scenario body runs. Missing or blank case annotations fail explicitly.
The shared runner captures screenshots on scenario failures and retries with a fresh Compose
environment and a complete setup/teardown lifecycle. Two attempts are the default; pass
`maxAttempts = 1` to disable retries.

Each version package can be run independently by setting the instrumentation package filter,
for example on a connected device:

```bash
./gradlew :samples:android-cmp-app:connectedDebugAndroidTest \
  -Pandroid.testInstrumentationRunnerArguments.package=com.pega.constellation.sdk.kmp.samples.androidcmpapp.test.pega26
```

Run all versions by filtering on the parent `com.pega.constellation.sdk.kmp.samples.androidcmpapp.test`
package instead. Download the required local CDN assets first, as described in the
[mock response README](../../test/src/commonMain/composeResources/files/responses/README.md).
