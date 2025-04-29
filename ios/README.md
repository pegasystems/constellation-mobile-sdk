
iOS
=================

Pega Constellation Mobile SDK

- [Project Structure](#project-structure)
- [Integration](#integration)
- [Overriding Component Providers](#overriding-component-providers)
- [Creating New Components](#creating-new-components)

Project Structure
-----------------

Pega Constellation Mobile SDK exposes the following classes to be used as main integration points:

* `PMSDKNetwork` - Controls network communications, holds weak reference to the delegate, which will perform network requests on behalf of SDK
* `PMSDKComponentManager` - Singleton, which holds the registry of default and custom component providers
* `PMSDKCreateCaseStartingFields` - Responsible for storage and coding of starting fields
* `PMSDKCreateCaseView` - SwiftUI view which handles case processing lifecycle.

Other public classes, like properties, views, and providers are present to perform handling of main inputs and to demonstrate reference implementation of various view components.

Integration
-----------

Before Case processing can be started, the application needs to provide a network request delegate. To do so, an instance of class implementing `PMSDKNetworkRequestDelegate` protocol shall be created.

`PMSDKNetworkRequestDelegate` requires two methods:
* `func shouldHandle(request: URLRequest) -> Bool` - Decides if the request should be handled. The main purpose of this function is to reject unwanted requests.
* `func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)` - Handles network requests asynchronously and returns data and the response.
   It is the responsibility of the enclosing application to handle authorization. Most Pega instances use OAuth2 protocol, so this method shall authorize requests with proper tokens and handle token expiration and refreshment processes.

Prepared network delegate shall be assigned to the `PMSDKNetwork` shared instance:
```swift
PMSDKNetwork.shared.requestDelegate = self
```

Optionally, `PMSDKCreateCaseViewDelegate` can be prepared. This delegate is notified during the Case processing lifecycle. The following methods are provided:

* `func createCaseView(_ view: PMSDKCreateCaseView, didFinishProcessingWith message: String?)` - Case processing finished with the optional success message.
* `func createCaseView(_ view: PMSDKCreateCaseView, didFailProcessingWith errorMessage: String)` - Case processing was not successful, with a mandatory error message.
* `func createCaseViewDidCancelProcessing(_ view: PMSDKCreateCaseView)` Case processing was canceled by user.

Some applications might need to provide values for starting fields. This can be done by initializing an instance of the `PMSDKCreateCaseStartingFields` Class and passing proper values to fields defined in the casetype model:

```swift
let startingFields = PMSDKCreateCaseStartingFields()
startingFields.set(value: "Johnny", forKey: "FirstName")
``` 

After all preparations are complete, `PMSDKCreateCaseView` can be created to perform actual Case creation and processing:

```swift
PMSDKCreateCaseView(
   pegaURL: <URL to Pega instance>,
   caseClass: <case class name>,
   startingFields: <starting fields|nil>,
   delegate: <delegate|nil>
)
```

Such a prepared `PMSDKCreateCaseView` can be presented inside SwiftUI `View`, or might be wrapped in `UIHostingController` to be presented in a UIKit - based application.

Refer to [ViewController.swift](./SampleApp/SampleNativeSwiftApp/ViewController.swift) for a sample implementation.

Overriding Component Providers
------------------------------
 
To customize the behavior of built-in components, it might be necessary to provide a custom provider. This can be done by overriding the existing component provider to perform custom handling.

For example, to override the appearance of the `TextInput` component, it is necessary to implement a custom SwiftUI view and render the contents of `TextInputProps` in the desired way.

Then, custom provider shall be implemented, overriding the built-in view with the custom one:

```swift
class CustomTextInputComponentProvider: TextInputComponentProvider {
    required init() {
        super.init()
        view = AnyView(CustomTextInput(properties: properties))
    }
}
```

The prepared provider shall be registered with `PMSDKComponentManager`:

```swift
PMSDKComponentManager.shared.register("TextInput") {
   CustomTextInputComponentProvider()
}
```

Refer [CustomTextInput.swift](./SampleApp/SampleNativeSwiftApp/Components/CustomTextInput.swift) for a sample implementation.

Creating New Components
-----------------------

If the component type used in the Case Type definition is not supported by the SDK, it will be shown as "Component not supported" during Case processing. This indicates the necessity of full component implementation. Such implementation consists of:

* JavaScript Component - Handles state and emits component properties
* Component Properties - Transfers state from JavaScript to native side
* Component View - Shows graphical representation of the state
* Component Provider - Keeps reference to the Component View and updates it when a new state is emitted from the Javascript Component.

The JavaScript Component shall be prepared first. Refer to [slider.component.js](./SampleApp/SampleNativeSwiftApp/Components/Slider/slider.component.js) for an example. [PCore and PConnect public API documentation](https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/using-pcore-pconnect-public-apis.html) can also be useful.

Component Properties shall reflect the model defined by the JavaScript component. For convenience, it can be split into the `Decodable` part, responsible for decoding of received properties, and the observable (`ObservableObject`) part, used as the state of view. A sample implementation of this concept can be found in [CustomSliderProps.swift](./SampleApp/SampleNativeSwiftApp/Components/Slider/CustomSliderProps.swift) file.

The Component View represents the received state graphically and is responsible for coordinating any state changes (for example, caused by user interactions) with the Provider. Provider then emits such events to the JavaScript side.

Sample implementation of the Component Provider and the View can be found in [CustomSlider.swift](./SampleApp/SampleNativeSwiftApp/Components/Slider/CustomSlider.swift).

After the component implementation is prepared, it needs to be registered in the Component Manager:

```swift
try PMSDKComponentManager.shared.register(
   "MyCompany_MyLib_Slider",
   jsFile: Bundle.main.url(forResource: "slider.component", withExtension: "js")!
) {
   CustomSliderProvider()
}
``` 

During registration, the Component Manager verifies that the provided JavaScript file is accessible, and in the case of a negative result throws `PMSDKComponentManagerError`.
