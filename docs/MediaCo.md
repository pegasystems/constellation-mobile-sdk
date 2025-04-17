## Running SDK with MediaCo sample application

We strongly recommend that you set up the SDK to work with the MediaCo sample application before you try to get it working with your application. This helps validate the SDK installation with a known good application, and helps you avoid application-related errors during the initial setup.

### Steps

1. [Download the MediaCo sample application from Pega Marketplace.](https://community.pega.com/marketplace/component/react-sdk) Constellation Mobile SDK does not provide its own MediaCo RAP file yet, so please use the one from React SDK.
2. [Import the MediaCo sample application.](https://docs.pega.com/bundle/constellation-sdk/page/constellation-sdks/sdks/importing-mediaco-sample-application.html)
3. Open **MediaCo_ReactSDK** OAuth 2.0 client registration: *Dev Studio > Records > Security > OAuth 2.0 Client Registration*
    - Add redirect URI: `com.pega.mobile.constellation.sample://redirect`
    - Save the rule
4. Configure **Constellation Mobile SDK configuration** files:
    - [PegaConfig.kt](../android/app/src/main/java/com/pega/mobile/constellation/sample/PegaConfig.kt) for Android platform
    - [Info.plist](../ios/SampleApp/SampleNativeSwiftApp/Info.plist) for iOS platform
5. Run the sample mobile application in Android Studio or XCode.

### Constellation Mobile SDK configuration

This section contains the attributes necessary for connecting the SDK to the Pega Platform server.

| Android         | iOS                | Description                                                    | Default value                                         |
| --------------- | ------------------ | -------------------------------------------------------------- | ----------------------------------------------------- |
| URL             | PegaSystemURL      | URL to Pega Platform server                                    | https://insert-url-here.example/prweb                 |
| VERSION         | <not_configurable> | Version of Pega Platform server                                | 8.24.1                                                |
| CASE_CLASS_NAME | PegaCaseClassName  | Name of the case type class to be created                      | DIXL-MediaCo-Work-NewService                          |
| CLIENT_ID       | client_id          | Client ID associated with the OAuth 2.0 client registration    | 25795373220702300272                                  |
| REDIRECT_URI    | redirect_uris      | Redirect URI associated with the OAuth 2.0 client registration | com.pega.mobile.constellation.sample://redirect       |
