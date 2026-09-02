# RadioShare и Shizuku: быстрый запуск

## Что делает Shizuku

Shizuku — отдельное Android-приложение, которое предоставляет совместимым приложениям IPC-доступ к некоторым системным API с правами ADB или root. **RadioShare не устанавливает Shizuku скрытно и не запускает его без подтверждения пользователя.**

RadioShare использует Shizuku только после явного разрешения пользователя. Для передачи файлов и сообщений через обычный LoRa-шлюз Shizuku не обязателен.

## 1. Установите Shizuku

Скачайте Shizuku из [официального руководства и раздела загрузки](https://shizuku.rikka.app/guide/setup/). Не скачивайте APK из случайных источников.

Текущая интеграция RadioShare использует официальные зависимости Shizuku API/provider 13.1.5. Поддерживаемая библиотекой минимальная версия Android — 7.0 (API 24).

## 2. Запуск через Wireless debugging — Android 11 и новее

Откройте настройки телефона, включите «Для разработчиков» и «Беспроводная отладка». В приложении Shizuku выберите запуск через Wireless debugging, затем в настройках Android выберите «Сопряжение устройства с кодом сопряжения» и введите код в уведомлении Shizuku. После каждой перезагрузки Android запуск обычно нужно повторить.

## 3. Запуск через компьютер — Android 10 и ниже

Установите [официальные Android SDK Platform Tools](https://developer.android.com/tools/releases/platform-tools), включите USB debugging и подключите телефон к компьютеру. Проверьте устройство командой:

```text
adb devices
```

После разрешения отладки на телефоне запустите Shizuku официальной командой для Shizuku 11.2.0 и новее:

```text
adb shell sh /sdcard/Android/data/moe.shizuku.privileged.api/start.sh
```

После перезагрузки телефона запуск через ADB может потребоваться повторить.

## 4. Подключите RadioShare

Установите RadioShare 0.1.3-alpha и запустите приложение. Если Shizuku активен, RadioShare покажет диалог «Подключить Shizuku?». Нажмите «Запросить доступ» и подтвердите разрешение в Shizuku. Если сервис не запущен, приложение продолжит работу в обычном режиме и покажет уведомление о состоянии.

RadioShare проверяет Binder Shizuku и не предполагает наличие root. Уровень ADB ограничен и отличается на разных версиях Android; приложение не использует скрытую установку пакетов, обход подтверждений или автоматическое получение root.

## Диагностика

Если RadioShare сообщает, что Shizuku не запущен, откройте Shizuku и проверьте его статус. Если запрос разрешения не появляется, перезапустите Shizuku и RadioShare. На Android 11+ повторите сопряжение через Wireless debugging после перезагрузки. Производители могут ограничивать работу Shizuku в фоне; разрешите Shizuku работать без ограничений батареи.

Если APK не устанавливается, удалите старую тестовую версию RadioShare и скачайте последнюю сборку из [GitHub Releases](https://github.com/Ksyushka666/radioshare/releases). Не устанавливайте несколько APK RadioShare одновременно: версии с одним application ID должны обновляться подписанным ключом того же владельца.

## Источники

- [Shizuku — официальное руководство пользователя](https://shizuku.rikka.app/guide/setup/)
- [Shizuku-API — официальный developer guide](https://github.com/RikkaApps/Shizuku-API)
- [Shizuku — официальный репозиторий](https://github.com/RikkaApps/Shizuku)
- [Android SDK Platform Tools](https://developer.android.com/tools/releases/platform-tools)
