# How to integrate iOS SwiftUI applications with Constellation SDK 


Integration with SwiftUI applications is demonstrated in the README of iOS sample application.

### Preventing WebView throttling

On iOS, a `WKWebView` that is created by `WKWebViewBasedEngine` must remain in the
view hierarchy while the SDK is processing a case. Otherwise, iOS may throttle the
WebView and make the form unusably slow. Keep the engine WebView in the hierarchy
even when the form is rendered by SwiftUI:

```swift
import SwiftUI
import UIKit
import ConstellationSdk

struct EngineWebView: UIViewRepresentable {
    private let webView: UIView

    init(_ engine: WKWebViewBasedEngine) {
        webView = engine.webView
    }

    func makeUIView(context: Context) -> UIView {
        webView
    }

    func updateUIView(_ uiView: UIView, context: Context) {}
}
```

Add the wrapper alongside the SDK state view, using a small invisible frame:

```swift
VStack(spacing: 0) {
    EngineWebView(engine)
        .frame(height: 1)
        .opacity(0)
    StateView(wrapper: wrapper)
}
```

Remove or destroy the engine when the containing view is dismissed.

### Prerequisites

- JDK 17 or newer to run Gradle
- Gradle `9.4.0` through the SDK's Gradle Wrapper when building the framework locally
- Xcode and macOS for framework compilation and iOS application builds

See [SwiftUI Components Sample Application](../samples/swiftui-components-app/README.md).

### See also

See [How to integrate Compose Multiplatform App with Constellation SDK](../docs/how-to-integrate-compose-multiplatform.md)

See [How to integrate Android Compose App with Constellation SDK](../docs/how-to-integrate-android-compose.md)

See [How to run Android Sample Application (based on Sample CMP Shared Module)](../samples/android-cmp-app/README.md) 

See [How to run iOS Sample Application (based on Sample CMP Shared Module)](../samples/ios-cmp-app/README.md)

See [Sample CMP Shared Module](../samples/base-cmp-app/README.md)

See [Compose Android Sample Application](../samples/android-compose-app/README.md)

## More documentation

For more detailed information, please refer to the [Constellation SDK Core documentation](../core/README.md).
