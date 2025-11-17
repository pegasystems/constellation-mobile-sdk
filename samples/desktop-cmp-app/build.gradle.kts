import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    alias(libs.plugins.kotlinMultiplatform)
    alias(libs.plugins.composeMultiplatform)
    alias(libs.plugins.composeCompiler)
    alias(libs.plugins.composeHotReload)
}

kotlin {
    jvm()

    sourceSets {
        jvmMain {
            dependencies {
                implementation(project(":samples:base-cmp-app"))
                implementation(compose.desktop.currentOs)
                implementation(libs.androidx.lifecycle.viewmodelCompose)
                implementation(libs.kotlinx.coroutinesSwing)
                implementation(libs.oidc.appsupport)
            }
        }
    }
}

compose.desktop {
    application {
        mainClass = "com.pega.constellation.sdk.kmp.samples.desktopcmpapp.MainKt"

        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "com.pega.constellation.sdk.kmp.samples.desktopcmpapp"
            packageVersion = "1.0.0"
        }
    }
}