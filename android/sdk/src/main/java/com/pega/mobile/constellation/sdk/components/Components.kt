package com.pega.mobile.constellation.sdk.components

import com.pega.mobile.constellation.sdk.components.ComponentTypes.ActionButtons
import com.pega.mobile.constellation.sdk.components.ComponentTypes.AlertBanner
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Assignment
import com.pega.mobile.constellation.sdk.components.ComponentTypes.AssignmentCard
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Checkbox
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Date
import com.pega.mobile.constellation.sdk.components.ComponentTypes.DefaultForm
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Email
import com.pega.mobile.constellation.sdk.components.ComponentTypes.FlowContainer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Integer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Region
import com.pega.mobile.constellation.sdk.components.ComponentTypes.RootContainer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.TextArea
import com.pega.mobile.constellation.sdk.components.ComponentTypes.TextInput
import com.pega.mobile.constellation.sdk.components.ComponentTypes.URL
import com.pega.mobile.constellation.sdk.components.ComponentTypes.UnsupportedJs
import com.pega.mobile.constellation.sdk.components.ComponentTypes.UnsupportedNative
import com.pega.mobile.constellation.sdk.components.ComponentTypes.View
import com.pega.mobile.constellation.sdk.components.ComponentTypes.ViewContainer
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentCardRenderer
import com.pega.mobile.constellation.sdk.components.containers.AssignmentComponent
import com.pega.mobile.constellation.sdk.components.containers.AssignmentRenderer
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormComponent
import com.pega.mobile.constellation.sdk.components.containers.DefaultFormRenderer
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.FlowContainerRenderer
import com.pega.mobile.constellation.sdk.components.containers.RegionComponent
import com.pega.mobile.constellation.sdk.components.containers.RegionRenderer
import com.pega.mobile.constellation.sdk.components.containers.RootContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.RootContainerRenderer
import com.pega.mobile.constellation.sdk.components.containers.ViewComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewContainerComponent
import com.pega.mobile.constellation.sdk.components.containers.ViewContainerRenderer
import com.pega.mobile.constellation.sdk.components.containers.ViewRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentType
import com.pega.mobile.constellation.sdk.components.fields.CheckboxComponent
import com.pega.mobile.constellation.sdk.components.fields.CheckboxRenderer
import com.pega.mobile.constellation.sdk.components.fields.DateComponent
import com.pega.mobile.constellation.sdk.components.fields.DateRenderer
import com.pega.mobile.constellation.sdk.components.fields.EmailComponent
import com.pega.mobile.constellation.sdk.components.fields.EmailRenderer
import com.pega.mobile.constellation.sdk.components.fields.IntegerComponent
import com.pega.mobile.constellation.sdk.components.fields.IntegerRenderer
import com.pega.mobile.constellation.sdk.components.fields.TextAreaComponent
import com.pega.mobile.constellation.sdk.components.fields.TextAreaRenderer
import com.pega.mobile.constellation.sdk.components.fields.TextInputComponent
import com.pega.mobile.constellation.sdk.components.fields.TextInputRenderer
import com.pega.mobile.constellation.sdk.components.fields.UrlComponent
import com.pega.mobile.constellation.sdk.components.fields.UrlRenderer
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsComponent
import com.pega.mobile.constellation.sdk.components.widgets.ActionButtonsRenderer
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerComponent
import com.pega.mobile.constellation.sdk.components.widgets.AlertBannerRenderer
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedJsComponent
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedJsRenderer
import com.pega.mobile.constellation.sdk.components.widgets.UnsupportedNativeRenderer
import com.pega.mobile.constellation.sdk.components.core.ComponentDefinition as Def

object Components {
    val DefaultDefinitions = listOf(
        Def(RootContainer) { RootContainerComponent(it) },
        Def(ViewContainer) { ViewContainerComponent(it) },
        Def(FlowContainer) { FlowContainerComponent(it) },
        Def(View) { ViewComponent(it) },
        Def(Region) { RegionComponent(it) },
        Def(Assignment) { AssignmentComponent(it) },
        Def(AssignmentCard) { AssignmentCardComponent(it) },
        Def(DefaultForm) { DefaultFormComponent(it) },
        Def(TextInput) { TextInputComponent(it) },
        Def(Email) { EmailComponent(it) },
        Def(Integer) { IntegerComponent(it) },
        Def(Checkbox) { CheckboxComponent(it) },
        Def(TextArea) { TextAreaComponent(it) },
        Def(URL) { UrlComponent(it) },
        Def(ActionButtons) { ActionButtonsComponent(it) },
        Def(AlertBanner) { AlertBannerComponent(it) },
        Def(Date) { DateComponent(it) },
        Def(UnsupportedJs) { UnsupportedJsComponent(it)}
    )

    val DefaultRenderers: Map<ComponentType, ComponentRenderer<*>> = mapOf(
        RootContainer to RootContainerRenderer(),
        ViewContainer to ViewContainerRenderer(),
        FlowContainer to FlowContainerRenderer(),
        View to ViewRenderer(),
        Region to RegionRenderer(),
        Assignment to AssignmentRenderer(),
        AssignmentCard to AssignmentCardRenderer(),
        DefaultForm to DefaultFormRenderer(),
        TextInput to TextInputRenderer(),
        Email to EmailRenderer(),
        Integer to IntegerRenderer(),
        Checkbox to CheckboxRenderer(),
        TextArea to TextAreaRenderer(),
        URL to UrlRenderer(),
        Date to DateRenderer(),
        ActionButtons to ActionButtonsRenderer(),
        AlertBanner to AlertBannerRenderer(),
        UnsupportedJs to UnsupportedJsRenderer(),
        UnsupportedNative to UnsupportedNativeRenderer()
    )
}
