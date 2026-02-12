package com.pega.constellation.sdk.kmp.core.components

import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ActionButtons
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.AlertBanner
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Assignment
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.AssignmentCard
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Checkbox
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Currency
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.DataReference
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Date
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.DateTime
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Decimal
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.DefaultForm
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Dropdown
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Email
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.FieldGroupTemplate
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.FlowContainer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Group
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Integer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ListView
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ModalViewContainer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.OneColumn
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Phone
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RadioButtons
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Region
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RichText
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RootContainer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.SimpleTable
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.SimpleTableManual
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.SimpleTableSelect
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.TextArea
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.TextInput
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Time
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.URL
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Unsupported
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.View
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ViewContainer
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentCardComponent
import com.pega.constellation.sdk.kmp.core.components.containers.AssignmentComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DataReferenceComponent
import com.pega.constellation.sdk.kmp.core.components.containers.DefaultFormComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FieldGroupTemplateComponent
import com.pega.constellation.sdk.kmp.core.components.containers.FlowContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.GroupComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ListViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ModalViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.OneColumnComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RegionComponent
import com.pega.constellation.sdk.kmp.core.components.containers.RootContainerComponent
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableComponent
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableManualComponent
import com.pega.constellation.sdk.kmp.core.components.containers.SimpleTableSelectComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewComponent
import com.pega.constellation.sdk.kmp.core.components.containers.ViewContainerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.CheckboxComponent
import com.pega.constellation.sdk.kmp.core.components.fields.CurrencyComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DateComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DateTimeComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DecimalComponent
import com.pega.constellation.sdk.kmp.core.components.fields.DropdownComponent
import com.pega.constellation.sdk.kmp.core.components.fields.EmailComponent
import com.pega.constellation.sdk.kmp.core.components.fields.IntegerComponent
import com.pega.constellation.sdk.kmp.core.components.fields.PhoneComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RadioButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.fields.RichTextComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextAreaComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TextInputComponent
import com.pega.constellation.sdk.kmp.core.components.fields.TimeComponent
import com.pega.constellation.sdk.kmp.core.components.fields.UrlComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.ActionButtonsComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.AlertBannerComponent
import com.pega.constellation.sdk.kmp.core.components.widgets.UnsupportedComponent
import com.pega.constellation.sdk.kmp.core.api.ComponentDefinition as Def

/**
 * Registry of all supported components.
 */
object ComponentRegistry {
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
        Def(DataReference) { DataReferenceComponent(it) },
        Def(DateTime) { DateTimeComponent(it) },
        Def(Decimal) { DecimalComponent(it) },
        Def(DefaultForm) { DefaultFormComponent(it) },
        Def(Dropdown) { DropdownComponent(it) },
        Def(Email) { EmailComponent(it) },
        Def(FieldGroupTemplate) { FieldGroupTemplateComponent(it) },
        Def(FlowContainer) { FlowContainerComponent(it) },
        Def(Group) { GroupComponent(it) },
        Def(Integer) { IntegerComponent(it) },
        Def(ListView) { ListViewComponent(it) },
        Def(ModalViewContainer) { ModalViewContainerComponent(it) },
        Def(OneColumn) { OneColumnComponent(it) },
        Def(Phone) { PhoneComponent(it) },
        Def(RadioButtons) { RadioButtonsComponent(it) },
        Def(Region) { RegionComponent(it) },
        Def(RootContainer) { RootContainerComponent(it) },
        Def(SimpleTable) { SimpleTableComponent(it) },
        Def(SimpleTableManual) { SimpleTableManualComponent(it) },
        Def(SimpleTableSelect) { SimpleTableSelectComponent(it) },
        Def(TextArea) { TextAreaComponent(it) },
        Def(RichText) { RichTextComponent(it) },
        Def(TextInput) { TextInputComponent(it) },
        Def(Time) { TimeComponent(it) },
        Def(URL) { UrlComponent(it) },
        Def(Unsupported) { UnsupportedComponent(it) },
        Def(View) { ViewComponent(it) },
        Def(ViewContainer) { ViewContainerComponent(it) },
    )
}
