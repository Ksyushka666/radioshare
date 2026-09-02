package com.radioshare.app;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import rikka.shizuku.Shizuku;

public class MainActivity extends Activity {
    private static final int SHIZUKU_REQUEST_CODE = 7101;

    private final Shizuku.OnRequestPermissionResultListener permissionListener = (requestCode, grantResult) -> {
        if (requestCode != SHIZUKU_REQUEST_CODE) return;
        if (grantResult == PackageManager.PERMISSION_GRANTED) {
            toast("Shizuku подключён: разрешение получено");
        } else {
            toast("Shizuku не разрешён. Можно включить доступ позже.");
        }
    };

    @Override
    public void onCreate(Bundle state) {
        super.onCreate(state);
        WebView view = new WebView(this);
        WebSettings settings = view.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        view.setWebViewClient(new WebViewClient());
        view.loadUrl("file:///android_asset/index.html");
        setContentView(view);

        Shizuku.addRequestPermissionResultListener(permissionListener);
        new Handler(Looper.getMainLooper()).postDelayed(this::checkShizuku, 700);
    }

    private void checkShizuku() {
        if (!Shizuku.pingBinder()) {
            toast("Shizuku не запущен — приложение работает в обычном режиме");
            return;
        }
        if (Shizuku.checkSelfPermission() == PackageManager.PERMISSION_GRANTED) {
            toast("Shizuku подключён");
            return;
        }
        new android.app.AlertDialog.Builder(this)
                .setTitle("Подключить Shizuku?")
                .setMessage("RadioShare может использовать Shizuku только после вашего явного разрешения. Сервис Shizuku должен быть установлен и запущен отдельно.")
                .setNegativeButton("Позже", null)
                .setPositiveButton("Запросить доступ", (dialog, which) -> Shizuku.requestPermission(SHIZUKU_REQUEST_CODE))
                .show();
    }

    private void toast(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onDestroy() {
        Shizuku.removeRequestPermissionResultListener(permissionListener);
        super.onDestroy();
    }
}
