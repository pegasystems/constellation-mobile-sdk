package com.pega.constellation.sdk.kmp.samples.basecmpapp.ui.components

import com.pega.constellation.sdk.kmp.base_cmp_app.generated.resources.Res
import com.pega.constellation.sdk.kmp.core.api.ComponentDefinition
import com.pega.constellation.sdk.kmp.core.api.ComponentScript
import com.pega.constellation.sdk.kmp.core.api.ComponentType
import com.pega.constellation.sdk.kmp.core.components.ComponentTypes.Email

object CustomComponents {
    private val Slider = ComponentType("MyCompany_MyLib_Slider")

    val CustomDefinitions = listOf(
        ComponentDefinition(
            type = Email,
            script = ComponentScript(
                file = Res.getUri("files/components_overrides/email.component.override.js")
            ),
            producer = ::CustomEmailComponent
        ),
        ComponentDefinition(
            type = Slider,
            script = ComponentScript(
                file = Res.getUri("files/components_overrides/slider.component.override.js")
            ),
            producer = ::CustomSliderComponent
        )
    )

    val CustomRenderers = mapOf(
        Email to CustomEmailRenderer(),
        Slider to CustomSliderRenderer()
    )
}
