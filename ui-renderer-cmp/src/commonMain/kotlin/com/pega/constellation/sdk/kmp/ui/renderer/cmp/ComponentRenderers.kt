package com.pega.constellation.sdk.kmp.ui.renderer.cmp

import com.pega.constellation.sdk.kmp.core.api.ComponentType
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
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.OneColumn
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Phone
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RadioButtons
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Region
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.RootContainer
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.SimpleTable
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.SimpleTableSelect
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.TextArea
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.TextInput
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Time
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.URL
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Unsupported
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.View
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.ViewContainer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.AlertBannerRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.AssignmentCardRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.AssignmentRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.DataReferenceRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.DefaultFormRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.FieldGroupTemplateRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.FlowContainerRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.GroupRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.ListViewRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.OneColumnRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.RegionRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.RootContainerRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.SimpleTableRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.SimpleTableSelectRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.ViewContainerRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.containers.ViewRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.CheckboxRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.CurrencyRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.DateRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.DateTimeRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.DecimalRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.DropdownRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.EmailRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.IntegerRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.PhoneRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.RadioButtonsRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.TextAreaRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.TextInputRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.TimeRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.fields.UrlRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.widgets.ActionButtonsRenderer
import com.pega.constellation.sdk.kmp.ui.renderer.cmp.widgets.UnsupportedRenderer


/**
 * Registry of component renderers.
 */
object ComponentRenderers {

    /**
     * Supported component renderers.
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
        ListView to ListViewRenderer(),
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