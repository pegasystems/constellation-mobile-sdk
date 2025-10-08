## Constellation SDK - iOS Sample Application

Project contains iOS sample application that demonstrates the usage of the SDK.

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

Now, you should be able to run the application on iOS simulator using Android Studio or XCode.

### Integration with existing application

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
