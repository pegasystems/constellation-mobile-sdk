---
name: cmp-app-integration
description: Rules and workflow for integrating Constellation Mobile SDK into a Compose Multiplatform application
---
You are an interactive assistant.
You have to ask all questions mentioned in the instruction. You cannot skip any of them.
Ask a series of questions per each part of the instruction separately.
Your job is to integrate the Constellation Mobile SDK library (com.pega.constellation.sdk.kmp) with a client Compose Multiplatform application.
For SDK code, please browse https://github.com/pegasystems/constellation-mobile-sdk

To do that please follow below steps:

===== Instructions =====

### Gradle Part ###

1. Cloning and publishing library to Maven Local:
   In order to use this library user needs to have it published on Maven Local repository.
    - Clone the project - https://github.com/pegasystems/constellation-mobile-sdk. Ask user where he wants to put that project. By default use home directory.
    - Enter the project folder and run ./gradlew publishToMavenLocal

2. Setting up gradle in client application
    - Edit settings.gradle.kts file and add mavenLocal() to repositories.
    - Check if minSdk is >= 26, if not please set it to 26.
3. Add following dependencies to app build.gradle.kts in commonMain dependencies

   val sdkVersion = "<SDK_VERSION>"  // use newest version found in local maven.

   implementation("com.pega.constellation.sdk.kmp:ui-components-cmp:$sdkVersion")
   implementation("com.pega.constellation.sdk.kmp:ui-renderer-cmp:$sdkVersion")
   implementation("com.pega.constellation.sdk.kmp:core:$sdkVersion")
   implementation("com.pega.constellation.sdk.kmp:engine-webview:$sdkVersion")

4. Add the following dependency to androidMain dependencies:

   val okHttpVersion = "<OK_HTTP_VERSION>" //  use newest available version
   implementation("com.squareup.okhttp3:okhttp:$okHttpVersion")


### Android Part ###

1. Init AppContext:
    - Ask user for file where he wants to init AppContext. Inform him that we need to have access to activity context in that file.
      Suggest him that he can choose app main activity.
    - In provided file add:
      AppContext.init(this) (it should be imported from com.pega.constellation.sdk.kmp.ui.components.cmp.controls.form.internal.AppContext)
    - Ask user if he wants turn on debugging in SDK.

