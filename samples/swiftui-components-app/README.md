## SwiftUI Components Sample Application

### Overview

The purpose of this application is to demonstrate how a multiplatform model can be
integrated into a native application and rendered using SwiftUI.

### Configuration

The application can be configured via parameters in the `Info.plist` file. These
properties are read by static methods of the `SDKConfiguration` class and passed
during the multiplatform SDK initialization in `ConstellationSdkConfig`.

### Multiplatform Framework

The `Compile multiplatform framework` phase in the target definition triggers the
compilation of a cross-platform umbrella framework that includes all required Kotlin
projects. This phase should invoke the top-level Kotlin project required—in this case,
`:engine-webview`, which contains the WebView-based engine and also exports the `:core`
project. If a different engine implementation is needed, this phase should be adjusted
accordingly.

### Building locally XCFramework

In order to build the XCFramework with SDK locally (WebView based engine and Core modules) please run the following command in the root of the project:


```bash
# release build
./gradlew :engine-webview:assembleConstellationSdkReleaseXCFramework

# debug build
./gradlew :engine-webview:assembleConstellationSdkDebugXCFramework
```

The XCFramework can be used in the sample app `swiftui-components-app`. To do so, first remove the existing `Compile multiplatform framework` run script build phase.

### Key Components

This section highlights important files, classes, and structures to help you understand
interoperability between the multiplatform library and native iOS code.

#### [Renderer](./swiftui-components-app/SDKSupport/UI/Renderer.swift)

Provides an extension to the `Component` class, adding the `renderView()` function. This
function returns a preconfigured SwiftUI view for a given multiplatform component class.

#### [SDKWrapper](./swiftui-components-app/SDKSupport/Utils/SDKWrapper.swift)

Demonstrates how the Kotlin-provided `FlowState`, which emits the `SDKState` class, can be
translated to a Combine Publisher that emits an enum-based `SDKState`. It leverages the
[Collector](./swiftui-components-app/SDKSupport/Utils/Collector.swift) class, which
implements `FlowCollector` to bind to the Kotlin `collect` function.

#### [ViewController](./swiftui-components-app/ViewController.swift)

Shows how to initialize the cross-platform SDK and observe and respond to its state changes.
