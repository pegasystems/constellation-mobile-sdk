plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.androidKotlinMultiplatformLibrary)
}

kotlin {
    androidLibrary {
        namespace = "com.pega.constellation.sdk.kmp.samples.basecmpapp"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        minSdk = libs.versions.android.minSdk.get().toInt()

        @Suppress("UnstableApiUsage")
        androidResources.enable = true
    }

    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework {
            baseName = "BaseCmpApp"
            isStatic = true
        }
    }

    jvm()

    sourceSets {
        commonMain {
            dependencies {
                implementation(project(":core"))
                implementation(project(":ui:components:cmp"))
                implementation(project(":ui:renderer:cmp"))
                implementation(compose.components.resources)
                implementation(compose.components.uiToolingPreview)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.runtime)
                implementation(compose.ui)
                implementation(libs.androidx.lifecycle.viewmodelCompose)
                implementation(libs.kotlin.stdlib)
                implementation(libs.kotlinx.serialization.json)
                implementation(libs.oidc.appsupport)
                implementation(libs.oidc.tokenstore)
            }
        }
        iosMain {
            dependencies {
                implementation(project(":engine:webview"))
            }
        }
    }

}