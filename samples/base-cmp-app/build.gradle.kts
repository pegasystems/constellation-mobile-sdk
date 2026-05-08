plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.androidKotlinMultiplatformLibrary)
    alias(libs.plugins.kotlinSerialization)
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
                api(project(":core"))
                api(project(":ui-components-cmp"))
                api(project(":ui-renderer-cmp"))
                api(project(":engine-webview"))
                implementation(libs.androidx.datastore)
                implementation(libs.androidx.datastore.preferences)
                implementation(compose.components.resources)
                implementation(libs.ui.tooling.preview)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.materialIconsExtended)
                implementation(compose.runtime)
                implementation(compose.ui)
                implementation(libs.androidx.lifecycle.viewmodelCompose)
                implementation(libs.androidx.navigation.compose)
                implementation(libs.compose.ui.tooling.preview)
                implementation(libs.kotlin.stdlib)
                implementation(libs.kotlinx.serialization.json)
                implementation(libs.ktor.client.auth)
                implementation(libs.ktor.client.core)
                implementation(libs.oidc.appsupport)
                implementation(libs.oidc.tokenstore)
            }
        }
        jvmMain {
            dependencies {
                api(project(":engine-mock"))
            }
        }
    }
}