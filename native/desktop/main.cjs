const { app, BrowserWindow } = require('electron');
const path = require('path');
function createWindow() {
  const win = new BrowserWindow({ width: 1280, height: 820, minWidth: 920, minHeight: 600, backgroundColor: '#111315', webPreferences: { contextIsolation: true, sandbox: true } });
  win.loadFile(path.join(__dirname, '..', 'app', 'src', 'main', 'assets', 'index.html'));
}
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
