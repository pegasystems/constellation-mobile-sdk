plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.androidKotlinMultiplatformLibrary)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
}

kotlin {
    androidLibrary {
        namespace = "com.pega.constellation.sdk.kmp.ui.components.cmp"
        compileSdk = libs.versions.android.compileSdk.get().toInt()
        minSdk = libs.versions.android.minSdk.get().toInt()

        @Suppress("UnstableApiUsage")
        androidResources.enable = true
    }

    listOf(iosX64(), iosArm64(), iosSimulatorArm64()).forEach {
        it.binaries.framework {
            baseName = "SdkUiComponentsCmp"
        }
    }

    jvm()

    sourceSets {
        commonMain {
            dependencies {
                implementation(compose.components.resources)
                implementation(compose.components.uiToolingPreview)
                implementation(compose.foundation)
                implementation(compose.material3)
                implementation(compose.runtime)
                implementation(compose.ui)
                implementation(libs.androidx.lifecycle.runtimeCompose)
                implementation(libs.androidx.lifecycle.viewmodel)
                implementation(libs.kotlin.stdlib)
                implementation(libs.kotlinx.datetime)
                implementation(libs.kotlinx.serialization.json)
            }
        }

        androidMain {
            dependencies {
                androidMain {
                    dependencies {
                        // START: Dependencies required for @Preview to work in Android Studio
                        // https://youtrack.jetbrains.com/projects/KMT/issues/KMT-1312/Preview-not-work-in-commonMain-with-multi-module
                        implementation(compose.components.uiToolingPreview)
                        implementation(compose.uiTooling)
                        implementation(libs.androidx.activity.compose)
                        implementation(libs.androidx.customview.poolingcontainer)
                        implementation(libs.androidx.emoji2)
                        implementation(libs.androidx.lifecycle.runtimeCompose)
                        implementation(libs.androidx.core.runtime)
                        // END: Dependencies required for @Preview to work in Android Studio
                    }
                }
            }
        }
    }

}
