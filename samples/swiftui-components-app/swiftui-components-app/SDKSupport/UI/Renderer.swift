import SdkEngineWebViewKit
import SwiftUI

extension Component {
    @ViewBuilder
    func render() -> any View {
        switch self {
        case let alert as AlertBannerComponent:
            AlertBannerView(alert)
        case let buttons as ActionButtonsComponent:
            ActionButtonsComponentView(buttons)
        case let card as AssignmentCardComponent:
            AssignmentCardComponentView(card)
        case let form as DefaultFormComponent:
            DefaultFormView(form)
        case let field as FieldComponent:
            FieldViewWrapper(field) {
                field.render()
            }
        case let fieldGroupTemplate as FieldGroupTemplateComponent:
            FieldGroupTemplateComponentView(fieldGroupTemplate)
        case let root as RootContainerComponent:
            RootContainer(root)
        case let simpleTable as SimpleTableComponent:
            SimpleTableComponentView(simpleTable)
        case let flowContainer as FlowContainerComponent:
            FlowContainerComponentView(flowContainer)
        case let view as ViewComponent: ViewComponentView(view)
        case let region as RegionComponent: Container(region)
        case let container as ContainerComponent: Container(container)
        case let unsupported as UnsupportedComponent:
            UnsupportedComponentView(unsupported)
        default: createUnsupported()
        }
    }

    func renderView() -> AnyView {
        AnyView(render())
    }

    fileprivate func createUnsupported() -> AnyView {
        UnsupportedComponent.Companion().create(
            context: context,
            cause: UnsupportedComponent.Cause.missingComponentRenderer
        ).renderView()
    }
}

extension FieldComponent {
    @ViewBuilder
    func render() -> any View {
        switch self {
        case let checkbox as CheckboxComponent:
            CheckboxComponentView(checkbox)
        case let currency as CurrencyComponent:
            CurrencyComponentView(currency)
        case let date as DateComponent:
            DateComponentView(date)
        case let dateTime as DateTimeComponent:
            DateTimeComponentView(dateTime)
        case let dropdown as DropdownComponent:
            DropdownComponentView(dropdown)
        case let phone as PhoneComponent:
            PhoneNumberView(phone)
        case let radioButton as RadioButtonsComponent:
            RadioButtonsComponentView(radioButton)
        case let textArea as TextAreaComponent:
            TextAreaComponentView(textArea)
        case let textInput as TextInputComponent:
            TextInputComponentView(textInput)
        case let integer as IntegerComponent:
            TextInputComponentView(integer, keyboardType: .numberPad)
        case let decimal as DecimalComponent where decimal.decimalPrecision == 0:
            TextInputComponentView(decimal, keyboardType: .numberPad)
        case let decimal as DecimalComponent:
            TextInputComponentView(decimal, keyboardType: .decimalPad)
        case let email as EmailComponent:
            TextInputComponentView(email, keyboardType: .emailAddress)
                .disableAutocorrection(true)
                .autocapitalization(.none)
        case let url as UrlComponent:
            TextInputComponentView(url, keyboardType: .URL)
                .disableAutocorrection(true)
                .autocapitalization(.none)
        case let time as TimeComponent:
            TimeComponentView(time)
        default: createUnsupported()
        }
    }
}
