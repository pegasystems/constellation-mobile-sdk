## Constellation SDK - Android Sample Application using base CMP module

- [Configuration](#configuration)
- [Running the application](#running-the-application)
- [ Integration of CMP module with Native Compose application](#integration-of-cmp-module-with-native-compose-application)

Project contains Android sample application that demonstrates the usage of the SDK.

### Configuration

To run the sample application, you need to provide necessary configuration: [SDKConfig.kt](../../samples/base-cmp-app/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/SDKConfig.kt)

```kotlin
object SDKConfig {
    ...
    const val PEGA_URL = "https://insert-url-here.example/prweb"
    const val PEGA_VERSION = "24.1.0" // replace with correct Pega version if necessary
    const val PEGA_CASE_CLASS_NAME = "DIXL-MediaCo-Work-NewService" // replace with correct case type name if necessary
    const val AUTH_CLIENT_ID = "13225896606129931937" // replace with correct client id if necessary
    const val AUTH_REDIRECT_URI = "com.pega.mobile.constellation.sample://redirect" // replace with correct redirect uri if necessary
}
```

For more information about the configuration, please refer to the [Configuring sample mobile application](../../docs/configure-sample-mobile-apps.md) document.

### Running the application

Now, run the application on your Android device or emulator using Android Studio.

### Integration of CMP module with Native Compose application

The application depends on the module [base-cmp-app](../base-cmp-app) that contains shared code in Kotlin Multiplatform.

It exposes:
- MediaCoApp composable function that can be used directly in Compose to display MediaCo application.
- Injector for dependency injection 
- AuthManager for managing authentication.
