plugins { id("com.android.application") }

android { namespace = "com.radioshare.app"; compileSdk = 35
    defaultConfig { applicationId = "com.radioshare.app"; minSdk = 26; targetSdk = 35; versionCode = 1; versionName = "0.1.0" }
    signingConfigs { create("release") { val storeFilePath = System.getenv("RADIOSHARE_KEYSTORE") ?: ""; if (storeFilePath.isNotBlank()) { storeFile = file(storeFilePath); storePassword = System.getenv("RADIOSHARE_KEYSTORE_PASSWORD"); keyAlias = System.getenv("RADIOSHARE_KEY_ALIAS"); keyPassword = System.getenv("RADIOSHARE_KEY_PASSWORD") } } }
    buildTypes { getByName("release") { isMinifyEnabled = false; if ((System.getenv("RADIOSHARE_KEYSTORE") ?: "").isNotBlank()) signingConfig = signingConfigs.getByName("release") } }
}
