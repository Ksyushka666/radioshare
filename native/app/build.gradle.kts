plugins { id("com.android.application") }

android {
    namespace = "com.radioshare.app"
    compileSdk = 35
    defaultConfig {
        applicationId = "com.radioshare.app"
        minSdk = 24
        targetSdk = 35
        versionCode = 4
        versionName = "0.1.3"
    }
    signingConfigs {
        create("release") {
            enableV1Signing = true
            enableV2Signing = true
            val storeFilePath = System.getenv("RADIOSHARE_KEYSTORE") ?: ""
            if (storeFilePath.isNotBlank()) {
                storeFile = file(storeFilePath)
                storePassword = System.getenv("RADIOSHARE_KEYSTORE_PASSWORD")
                keyAlias = System.getenv("RADIOSHARE_KEY_ALIAS")
                keyPassword = System.getenv("RADIOSHARE_KEY_PASSWORD")
            }
        }
    }
    buildTypes {
        getByName("release") {
            isMinifyEnabled = false
            if ((System.getenv("RADIOSHARE_KEYSTORE") ?: "").isNotBlank()) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }
}

dependencies {
    implementation("dev.rikka.shizuku:api:13.1.5")
    implementation("dev.rikka.shizuku:provider:13.1.5")
}
