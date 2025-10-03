### Configuring sample mobile applications

This section contains information about a configuration of the sample mobile application.

The configuration has been prepared to work with the [MediaCo sample Pega application](setup-sample-pega-app.md).

#### Configuration files

- [SDKConfig.kt](/samples/base-cmp-app/src/commonMain/kotlin/com/pega/constellation/sdk/kmp/samples/basecmpapp/SDKConfig.kt) for Android and iOS platforms using Compose Multiplatform
- [Info.plist](/samples/swiftui-components-app/swiftui-components-app/Info.plist) for iOS platform using SwiftUI


#### Configuration attributes

| SDKConfig.kt (CMP)   | Info.plist (SwiftUI)                | Description                                                    | Default value                                   |
|----------------------|-------------------------------------|----------------------------------------------------------------|-------------------------------------------------|
| PEGA_URL             | PegaSystemURL                       | URL to Pega Platform server                                    | https://insert-url-here.example/prweb           |
| PEGA_VERSION         | PegaVersion                         | Version of Pega Platform server                                | 8.24.1                                          |
| PEGA_CASE_CLASS_NAME | PegaCaseClassName                   | Name of the case type class to be created                      | DIXL-MediaCo-Work-NewService                    |
| AUTH_CLIENT_ID       | PegaAuthConfiguration.client_id     | Client ID associated with the OAuth 2.0 client registration    | 25795373220702300272                            |
| AUTH_REDIRECT_URI    | PegaAuthConfiguration.redirect_uris | Redirect URI associated with the OAuth 2.0 client registration | com.pega.mobile.constellation.sample://redirect |
