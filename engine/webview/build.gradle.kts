plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidKotlinMultiplatformLibrary)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.kotlinSerialization)
}

kotlin {
    androidLibrary {
        namespace = "com.pega.constellation.sdk.kmp.engine.webview"
        compileSdk = 36
        minSdk = 26

        @Suppress("UnstableApiUsage")
        androidResources.enable = true
    }

    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework {
            baseName = "ConstellationSdk"
            export(projects.core)
        }

        it.compilations.getByName("main") {
            cinterops {
                create("PegaMobileWKWebViewTweaks") {
                    defFile(project.file("src/nativeInterop/cinterop/PegaMobileWKWebViewTweaks.def"))
                    includeDirs(project.file("src/nativeInterop/cinterop/PegaMobileWKWebViewTweaks"))
                }
            }
        }
    }

    sourceSets {
        commonMain {
            dependencies {
                api(project(":core"))
                implementation(compose.components.resources)
                implementation(compose.runtime)
                implementation(libs.kotlin.stdlib)
                implementation(libs.kotlinx.serialization.json)
            }
        }

        androidMain {
            dependencies {
                implementation(libs.okhttp)
                implementation(libs.androidx.webkit)
            }
        }
    }
}