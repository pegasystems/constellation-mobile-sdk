## Constellation SDK - Android Sample Application

- [Configuration](#configuration)
- [Running the application](#running-the-application)
- [Gradle integration](#gradle-integration)
- [Setting up kotlin sources](#adding-kotlin-sources-for-browsing-sdk-code-in-android-studio)

Project contains Android sample application that demonstrates the usage of the SDK.

### Configuration

To run the sample application, you need to provide necessary configuration: [SDKConfig.kt](../../samples/base-cmp-app/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/SDKConfig.kt)

```kotlin
object SDKConfig {
    ...
    const val PEGA_URL = "https://insert-url-here.example/prweb"
    ...
}
```

For more information about the configuration, please refer to the [Configuring sample mobile application](../../docs/configure-sample-mobile-apps.md) document.

### Running the application

Now, run the application on your Android device or emulator using Android Studio.

### Integration with existing application

Currently, the SDK is distributed using library AAR files.
They need to be downloaded into app/libs directory (or any other accessible by Gradle).
To use the AAR files, add in the Gradle app:

```kotlin
implementation(fileTree(mapOf("dir" to "libs", "include" to listOf("*.aar", "*.jar"))))
```

Additional SDK dependencies to *okhttp* and *webkit* need to be added because the AAR files do not
include them:

```kotlin
implementation(libs.okhttp)
implementation(libs.androidx.webkit)
```

> After the SDK is distributed through Maven in the future, these two dependencies can be removed from Gradle.

### Adding Kotlin sources for browsing SDK code in Android Studio

To be able to browse the SDK code in Android Studio, you need to download sdk-sources.jar file and place it 'android/libs' folder.
Then after opening any SDK class definition, you can click on the "Choose Sources..." link in the top right corner of the editor.
Find the sdk-sources.jar file and click "open". After that, you will be able to browse the SDK code in Android Studio.

sdk-sources.jar file can be downloaded from github releases page:<br>
https://github.com/pegasystems/constellation-mobile-sdk/releases

It can also be built from the source code by running the following command in the 'android' directory of the SDK:

```bash 
./gradlew :sdk:sourcesJar
