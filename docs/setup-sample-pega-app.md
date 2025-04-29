## Setting up MediaCo sample Pega application

We strongly recommend that you set up the SDK to work with the MediaCo sample Pega application before you try to get it working with your application. This helps validate the SDK installation with a known good application, and helps you avoid application-related errors during the initial startup.

### Steps

1. [Download the MediaCo sample Pega application from Pega Marketplace.](https://community.pega.com/marketplace/component/react-sdk) Constellation Mobile SDK does not provide its own MediaCo RAP file yet, so please use the one from React SDK.
2. [Import the MediaCo sample Pega application.](https://docs.pega.com/bundle/constellation-sdk/page/constellation-sdks/sdks/importing-mediaco-sample-application.html)
3. Open and edit **MediaCo_ReactSDK** OAuth 2.0 client registration:
    - *Dev Studio > Records > Security > OAuth 2.0 Client Registration*
    - Add redirect URI: `com.pega.mobile.constellation.sample://redirect`
    - Save the rule
4. [Configure sample mobile application.](./configure-sample-mobile-app.md)
5. Run the sample mobile application in Android Studio or XCode.

