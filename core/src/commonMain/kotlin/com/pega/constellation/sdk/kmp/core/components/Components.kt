package com.pega.constellation.sdk.kmp.core.components

import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ActionButtons
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.AlertBanner
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Assignment
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.AssignmentCard
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Checkbox
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Currency
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Date
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.DateTime
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Decimal
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.DefaultForm
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Dropdown
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Email
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.FieldGroupTemplate
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.FlowContainer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Integer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.OneColumn
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Phone
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RadioButtons
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Region
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RootContainer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.SimpleTable
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.TextArea
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.TextInput
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Time
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.URL
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Unsupported
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.View
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ViewContainer
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentComponent
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.FieldGroupTemplateComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FieldGroupTemplateRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnComponent
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableComponent
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerRenderer
import com.pega.constellation.sdk.kmp.core.components.containers.ViewRenderer
import com.pega.constellation.sdk.kmp.core.components.core.ComponentRenderer
import com.pega.constellation.sdk.kmp.core.components.core.ComponentType
import com.pega.constellation.sdk.kmp.core.components.fields.CheckboxComponent
import com.pega.constellation.sdk.kmp.core.components.fields.CheckboxRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.CurrencyComponent
import com.pega.constellation.sdk.kmp.core.components.fields.CurrencyRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.DateComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DateRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.DecimalComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DecimalRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.DropdownComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DropdownRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.EmailComponent
import com.pega.constellation.sdk.kmp.core.components.fields.EmailRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.IntegerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.IntegerRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.PhoneComponent
import com.pega.constellation.sdk.kmp.core.components.fields.PhoneRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.RadioButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RadioButtonsRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.TextAreaComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextAreaRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.TimeComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TimeRenderer
import com.pega.constellation.sdk.kmp.core.components.fields.UrlComponent
import com.pega.constellation.sdk.kmp.core.components.fields.UrlRenderer
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsRenderer
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerRenderer
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedRenderer
import com.pega.constellation.sdk.kmp.core.components.core.ComponentDefinition as Def

/**
 * Object that holds all supported components, its definitions and renderers.
 */
object Components {
    /**
     * Supported component definitions
     */
    val DefaultDefinitions = listOf(
        Def(ActionButtons) { ActionButtonsComponent(it) },
        Def(AlertBanner) { AlertBannerComponent(it) },
        Def(Assignment) { AssignmentComponent(it) },
        Def(AssignmentCard) { AssignmentCardComponent(it) },
        Def(Checkbox) { CheckboxComponent(it) },
        Def(Currency) { CurrencyComponent(it) },
        Def(Date) { DateComponent(it) },
        Def(DateTime) { DateTimeComponent(it) },
        Def(Decimal) { DecimalComponent(it) },
        Def(DefaultForm) { DefaultFormComponent(it) },
        Def(Dropdown) { DropdownComponent(it) },
        Def(Email) { EmailComponent(it) },
        Def(FieldGroupTemplate) { FieldGroupTemplateComponent(it) },
        Def(FlowContainer) { FlowContainerComponent(it) },
        Def(Integer) { IntegerComponent(it) },
        Def(OneColumn) { OneColumnComponent(it) },
        Def(Phone) { PhoneComponent(it) },
        Def(RadioButtons) { RadioButtonsComponent(it) },
        Def(Region) { RegionComponent(it) },
        Def(RootContainer) { RootContainerComponent(it) },
        Def(SimpleTable) { SimpleTableComponent(it) },
        Def(TextArea) { TextAreaComponent(it) },
        Def(TextInput) { TextInputComponent(it) },
        Def(Time) { TimeComponent(it) },
        Def(URL) { UrlComponent(it) },
        Def(Unsupported) { UnsupportedComponent(it) },
        Def(View) { ViewComponent(it) },
        Def(ViewContainer) { ViewContainerComponent(it) },
    )

    /**
     * Supported component renderers
     */
    val DefaultRenderers: Map<ComponentType, ComponentRenderer<*>> = mapOf(
        ActionButtons to ActionButtonsRenderer(),
        AlertBanner to AlertBannerRenderer(),
        Assignment to AssignmentRenderer(),
        AssignmentCard to AssignmentCardRenderer(),
        Checkbox to CheckboxRenderer(),
        Currency to CurrencyRenderer(),
        Date to DateRenderer(),
        DateTime to DateTimeRenderer(),
        Decimal to DecimalRenderer(),
        DefaultForm to DefaultFormRenderer(),
        Dropdown to DropdownRenderer(),
        Email to EmailRenderer(),
        FieldGroupTemplate to FieldGroupTemplateRenderer(),
        FlowContainer to FlowContainerRenderer(),
        Integer to IntegerRenderer(),
        OneColumn to OneColumnRenderer(),
        Phone to PhoneRenderer(),
        RadioButtons to RadioButtonsRenderer(),
        Region to RegionRenderer(),
        RootContainer to RootContainerRenderer(),
        SimpleTable to SimpleTableRenderer(),
        TextArea to TextAreaRenderer(),
        TextInput to TextInputRenderer(),
        Time to TimeRenderer(),
        URL to UrlRenderer(),
        Unsupported to UnsupportedRenderer(),
        View to ViewRenderer(),
        ViewContainer to ViewContainerRenderer(),
    )
}
