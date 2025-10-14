## Constellation SDK - Android Compose Sample Application

- [Configuration](#configuration)
- [Running the application](#running-the-application)

Project contains Android sample application that demonstrates the usage of the SDK.

### Configuration

To run the sample application, you need to provide necessary configuration: [SDKConfig.kt](./src/main/java/com/pega/mobile/androidcompose/AndroidSDKConfig.kt)

```kotlin
object AndroidSDKConfig {
    ...
    const val PEGA_URL = "https://insert-url-here.example/prweb"
    const val PEGA_VERSION = "24.1.0" // replace with correct Pega version if necessary
    const val PEGA_CASE_CLASS_NAME = "DIXL-MediaCo-Work-NewService" // replace with correct case type name if necessary
    const val AUTH_TOKEN = "Bearer token_encoded_value"
}
```

### Running the application

Now, run the application on your Android device or emulator using Android Studio.
