import org.jetbrains.kotlin.gradle.targets.native.tasks.KotlinNativeTest

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidKotlinMultiplatformLibrary)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

// Gradle 9 enforces failOnNoDiscoveredTests by default. This module's iOS native test
// tasks (e.g. iosSimulatorArm64Test) have no test sources that actually execute on
// this target, so we opt out here rather than per-target. If iOS-specific tests are
// ever added, re-verify that a broken/missing test setup wouldn't be masked by this.
tasks.withType<KotlinNativeTest>().configureEach {
    failOnNoDiscoveredTests.set(false)
}

kotlin {
    androidLibrary {
        namespace = "com.pega.constellation.sdk.kmp.test"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        minSdk = libs.versions.android.minSdk.get().toInt()

        withDeviceTestBuilder {
            sourceSetTreeName = "test"
        }.configure {
            instrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

            execution = "ANDROIDX_TEST_ORCHESTRATOR"
            @Suppress("UnstableApiUsage")
            managedDevices {
                localDevices {
                    create("pixel") {
                        device = "Pixel 8"
                        apiLevel = 35
                        systemImageSource = "aosp-atd"
                    }
                }
            }
        }
        androidResources.enable = true
    }

    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework {
            baseName = "SdkTestKit"
        }
    }

    sourceSets {
        commonMain {
            dependencies {
                implementation(libs.compose.components.resources)
                implementation(libs.compose.runtime)
                implementation(libs.kotlin.test)
                implementation(libs.kotlinx.serialization.json)
            }
        }

        commonTest {
            dependencies {
                implementation(libs.kotlin.test)
                implementation(libs.kotlinx.coroutines.core)
            }
        }

        androidMain {
            dependencies {
                implementation(libs.okhttp)
            }
        }

        getByName("androidDeviceTest") {
            dependencies {
                implementation(project(":core"))
                implementation(project(":engine-webview"))
                implementation(libs.androidx.test.core)
                implementation(libs.androidx.test.junit)
                implementation(libs.androidx.test.runner)
            }
        }
    }
}

dependencies {
    androidTestUtil(libs.androidx.orchestrator)
}
