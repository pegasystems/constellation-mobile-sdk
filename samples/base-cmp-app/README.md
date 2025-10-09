## Constellation SDK - Shared Multiplatform Module for Sample Applications

This module provides shared code for sample applications demonstrating the usage of Constellation SDK.

### Module contents

- [Shared configuration](./src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/SDKConfig.kt)
- [Shared UI](./src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/ui)
- [Shared data](./src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/data)
- [Custom components](./src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/ui/components/CustomComponents.kt)
- [Authentication using OpenID Connect](./src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/auth/AuthManager.kt)

For source code regarding the SDK usage, please refer to the [PegaViewModel.kt](./src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/ui/screens/pega/PegaViewModel.kt).


### Integration with existing CMP application (Android and iOS targets only)

Modules can be built locally and published to the local Maven repository using the following command:

```shell
./gradlew publishToMavenLocal
```

Then, dependencies can be declared using the following syntax:

```gradle
implementation("com.pega.constellation.sdk.kmp:ui-components-cmp:2.+")
implementation("com.pega.constellation.sdk.kmp:ui-renderer-cmp:2.+")
implementation("com.pega.constellation.sdk.kmp:engine-webview:2.+")
implementation("com.pega.constellation.sdk.kmp:core:2.+")
```

Remember to update the version number if you want to use a specific version of the SDK.

