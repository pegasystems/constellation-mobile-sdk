
Constellation SDK
=================

Pega Constellation Mobile SDK

- [Project Structure](#project-structure)
- [Integration](#integration)
- [Overriding Component Providers](#overriding-component-providers)
- [Creating New Components](#creating-new-components)

Project Structure
-----------------

Pega Constellation Mobile SDK exposes following classes to be used as main integration points:

* `PMSDKNetwork` - controls network communication, holds weak reference to the delegate, which will perform network requests on behalf of SDK
* `PMSDKComponentManager` - singleton, which holds registry of default and custom component providers
* `PMSDKCreateCaseStartingFields` - responsible for storage and coding of starting fields
* `PMSDKCreateCaseView` - SwiftUI view which handles case processing lifecycle.

Other public classes, like properties, views and providers are present to perform handling of main inputs and to demonstrate reference implementation of various components.

Integration
-----------

Before case processing can be started, application needs to provide network request delegate. To do so, an instance of class implementing `PMSDKNetworkRequestDelegate` protocol shall be created.

`PMSDKNetworkRequestDelegate` requires two methods:
* `func shouldHandle(request: URLRequest) -> Bool` - decides whether or not the request should be handled. Main purpose of this function is to reject unwanted requests.
* `func performRequest(_ request: URLRequest) async throws -> (Data, URLResponse)` - handles network requests asynchronously and returns data and response.
   It is responsibility of enclosing application to handle authorisation. Most Pega instances use OAuth2 protocol, so this method shall authorize requests with proper tokens and handle token expiration and refreshment processes.

Prepared network delegate shall be assigned to the `PMSDKNetwork` shared instance:
```swift
PMSDKNetwork.shared.requestDelegate = self
```

Optionally, `PMSDKCreateCaseViewDelegate` can be prepared. This delegate is notified during case processing lifecycle. Following methods are provided:

* `func createCaseView(_ view: PMSDKCreateCaseView, didFinishProcessingWith message: String?)` - case processing finished with optional success message.
* `func createCaseView(_ view: PMSDKCreateCaseView, didFailProcessingWith errorMessage: String)` - case processing was not successful, with mandatory error message.
* `func createCaseViewDidCancelProcessing(_ view: PMSDKCreateCaseView)` case processing was cancelled by user.

Some applications might need to provide values for starting fields. This can be done by initialising an instance of `PMSDKCreateCaseStartingFields` class and passing proper values to fields defined in casetype model:

```swift
let startingFields = PMSDKCreateCaseStartingFields()
startingFields.set(value: "Johnny", forKey: "FirstName")
``` 

Once all preparations is complete, `PMSDKCreateCaseView` can be created to perform actual case processing:

```swift
PMSDKCreateCaseView(
   pegaURL: <URL to Pega instance>,
   caseClass: <case class name>,
   startingFields: <starting fields|nil>,
   delegate: <delegate|nil>
)
```

Such prepared `PMSDKCreateCaseView` can be presented inside SwiftUI `View`, or might be wrapped in `UIHostingController` to be presented in UIKit - based application.

Please refer to [ViewController.swift](./SampleApp/SampleNativeSwiftApp/ViewController.swift) for sample implementation.

Overriding Component Providers
------------------------------
 
To customize behaviour of built-in components, it might be necessary to provide custom provider. This can be done by overriding existing component provider to perform custom handling.

For example, to override appearance of `TextInput` component, it is necessary to implement custom SwiftUI view and render contents of `TextInputProps` in desired way. 

Then, custom provider shall be implemented, overriding built-in view with custom one:

```swift
class CustomTextInputComponentProvider: TextInputComponentProvider {
    required init() {
        super.init()
        view = AnyView(CustomTextInput(properties: properties))
    }
}
```

Prepared provider shall be registered with `PMSDKComponentManager`:

```swift
PMSDKComponentManager.shared.register("TextInput") {
   CustomTextInputComponentProvider()
}
```

Please refer [CustomTextInput.swift](./SampleApp/SampleNativeSwiftApp/Components/CustomTextInput.swift) for sample implementation.

Creating New Components
-----------------------

If component type used in case type definition is not supported by SDK, it will be shown as "Component not supported" during case processing. This indicates necessity of full component implementation. Such implementation consists of:

* JavaScript Component - handles state and emits component properties
* Component Properties - transfers state from JavaScript to native side
* Component View - shows graphical representation of the state
* Component Provider - keeps reference to the Component View and updates it when new state is emitted from Javascript Component.

Javascript component shall be prepared first. Refer [slider.component.js](./SampleApp/SampleNativeSwiftApp/Components/Slider/slider.component.js) for example. [PCore and PConnect public API documentation](https://docs.pega.com/bundle/pcore-pconnect/page/pcore-pconnect-public-apis/api/using-pcore-pconnect-public-apis.html) can also be useful.

Component properties shall reflect model defined by JavaScript component. For convenience, it can be splitted to `Decodable` part, responsible for decoding of received properties, and observable (`ObservableObject`) part, used as the state of view. Sample implementation of this concept can be found in [CustomSliderProps.swift](./SampleApp/SampleNativeSwiftApp/Components/Slider/CustomSliderProps.swift) file.

View represents received state graphically and is responsible to coordinate any state changes (for example, caused by user interactions) with the Provider. Provider then emits such events to the Javascript side.

Sample implementation of component provider and view can be found in [CustomSlider.swift](./SampleApp/SampleNativeSwiftApp/Components/Slider/CustomSlider.swift).

Once component implementation is prepared, it needs to be registered in the Component Manager:

```swift
try PMSDKComponentManager.shared.register(
   "MyCompany_MyLib_Slider",
   jsFile: Bundle.main.url(forResource: "slider.component", withExtension: "js")!
) {
   CustomSliderProvider()
}
``` 

During registration, Component Manager verifies is provided JavaScript file accessible, and in case of negative result, throws `PMSDKComponentManagerError`.
