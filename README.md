## Pega Constellation Mobile SDK

## Overview

The **Pega Constellation Mobile SDK** is designated for Native Android and iOS applications.
It allows to embed Pega form into existing application with the possibility of using customized UI.
SDK allows to add new components for not supported or custom components.

It utilizes Constellation Core JavaScript library and JavaScript components logic.
JavaScript common code runs in hidden WebView which is used only as JS engine.

### Supported Pega use-case

Currently SDK supports creating new case of given type and processing assignment.

### Supported components

#### Fields
- Checkbox
- Currency
- Date
- Dropdown
- Email
- Integer
- Phone
- RadioButtons
- TextArea
- TextInput
- Url

#### Containers
- Assignment
- AssignmentCard
- DefaultForm
- FlowContainer
- Region
- RootContainer
- View
- ViewContainer

#### Other
- ActionButtons
- AlertBanner

## Get started ##

#### [Getting started with the SDKs](https://docs.pega.com/bundle/constellation-sdk/page/constellation-sdks/sdks/installing-configuring-constellation-sdks.html)

#### [Integration with Android applications](android/README.md)

#### [Integration with iOS applications](ios/README.md)

#### [Setting up sample Pega application](docs/setup-sample-pega-app.md)

#### [Configuring sample mobile application](docs/configure-sample-mobile-app.md)

## License

Sources of this repository are licensed using [**Apache 2 license**](./LICENSE).
