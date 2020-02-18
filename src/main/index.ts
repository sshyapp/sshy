import {app, BrowserWindow} from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow: Electron.BrowserWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        height: 800,
        minHeight: 400,
        minWidth: 400,
        show: false,
        width: 1000,
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.webContents.openDevTools();

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
