package com.pega.mobile.constellation.sample

import com.pega.mobile.constellation.sample.components.CustomEmailComponent
import com.pega.mobile.constellation.sample.components.CustomEmailRenderer
import com.pega.mobile.constellation.sample.components.CustomSliderComponent
import com.pega.mobile.constellation.sample.components.CustomSliderRenderer
import com.pega.mobile.constellation.sdk.components.ComponentTypes.Email
import com.pega.mobile.constellation.sdk.components.core.ComponentDefinition
import com.pega.mobile.constellation.sdk.components.core.ComponentType

object CustomComponents {
    private val Slider = ComponentType("MyCompany_MyLib_Slider")

    val CustomDefinitions = listOf(
        ComponentDefinition(
            type = Email,
            jsFile = "components_overrides/email.component.override.js",
            producer = ::CustomEmailComponent
        ),
        ComponentDefinition(
            type = Slider,
            jsFile = "components_overrides/slider.component.override.js",
            producer = ::CustomSliderComponent
        )
    )

    val CustomRenderers = mapOf(
        Email to CustomEmailRenderer(),
        Slider to CustomSliderRenderer()
    )

}