2. Create SDK engine:
    - Ask user where he wants to create AndroidWebViewEngine. Inform him that we need to have access to activity context in that file.
      Suggest him that he can choose app main activity.
    - Here is definition of AndroidWebViewEngine (in com.pega.constellation.sdk.kmp.engine.webview.android)
      ```kotlin
      class AndroidWebViewEngine(
          private val context: Context,
          private val scope: CoroutineScope,
          private val okHttpClient: OkHttpClient,
          private val nonDxOkHttpClient: OkHttpClient = defaultHttpClient()
      ) : ConstellationSdkEngine
      ```
    - For "context"  try to find object in current scope. If no object available ask user to provide it.
    - For "scope"  try to find object in current scope. It can be lifecycleScope of activity (if we are in activity class). (remember about import androidx.lifecycle.lifecycleScope)
      If no scope found ask user to provide one. If he does not provide any then create a scope.
    - For "okHttpClient" ask user for an instance. Explain that it is needed for Pega DX communication.
      If he does not provide any instance then create it for him using AndroidWebViewEngine.defaultHttpClient() method.
      If you are creating okHttpClient please ask user if he wants to have authentication interceptor for adding token to every request which is needed for authentication.
      example code:
      ```kotlin
      val httpClient = AndroidWebViewEngine.defaultHttpClient()
          .newBuilder()
          .addInterceptor(AuthInterceptor()) // add it only if client said so
          .build()
      ```
      example of AuthInterceptor:
      ```kotlin
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
      Leave "TOKEN_HERE" as dummy input. App developer will paste real token later.
    - For "nonDxOkHttpClient" ask user for an instance. Explain that it is needed for  Pega Non-DX communication (e.g: JS resources).
      Suggest that he can skip this argument.
    - Create AndroidWebViewEngine with specified parameters in previous steps.
      example of AndroidWebViewEngine:
      ```kotlin
      val engine = AndroidWebViewEngine(
          context = this,
          scope = this.lifecycleScope,
          okHttpClient = httpClient
      )
      ```

### iOS Part ###
1. Implement ResourceProvider in iosMain sourceset - ResourceProviderImpl
    - ResourceProvider needs to implement interface ResourceProvider (from com.pega.constellation.sdk.kmp.engine.webview.ios)
      Interface definition:
      ```kotlin
      interface ResourceProvider {
          fun shouldHandle(request: NSURLRequest): Boolean
          suspend fun performRequest(request: NSURLRequest): Pair<NSData, NSURLResponse>
      }
      ```
    - shouldHandle can simply return true
    - performRequest should use  NSURLSession.sharedSession to perform HTTP requests in suspendCoroutine.
    - performRequest should add "Authorization" header with "TOKEN_HERE" placeholder.

2. You have to ask user where he wants the ResourceProviderImpl object be created. You can suggest him to choose main ViewController.
3. Create WKWebViewBasedEngine with ResourceProviderImpl object as "provider" argument in the same place as chosen in 2.


### Multiplatform Part ###
1. Create new file called SDKConfig.kt with object SDKConfig.
    - Add const val PEGA_URL string property to keep information about Pega URL
    - Ask user for Pega server url. It should end with "prweb"

    - Add const val PEGA_CASE_CLASS_NAME string property to keep information about caseClassName
    - Ask user for "caseClassName" of the case he wants the app to create. This step is required and if nothing is provided then ask user to contact Pega server admin and ask again for "caseClassName".

    - Add const val AUTH_TOKEN string property with dummy value "TOKEN_HERE" to keep information about authentication token.
    - Please change "TOKEN_HERE" added in Android AuthInterceptor and iOS ResourceProviderImpl to SDKConfig.AUTH_TOKEN.


2.  Create ConstellationSdkConfig object with provided url and debuggable boolean:
    val config = ConstellationSdkConfig(pegaUrl = SDKConfig.PEGA_URL, debuggable=<DEBUGGABLE>) (ConstellationSdkConfig should be imported from com.pega.constellation.sdk.kmp.core)

3. Create ConstellationSdk instance
    - Ask user where he wants to create ConstellationSdk in his multiplatform code.
    - use ConstellationSdk.create method (from com.pega.constellation.sdk.kmp.core.ConstellationSdk companion object)
      example:
      val sdk = ConstellationSdk.create(config, engine)
    - ConstellationSdkEngine implementation needs to be passed to the place where ConstellationSdk instance is created.

4. Showing Pega form
    - Ask user to provide name of the button to show Pega form. If nothing is provided, create a button with the label "Create".
    - In button callback onClick call:
      sdk.createCase(SDKConfig.PEGA_CASE_CLASS_NAME).

5. Render form.
    - The SDK provides several states that can be observed for seamless UI integration.
      Listen for state changes to automatically update the user interface.
      ConstellationSdk.State definition: (in com.pega.constellation.sdk.kmp.core)
      ```kotlin
      interface ConstellationSdk {
          sealed class State {
              data object Initial : State()
              data object Loading : State()
              data class Ready(val environmentInfo: EnvironmentInfo, val root: RootContainerComponent) : State()
              data class Error(val error: EngineError) : State()
              data class Finished(val successMessage: String?) : State()
              data object Cancelled : State()
          }
      }
      ```
      use fun <C : Component> C.Render() for Ready state rendering. (in com.pega.constellation.sdk.kmp.ui.renderer.cmp)


        Example code:
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
        SomeLoader() is any loader in compose.
        SomeErrorSnackBar() is any snackbar with error message.
        SomeSnackBar() is any snackbar showing successMessage message.
        SomeCancelSnackBar is any snackbar saying case processing has been canceled.
    - Please add some padding around rendered root view - like 16 dp

### Final corrections part ###

1. Try to build android.
2. If any errors occur, try to add missing imports as the first fix.
3. Try to build ios.
4. If any errors occur, try to add missing imports as the first fix.
