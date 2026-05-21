## How to integrate Android Compose applications with Constellation SDK

1. [Prerequisites](#1-prerequisites)
2. [Setup Gradle dependencies](#2-setup-gradle-dependencies)
3. [Kotlin code changes](#3-kotlin-code-changes)


### 1. Prerequisites

- minSdk version
    - minSdk needs to be >= 26

### 2. Setup Gradle dependencies

1. Build and publish SDK dependencies in the Maven Local repository

- Clone the SDK code using Git.
- Check out to the desired version tag (e.g. `git checkout v3.0.0`)
- Open a console and run the following command in the root folder of the downloaded project:
    ```bash
    ./gradlew publishToMavenLocal
    ```
- Add a mavenLocal() entry to dependencyResolutionManagement in settings.gradle.kts so that the application loads dependencies from Maven Local:
    ```kotlin
      dependencyResolutionManagement {
          repositories {
              [...]
              mavenLocal() // add this line
          }
      }

    ```
2. Add dependencies to your app `build.gradle.kts` file.
    - Add the core, ui-renderer-cmp, ui-components-cmp and engine-webview module dependencies.
    - Add the OkHttp dependency, as it is required for the Android WebView engine implementation.
    - The SDK version can be found in the local Maven repository by running the command:

      ```bash
      ls ~/.m2/repository/com/pega/constellation/sdk/kmp/core
      ```
   Example output:

        ```bash 
        2.0.0				3.0.0				maven-metadata-local.xml
        2.0.1				3.0.1 
        ```

   build.gradle.kts example:

    ```kotlin
    val sdkVersion = "3.0.1"
    val okHttpVersion = "X.Y.Z" // use the desired version
    dependencies {
        implementation("com.pega.constellation.sdk.kmp:ui-components-cmp:$sdkVersion")
        implementation("com.pega.constellation.sdk.kmp:ui-renderer-cmp:$sdkVersion")
        implementation("com.pega.constellation.sdk.kmp:core:$sdkVersion")
        implementation("com.pega.constellation.sdk.kmp:engine-webview:$sdkVersion")
        implementation("com.squareup.okhttp3:okhttp:$okHttpVersion")
    }
    ```

### 3. Kotlin code changes

1. Inject application context in `Activity.onCreate` or `Application.onCreate` method:
    ```kotlin
    AppContext.init(this)
    ```

2. Create an AndroidWebViewEngine
    - AndroidWebViewEngine needs a few parameters:
        - context — activity context. It is required for WebView initialization and operation.
        - scope — coroutine scope. E.g.: lifecycleScope of the activity can be used.
        - okHttpClient — instance of OkHttpClient which will be used by the engine to perform DX network requests.
        - nonDxOkHttpClient — (optional) instance of OkHttpClient which will be used to perform non-DX network requests.
    ```kotlin
    val httpClient = buildHttpClient()
    val engine = AndroidWebViewEngine(context, scope, httpClient)
    ```

   In order to authenticate with Pega Server, an OAuth 2.0 token needs to be provided for each request.
   While creating the okHttpClient instance, add a custom interceptor which will add the "Authorization" header:
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

3. Create a ConstellationSdkConfig
    - It requires a pegaUrl parameter which is the URL of the Pega Server instance.
    - An optional componentManager instance can be passed to provide custom implementations of components. (see: [Creating new components](../core/README.md#creating-new-components))
    - An optional debuggable flag can be set to debug the underlying WebView engine
    ```kotlin
    val config = ConstellationSdkConfig(
        pegaUrl = "https://insert-url-here.example/prweb"
    )
    ```

4. Create an SDK instance with the config and engine
    ```kotlin
    val sdk = ConstellationSdk.create(config, engine)
    ```
5. Create a new case
    - To create a new case, call the createCase method on the ConstellationSdk instance.
    - It requires a caseClassName parameter which is the name of the Case Type class to be created, e.g. "DIXL-MediaCo-Work-NewService".

    ```kotlin
    sdk.createCase(caseClassName)
    ```

6. Render the form

    - The SDK provides several states that can be observed for seamless UI integration.
    - Listen for state changes to automatically update the user interface:
        - Initial - first state produced by the SDK
        - Loading - indicates that the form is loading
        - Ready - form is ready to be displayed
        - Error - the form could not be loaded due to errors.
        - Finished - form processing finished
        - Cancelled - form processing cancelled by user

    ```kotlin
    @Composable
    fun PegaForm(sdk: ConstellationSdk) {
        val state by sdk.state.collectAsState()
        when (val s = state) {
            is ConstellationSdk.State.Initial -> {}
            is ConstellationSdk.State.Loading -> SomeLoader()
            is ConstellationSdk.State.Ready -> s.root.Render()
            is ConstellationSdk.State.Error -> SomeErrorSnackBar()
            is ConstellationSdk.State.Finished -> SomeSnackBar()
            is ConstellationSdk.State.Cancelled -> SomeCancelSnackBar()
        }
    }
    ```
   The Constellation SDK focuses primarily on delivering a component tree to the user, which contains all the information needed for correct rendering.
   Additionally, to accelerate implementation, the SDK provides helper functions for rendering these components.
   To render the entire tree, it is sufficient to call the Render method on the root object found in the Ready state (as shown in the code above).

### See also

See [How to integrate Compose Multiplatform App with Constellation SDK](../docs/how-to-integrate-compose-multiplatform.md)

See [How to integrate iOS SwiftUI applications with Constellation SDK](../docs/how-to-integrate-ios-swiftui.md)

See [How to run Android Sample Application (based on Sample CMP Shared Module)](../samples/android-cmp-app/README.md)

See [How to run iOS Sample Application (based on Sample CMP Shared Module)](../samples/ios-cmp-app/README.md)

See [Sample CMP Shared Module](../samples/base-cmp-app/README.md)

See [Compose Android Sample Application](../samples/android-compose-app/README.md)

## More documentation

For more detailed information, please refer to the [Constellation SDK Core documentation](../core/README.md).

