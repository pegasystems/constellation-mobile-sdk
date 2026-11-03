import org.jetbrains.kotlin.gradle.plugin.mpp.apple.XCFramework

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidKotlinMultiplatformLibrary)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.kotlinSerialization)
    id("maven-publish")
}

kotlin {
    androidLibrary {
        namespace = "com.pega.constellation.sdk.kmp.engine.webview"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        minSdk = libs.versions.android.minSdk.get().toInt()

        @Suppress("UnstableApiUsage")
        androidResources.enable = true
    }

    val xcf = XCFramework("ConstellationSdk")

    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework {
            baseName = "ConstellationSdk"
            export(projects.core)
            xcf.add(this)
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

    jvm()

    sourceSets {
        commonMain {
            dependencies {
                api(project(":core"))
                implementation(libs.compose.components.resources)
                implementation(libs.compose.runtime)
                implementation(libs.kotlin.stdlib)
                implementation(libs.kotlinx.serialization.json)
                implementation(libs.ktor.client.core)
            }
        }

        jvmTest {
            dependencies {
                implementation(libs.kotlin.test)
                implementation(libs.kotlinx.coroutines.core)
            }
        }

        iosTest {
            dependencies {
                implementation(libs.kotlin.test)
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
