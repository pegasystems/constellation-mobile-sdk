## Quick start with Constellation SDK

- [1. Initialize the SDK](#1-initialize-the-sdk)
- [2. Create a new case](#2-create-a-new-case)
- [3. Render the form](#3-render-the-form)

### 1. Initialize the SDK

1. Create SDK configuration
    ```kotlin
    val config = ConstellationSdkConfig(
        pegaUrl = "https://insert-url-here.example/prweb",
        pegaVersion = "24.1.0"
    )
    ```
   
2. Create SDK engine in platform-specific way:

   - For Android:
   ```kotlin
   val httpClient = AndroidWebViewEngine.defaultHttpClient() // or provide your own instance of OkHttpClient
   val engine = AndroidWebViewEngine(context, httpClient)
   ```

   - For iOS:
   ```kotlin
    val provider: ResourceProvider // provide your own implementation of ResourceProvider
    val engine = WKWebViewBasedEngine(provider)
   ```

3. Create SDK instance
   ```kotlin
   val sdk = ConstellationSdk.create(config, engine)
   ```

### 2. Create a new case

To create a new case, call the *createCase* method on the *ConstellationSdk* instance:

```kotlin
sdk.createCase(caseClassName)
```

where:
- **caseClassName** — Name of the Case Type class to be created, e.g. "DIXL-MediaCo-Work-NewService"

### 3. Render the form

The SDK provides several states that can be observed for seamless UI integration.

Listen for state changes to automatically update the user interface:

```kotlin
@Composable
fun PegaForm(state: ConstellationSdk.State) {
    when (state) {
        is Loading -> Loader()
        is Ready -> state.root.Render()
    }
}
```

### More information

For more detailed information, please refer to the [Constellation SDK Core documentation](../core/README.md).

