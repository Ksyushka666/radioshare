# Release-сборка RadioShare

Инструкция предназначена для владельца проекта или CI-сервера. Секреты подписи не должны попадать в Git, ZIP-архивы, логи или переменные frontend-сборки.

## Что подписывается

| Артефакт | Инструмент | Результат |
|---|---|---|
| Android | Gradle + JKS/PKCS12 | `app-release.apk` |
| Windows | electron-builder + сертификат | `RadioShare *.exe` |

## Android: создание ключа

Выполните команду на защищённой машине. Пароли вводятся интерактивно и не записываются в историю shell:

```bash
keytool -genkeypair -v -keystore radioshare-release.jks \
  -alias radioshare \
  -keyalg RSA -keysize 4096 -validity 10000
```

Сделайте резервную копию JKS в зашифрованном хранилище. Потеря ключа означает невозможность выпускать обновления с тем же идентификатором приложения.

Перед сборкой задайте переменные только в защищённой сессии:

```bash
export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export RADIOSHARE_KEYSTORE="$HOME/secrets/radioshare-release.jks"
export RADIOSHARE_KEYSTORE_PASSWORD='из-защищённого-хранилища'
export RADIOSHARE_KEY_ALIAS='radioshare'
export RADIOSHARE_KEY_PASSWORD='из-защищённого-хранилища'
```

Запустите:

```bash
bash scripts/build-release.sh
```

Проверка APK:

```bash
$ANDROID_SDK_ROOT/build-tools/35.0.0/apksigner verify --verbose release/RadioShare-release.apk
sha256sum -c release/SHA256SUMS.txt
```

## Windows: подпись EXE

Для настоящей подписи нужен код-сертификат `.p12`/`.pfx` от доверенного издателя. Не коммитьте его в репозиторий. electron-builder читает `CSC_LINK` как путь или base64-ссылку на сертификат, а `CSC_KEY_PASSWORD` — его пароль.

```bash
export CSC_LINK="$HOME/secrets/radioshare-code-signing.p12"
export CSC_KEY_PASSWORD='из-защищённого-хранилища'
export CSC_IDENTITY_AUTO_DISCOVERY=false
bash scripts/build-release.sh
```

На Windows можно выполнить:

```powershell
$env:RADIOSHARE_KEYSTORE = 'C:\Secrets\radioshare-release.jks'
$env:RADIOSHARE_KEYSTORE_PASSWORD = (Read-Host 'Keystore password' -AsSecureString)
$env:RADIOSHARE_KEY_ALIAS = 'radioshare'
$env:RADIOSHARE_KEY_PASSWORD = (Read-Host 'Key password' -AsSecureString)
$env:CSC_LINK = 'C:\Secrets\radioshare-code-signing.p12'
$env:CSC_KEY_PASSWORD = (Read-Host 'Certificate password' -AsSecureString)
.\scripts\build-release.ps1
```

Проверьте подпись в свойствах файла Windows: **Properties → Digital Signatures**. Для CI используйте секреты CI-провайдера, временную рабочую директорию и удаление сертификата после job.

## Что делает скрипт

Скрипт прекращает работу, если отсутствуют переменные Android-подписи, собирает release APK, запускает electron-builder для Windows, складывает результаты в `release/` и создаёт `SHA256SUMS.txt`. Публичного сертификата в текущем проекте нет, поэтому подпись появляется только после предоставления владельцем настоящих ключей.

## Радиоограничение

Подписанный установщик не означает, что радиоканал проверен. Реальная LoRa/SDR-передача требует конкретного устройства, драйвера, разрешённых параметров частоты и теста между двумя узлами. Текущая оболочка сохраняет transport bridge и simulated-режим до подключения аппаратуры.
