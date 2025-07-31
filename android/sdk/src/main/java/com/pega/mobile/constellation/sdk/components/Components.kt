package com.pega.mobile.constellation.sdk.components

import com.pega.mobile.constellation.sdk.components.ComponentTypes.ActionButtons
import com.pega.mobile.constellation.sdk.components.ComponentTypes.AlertBanner
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Assignment
import com.pega.mobile.constellation.sdk.components.ComponentTypes.AssignmentCard
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Checkbox
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Currency
import com.pega.mobile.constellation.sdk.components.ComponentTypes.DataReference
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Date
import com.pega.mobile.constellation.sdk.components.ComponentTypes.DateTime
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Decimal
import com.pega.mobile.constellation.sdk.components.ComponentTypes.DefaultForm
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Dropdown
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Email
import com.pega.mobile.constellation.sdk.components.ComponentTypes.FieldGroupTemplate
import com.pega.mobile.constellation.sdk.components.ComponentTypes.FlowContainer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Group
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Integer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.OneColumn
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Phone
import com.pega.mobile.constellation.sdk.components.ComponentTypes.RadioButtons
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Region
import com.pega.mobile.constellation.sdk.components.ComponentTypes.RootContainer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.SimpleTable
import com.pega.mobile.constellation.sdk.components.ComponentTypes.SimpleTableSelect
import com.pega.mobile.constellation.sdk.components.ComponentTypes.TextArea
import com.pega.mobile.constellation.sdk.components.ComponentTypes.TextInput
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Time
import com.pega.mobile.constellation.sdk.components.ComponentTypes.URL
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Unsupported
import com.pega.mobile.constellation.sdk.components.ComponentTypes.View
import com.pega.mobile.constellation.sdk.components.ComponentTypes.ViewContainer
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardRenderer
import com.pega.mobile.constellation.sdk.components.containers.AssignmentComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentRenderer
import com.pega.mobile.constellation.sdk.components.containers.DataReferenceComponent
import com.pega.mobile.constellation.sdk.components.containers.DataReferenceRenderer
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormComponent
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormRenderer
import com.pega.mobile.constellation.sdk.components.containers.FieldGroupTemplateComponent
import com.pega.mobile.constellation.sdk.components.containers.FieldGroupTemplateRenderer
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerRenderer
import com.pega.mobile.constellation.sdk.components.containers.GroupComponent
import com.pega.mobile.constellation.sdk.components.containers.GroupRenderer
import com.pega.mobile.constellation.sdk.components.containers.OneColumnComponent
import com.pega.mobile.constellation.sdk.components.containers.OneColumnRenderer
import com.pega.mobile.constellation.sdk.components.containers.RegionComponent
import com.pega.mobile.constellation.sdk.components.containers.RegionRenderer
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.RootContainerRenderer
import com.pega.mobile.constellation.sdk.components.containers.SimpleTableComponent
import com.pega.mobile.constellation.sdk.components.containers.SimpleTableRenderer
import com.pega.mobile.constellation.sdk.components.containers.SimpleTableSelectComponent
import com.pega.mobile.constellation.sdk.components.containers.SimpleTableSelectRenderer
import com.pega.mobile.constellation.sdk.components.containers.ViewComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewContainerRenderer
import com.pega.mobile.constellation.sdk.components.containers.ViewRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentType
import com.pega.mobile.constellation.sdk.components.fields.CheckboxComponent
import com.pega.mobile.constellation.sdk.components.fields.CheckboxRenderer
import com.pega.mobile.constellation.sdk.components.fields.CurrencyComponent
import com.pega.mobile.constellation.sdk.components.fields.CurrencyRenderer
import com.pega.mobile.constellation.sdk.components.fields.DateComponent
import com.pega.mobile.constellation.sdk.components.fields.DateRenderer
import com.pega.mobile.constellation.sdk.components.fields.DateTimeComponent
import com.pega.mobile.constellation.sdk.components.fields.DateTimeRenderer
import com.pega.mobile.constellation.sdk.components.fields.DecimalComponent
import com.pega.mobile.constellation.sdk.components.fields.DecimalRenderer
import com.pega.mobile.constellation.sdk.components.fields.DropdownComponent
import com.pega.mobile.constellation.sdk.components.fields.DropdownRenderer
import com.pega.mobile.constellation.sdk.components.fields.EmailComponent
import com.pega.mobile.constellation.sdk.components.fields.EmailRenderer
import com.pega.mobile.constellation.sdk.components.fields.IntegerComponent
import com.pega.mobile.constellation.sdk.components.fields.IntegerRenderer
import com.pega.mobile.constellation.sdk.components.fields.PhoneComponent
import com.pega.mobile.constellation.sdk.components.fields.PhoneRenderer
import com.pega.mobile.constellation.sdk.components.fields.RadioButtonsComponent
import com.pega.mobile.constellation.sdk.components.fields.RadioButtonsRenderer
import com.pega.mobile.constellation.sdk.components.fields.TextAreaComponent
import com.pega.mobile.constellation.sdk.components.fields.TextAreaRenderer
import com.pega.mobile.constellation.sdk.components.fields.TextInputComponent
import com.pega.mobile.constellation.sdk.components.fields.TextInputRenderer
import com.pega.mobile.constellation.sdk.components.fields.TimeComponent
import com.pega.mobile.constellation.sdk.components.fields.TimeRenderer
import com.pega.mobile.constellation.sdk.components.fields.UrlComponent
import com.pega.mobile.constellation.sdk.components.fields.UrlRenderer
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsRenderer
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerComponent
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerRenderer
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedComponent
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentDefinition as Def

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
        Def(DataReference) { DataReferenceComponent(it)},
        Def(DateTime) { DateTimeComponent(it) },
        Def(Decimal) { DecimalComponent(it) },
        Def(DefaultForm) { DefaultFormComponent(it) },
        Def(Dropdown) { DropdownComponent(it) },
        Def(Email) { EmailComponent(it) },
        Def(FieldGroupTemplate) { FieldGroupTemplateComponent(it) },
        Def(FlowContainer) { FlowContainerComponent(it) },
        Def(Group) { GroupComponent(it)},
        Def(Integer) { IntegerComponent(it) },
        Def(OneColumn) { OneColumnComponent(it) },
        Def(Phone) { PhoneComponent(it) },
        Def(RadioButtons) { RadioButtonsComponent(it) },
        Def(Region) { RegionComponent(it) },
        Def(RootContainer) { RootContainerComponent(it) },
        Def(SimpleTable) { SimpleTableComponent(it) },
        Def(SimpleTableSelect) { SimpleTableSelectComponent(it) },
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
        DataReference to DataReferenceRenderer(),
        Date to DateRenderer(),
        DateTime to DateTimeRenderer(),
        Decimal to DecimalRenderer(),
        DefaultForm to DefaultFormRenderer(),
        Dropdown to DropdownRenderer(),
        Email to EmailRenderer(),
        FieldGroupTemplate to FieldGroupTemplateRenderer(),
        FlowContainer to FlowContainerRenderer(),
        Group to GroupRenderer(),
        Integer to IntegerRenderer(),
        OneColumn to OneColumnRenderer(),
        Phone to PhoneRenderer(),
        RadioButtons to RadioButtonsRenderer(),
        Region to RegionRenderer(),
        RootContainer to RootContainerRenderer(),
        SimpleTable to SimpleTableRenderer(),
        SimpleTableSelect to SimpleTableSelectRenderer(),
        TextArea to TextAreaRenderer(),
        TextInput to TextInputRenderer(),
        Time to TimeRenderer(),
        URL to UrlRenderer(),
        Unsupported to UnsupportedRenderer(),
        View to ViewRenderer(),
        ViewContainer to ViewContainerRenderer(),
    )
}
