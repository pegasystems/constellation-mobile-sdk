## Constellation SDK - iOS Sample Application using base CMP module

Project contains iOS sample application that demonstrates the usage of the SDK.

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

Now, you should be able to run the application on iOS simulator using Android Studio or XCode.

### Integration of CMP module with Native Swift UI application

The application depends on the module [base-cmp-app](../base-cmp-app) that contains shared code in Kotlin Multiplatform.
This shared module is distributed as a framework and connected to the iOS application using Gradle.

It exposes MediaCoViewController class that can be used directly in swift to display the MediaCo application.

```swift
import UIKit
import SwiftUI
import BaseCmpApp

struct ComposeView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIViewController {
        return MediaCoViewControllerKt.MediaCoViewController()
    }

    func updateUIViewController(_ uiViewController: UIViewController, context: Context) {}
}

struct ContentView: View {
    var body: some View {
        ComposeView()
            .ignoresSafeArea()
    }
}
```

More information: https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-direct-integration.html
