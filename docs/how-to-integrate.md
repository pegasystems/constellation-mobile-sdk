# How to integrate with Constellation SDK 

- [Compose Multiplatform (CMP) and Android Jetpack Compose applications](#compose-multiplatform-cmp-and-android-jetpack-compose-applications)
  1. [Prerequisites](#1-prerequisites)
  2. [Setup Gradle dependencies](#2-setup-gradle-dependencies)
  3. [Initialize the SDK](#3-initialize-the-sdk)
  4. [Create a new case](#4-create-a-new-case)
  5. [Render the form](#5-render-the-form)
- [iOS Swift UI applications](#ios-swift-ui-applications)

## Compose Multiplatform (CMP) and Android Jetpack Compose applications

### 1. Prerequisites

- Xcode 16.4
   - In order to work with Xcode 26 you need to upgrade (gradle/libs.versions.toml) Kotlin to pre-release `2.2.21-RC2` version. Please bear in mind that this is an RC version — some features may not work as expected.
  
### 2. Setup Gradle dependencies

1. Build and publish SDK dependencies in Maven Local repository

- Clone the SDK code using Git.
- Checkout to desired version tag (e.g. `git checkout v2.0.0`)
- Open console and run the following command in the root folder of the downloaded project:
    ```bash
    ./gradlew publishToMavenLocal
    ```
   
2. Add the following dependencies to your app `build.gradle.kts` file:

- For Compose Multiplatform application:
    ```kotlin
    kotlin {
        sourceSets {
            val sdkVersion = "X.Y.Z" // use the desired version
            val okHttpVersion = "X.Y.Z" // use the desired version
            commonMain {
                dependencies {
                    // add the following dependencies
                    implementation("com.pega.constellation.sdk.kmp:core:$sdkVersion")
                    implementation("com.pega.constellation.sdk.kmp:ui-renderer-cmp:$sdkVersion")
                    implementation("com.pega.constellation.sdk.kmp:ui-components-cmp:$sdkVersion")
                }
            }
            androidMain {
                dependencies {
                    // add the following dependencies
                    implementation("com.pega.constellation.sdk.kmp:engine-webview:$sdkVersion")
                    implementation("com.squareup.okhttp3:okhttp:$okHttpVersion")
                }
            }
            iosMain {
                dependencies {
                    // add the following dependencies
                    implementation("com.pega.constellation.sdk.kmp:engine-webview:$sdkVersion")
                }
            }
        }
    }
    ```

- For Android Jetpack Compose application:
    ```kotlin
    val sdkVersion = "X.Y.Z" // use the desired version
    val okHttpVersion = "X.Y.Z" // use the desired version
    dependencies {
        implementation("com.pega.constellation.sdk.kmp:ui-components-cmp:$sdkVersion")
        implementation("com.pega.constellation.sdk.kmp:ui-renderer-cmp:$sdkVersion")
        implementation("com.pega.constellation.sdk.kmp:core:$sdkVersion")
        implementation("com.pega.constellation.sdk.kmp:engine-webview:$sdkVersion")
        implementation("com.squareup.okhttp3:okhttp:$okHttpVersion")
    }
    ```

### 3. Initialize the SDK

1. Inject application context in `Activity.onCreate` or `Application.onCreate` method:
    ```kotlin
    AppContext.init(this)
    ```
2. Create SDK configuration
    ```kotlin
    val config = ConstellationSdkConfig(
        pegaUrl = "https://insert-url-here.example/prweb",
        pegaVersion = "24.1.0"
    )
    ```
   
3. Create SDK engine in platform-specific way:

    - In androidMain for CMP apps and for Android native application:
    ```kotlin
    val httpClient = buildHttpClient()
    val engine = AndroidWebViewEngine(context, httpClient)
    ```
    In order to authenticate with Pega Server OAuth 2.0 token needs to be provided for each request. 
    While creating okHttpClient instance add custom interceptor which will add "Authorization" header
    ```kotlin
   
    private fun buildHttpClient() =
        AndroidWebViewEngine.defaultHttpClient()
            .newBuilder()
            .addInterceptor(AuthInterceptor())
            .build()
   
    class AuthInterceptor : Interceptor {
        override fun intercept(chain: Interceptor.Chain): Response {
           val token = "TOKEN_HERE" // e.g. "Bearer some_encoded_value"
           val newRequest = chain.request().newBuilder()
               .header("Authorization", token)
               .build()
            return chain.proceed(newRequest)
        }
    }
    ```

    - in iosMain for CMP apps:
    ```kotlin
     val provider: ResourceProvider // provide your own implementation of ResourceProvider
     val engine = WKWebViewBasedEngine(provider)
    ```
   In order to authenticate with Pega Server OAuth 2.0 token needs to be provided for each request in ResourceProvider.


4. Create SDK instance
    ```kotlin
    val sdk = ConstellationSdk.create(config, engine)
    ```

### 4. Create a new case

To create a new case, call the *createCase* method on the *ConstellationSdk* instance:

```kotlin
sdk.createCase(caseClassName)
```

where:
- **caseClassName** — Name of the Case Type class to be created, e.g. "DIXL-MediaCo-Work-NewService"

### 5. Render the form

The SDK provides several states that can be observed for seamless UI integration.

Listen for state changes to automatically update the user interface:

```kotlin
@Composable
fun PegaForm() {
    val state by sdk.state.collectAsState()
    when (state) {
        is Loading -> SomeLoader()
        is Ready -> state.root.Render()
    }
}
```

### See also

See [How to run Android Sample Application (based on Sample CMP Shared Module)](../samples/android-cmp-app/README.md) 

See [How to run iOS Sample Application (based on Sample CMP Shared Module)](../samples/ios-cmp-app/README.md)

See [Sample CMP Shared Module](../samples/base-cmp-app/README.md)

See [Compose Android Sample Application](../samples/android-compose-app/README.md)

## IOS Swift UI applications

Integration with Swift UI applications is demonstrated in the README of IOS sample application.

See [SwiftUI Components Sample Application](../samples/swiftui-components-app/README.md).

## More documentation

For more detailed information, please refer to the [Constellation SDK Core documentation](../core/README.md).

